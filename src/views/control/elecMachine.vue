<template>
  <!-- 电机信息页面及控制页面 -->
  <div>
    <!-- 电机信息 -->
    <Row :gutter="20">
      <!-- 仪表盘 -->
      <Col span="8">
        <Card>
          <div id="dashBoard" class="myChart"></div>
        </Card>
      </Col>
      <!-- 折线图 -->
      <Col span="16">
        <Card>
          <div id="brokenLine" class="line"></div>
          <!-- 日期选择查询 -->
          <div class="selectTime">
            <Form :model="timeSelect">
              <FormItem>
                <DatePicker
                  type="datetimerange"
                  placeholder="请选择日期和时间"
                  style="width: 300px"
                  v-model="value"
                ></DatePicker>
                <Button type="primary" :size="buttonSize1" class="sure" @click="handleQuery()">查询</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </Col>
    </Row>
    <br>
    <!-- 电机控制 -->
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">
            <Icon type="md-cog"></Icon>控制电机的转速转向
          </p>
          <Form ref="elecCtrl" :model="elecCtrl">
            <FormItem label="转速" prop="speed">
              <RadioGroup v-model="elecCtrl.speed">
                <Radio label="slow">慢速
                </Radio>
                <Radio label="middle">中速
                </Radio>
                <Radio label="fast">快速
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="转向" prop="turn">
              <RadioGroup v-model="elecCtrl.turn">
                <Radio label="clockWise">
                  <Icon type="ios-redo"/>顺时针
                </Radio>
                <Radio label="antiClockWise">
                  <Icon type="ios-undo"/>逆时针
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="运行状态">
              <i-switch v-model="elecCtrl.switch" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
              </i-switch>
            </FormItem>
            <FormItem style="margin-left:36px">
              <Button type="primary" @click="handleSubmit()">确定</Button>
              <Button style="margin-left: 8px" @click="handleCancel('elecCtrl')">取消</Button>
            </FormItem>
            <!-- 电机图片 -->
            <div class="photo">
              <img src="../../assets/elec.png" alt title="电机">
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";
export default {
  data() {
    return {
      stompClient: "",
      timer: "",
      buttonSize: "large",
      elecCtrl: {
        speed: "middle",
        turn: "clockWise",
        switch: true
      },
      buttonSize1: "small",
      value: "",
      timeSelect: {
        start: "",
        end: ""
      },
      realSpeed: 300,
      time: [],
      speed: []
    };
  },
  mounted() {
    this.initWebSocket();//websocket初始化
    this.init();
  },
   beforeDestroy() {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
    clearInterval(this.timer);
  },
  beforeMount() {
    //默认显示电机的历史记录从昨天的此刻到此刻的时间点的数据
    this.defaultHistory();
  },
  methods: {
    init() {
      let dashBoard = this.$echarts.init(document.getElementById("dashBoard"));
      let brokenLine = this.$echarts.init(document.getElementById("brokenLine"));
      // 电机的仪表盘，显示实时数据
      dashBoard.setOption({
        series: [
          {
            name: "设备参数",
            type: "gauge",
            detail: { formatter: "{value}r/min" },
            data: [{ value: this.realSpeed, name: "转速" }],
            min: 200,
            max: 700,
            title: {
              color: "#08acf8"
            },
            splitNumber: 10,
            fontWeight: "bloder",
            radius: "80%",
            axisLine: {
              lineStyle: {
                color: [[4 / 5, "#91c7ae"], [1, "#c23531"]]
              }
            }
          }
        ]
      });
      //折线图的加载动画
      brokenLine.showLoading({
        text: "加载中",
        color: "#4cbbff",
        textColor: "#4cbbff",
        maskColor: "rgba(255, 255, 255, 0.8)"
      });
      // 电机的折线图，显示历史数据
      brokenLine.setOption({
        title: {
          text: "电机转速记录(单位r/min)"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["电机转速默认显示昨天的此刻到此刻的数据"]
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            restore: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.time
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            name: "电机转速",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true
              }
            },
            data: this.speed
          }
        ]
      });
    },
    // 取消用户的勾选
    handleCancel(name) {
      this.$refs[name].resetFields();
    },
    // 向后端提交用户对电机操作的请求
    handleSubmit() {
      console.log(this.elecCtrl);
    },
    // 让折线图默认显示昨天的此刻到此刻的数据
    defaultHistory() {
      let now = new Date();
      let yesterday =
        now.getFullYear() +
        "/" +
        (now.getMonth() + 1) +
        "/" +
        (now.getDate() - 1) +
        "/" +
        now.getHours() +
        ":" +
        now.getMinutes() +
        ":" +
        now.getSeconds();
      let defaultEnd = Number(now);//默认结束时间为此刻的时间
      let defaultStart = Number(new Date(yesterday)); //先将昨天的时间变为格式化之前的默认时间样式然后变为时间戳
      // 发送请求获取数据进行渲染
      this.$axios
        .get(`/api/status/${defaultStart}/${defaultEnd}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          if (res.data.code >= 300) {
            this.$Message.error(res.data.msg);
          } else {
            if(res.data.data.length === 0){
              this.$Message.error("数据库中没有数据！");
            }
            for (let i = 0; i < res.data.data.length; i++) {
              let date = new Date(res.data.data[i].createTime);
              let f =
                date.getMinutes() >= 10
                  ? date.getMinutes()
                  : "0" + date.getMinutes(); //分
              let s =
                date.getSeconds() >= 10
                  ? date.getSeconds()
                  : "0" + date.getSeconds(); //秒
              this.time.push(
                date.getFullYear() +
                  "年" +
                  (date.getMonth() + 1) +
                  "月" +
                  date.getDate() +
                  "日" +
                  date.getHours() +
                  ":" +
                  f +
                  ":" +
                  s
              );
              this.speed.push(
                parseFloat(res.data.data[i].motorSpeed) + Math.random() * 10
              );
            }
            let brokenLine = this.$echarts.init(
              document.getElementById("brokenLine")
            );
            // 清除动画
            brokenLine.hideLoading();
            // 重新绘图
            brokenLine.setOption({
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: this.time
                }
              ],
              series: [
                {
                  name: "电机转速",
                  type: "line",
                  stack: "总量",
                  label: {
                    normal: {
                      show: true,
                      position: "top"
                    }
                  },
                  data: this.speed
                }
              ]
            });
          }
        })
        // .catch(error => {
        //   console.log(error);
        // });
    },
    // 根据用户所选择的两个时间点刷选出相应的数据
    handleQuery() {
      let value1 = this.value[0]; //获取起始时间
      let value2 = this.value[1]; //获取结束时间
      this.timeSelect.start = Number(value1);
      this.timeSelect.end = Number(value2);
      // 清除默认的数据
      this.speed = [];
      let brokenLine = this.$echarts.init(
        document.getElementById("brokenLine")
      );
      // 加载动画
      brokenLine.showLoading({
        text: "加载中",
        color: "#4cbbff",
        textColor: "#4cbbff",
        maskColor: "rgba(255, 255, 255, 0.8)"
      });
      // 发送请求获取数据进行渲染
      this.$axios
        .get(`/api/status/${this.timeSelect.start}/${this.timeSelect.end}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          if (res.data.code >= 300) {
            this.$Message.error(res.data.msg);
          } else {
            for (let i = 0; i < res.data.data.length; i++) {
              let date = new Date(res.data.data[i].createTime);
              let f =
                date.getMinutes() >= 10
                  ? date.getMinutes()
                  : "0" + date.getMinutes(); //分
              let s =
                date.getSeconds() >= 10
                  ? date.getSeconds()
                  : "0" + date.getSeconds(); //秒

              this.time.push(
                date.getFullYear() +
                  "年" +
                  (date.getMonth() + 1) +
                  "月" +
                  date.getDate() +
                  "日" +
                  date.getHours() +
                  ":" +
                  f +
                  ":" +
                  s
              );
              this.speed.push(
                parseFloat(res.data.data[i].motorSpeed) + Math.random() * 10
              );
            }
            // 清除动画
            brokenLine.hideLoading();
            // 重新绘图
            brokenLine.setOption({
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: this.time
                }
              ],
              series: [
                {
                  name: "电机转速",
                  type: "line",
                  stack: "总量",
                  label: {
                    normal: {
                      show: true,
                      position: "top"
                    }
                  },
                  data: this.speed
                }
              ]
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //websocket初始化
    initWebSocket() {
      this.connection();
    },
        //连接 后台
    connection() {
      // 建立连接对象
      let socket = new SockJS("http://119.23.243.252:8080/ws");
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(socket);
      // 向服务器发起websocket连接
      this.stompClient.connect("guest", "guest", () => {
          this.stompClient.subscribe("/topic/msg", msg => {
            // 订阅服务端提供的某个topic
            let body = JSON.parse(msg.body); //字符串转对象
            console.log("获取成功");
            console.log(body); // msg.body存放的是服务端发送的信息
              this.realSpeed = body.motorSpeed;
              //获取到数据后重新绘制仪表盘 
              let dashBoard = this.$echarts.init(document.getElementById("dashBoard"));
              dashBoard.setOption({
              series: [
                {
                  data: [{ value: this.realSpeed, name: "转速" }]
                }
              ]
              });
          });
        },err => {
          // 连接发生错误时的处理函数
          console.log("失败");
          console.log(err);
        }, "/");
    }, 
    // 断开连接
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
    }
  }
};
</script>
<style scoped>
/* 仪表盘样式 */
.myChart {
  display: block;
  width: 400px;
  height: 389px;
}
/* 折线图样式 */
.line {
  display: block;
  width: 840px;
  height: 300px;
}
/* 电机图片样式 */
.photo {
  position: absolute;
  top: 73px;
  right: 245px;
}
/* 时间选择框样式 */
.selectTime {
  margin-top: 32px;
  text-align: center;
}
.sure {
  margin-left: 8px;
}
</style>

