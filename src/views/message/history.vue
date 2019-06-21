<template>
  <!-- 历史数据记录页面 -->
  <div>
    <Row>
      <Col span="24">
        <Card>
          <!-- 时间选择查询 -->
          <div class="selectTime">
            <Form :model="timeSelect">
              <FormItem>
                <DatePicker
                  type="datetimerange"
                  placeholder="请选择日期和时间"
                  style="width: 300px"
                  v-model="value"
                ></DatePicker>
                <Button type="primary" :size="buttonSize" class="sure" @click="handleQuery()">查询</Button>
              </FormItem>
            </Form>
          </div>
          <!-- 折线图 -->
          <div id="history" class="myChart"></div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      buttonSize: "small",
      value: "",
      timeSelect: {
        start: "",
        end: ""
      },
      time: [],
      temp: [],
      humi: [],
      volt: [],
      elec: [],
      press: [],
      power: []
    };
  },
  mounted() {
    this.init();
  },
  beforeMount() {
    //用户选择时间查询前默认展示昨天的此刻到现在此刻的时间
    this.defaultHistory();
  },
  methods: {
    init() {
      // 全局配置this.$Message
      this.$Message.config({
        top: 100, //距离顶部100px
        duration: 10 //显示10秒
      });
      let history = this.$echarts.init(document.getElementById("history"));
      history.showLoading({
        text: "加载中",
        color: "#4cbbff",
        textColor: "#4cbbff",
        maskColor: "rgba(255, 255, 255, 0.8)"
      });
      history.setOption({
        title: {
          text: "设备历史数据(默认显示昨天的此刻到此刻的数据)"
        },
        tooltip: {
          trigger: "axis",
          formatter:
            "{b}<br/>{a0}:{c0}℃<br/>{a1}:{c1}%rh<br/>{a2}:{c2}V<br/>{a3}:{c3}A<br/>{a4}:{c4}Kg<br/>{a5}:{c5}W",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["温度", "湿度", "电压", "电流", "压力", "功率"]
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
            name: "温度",
            type: "line",
            stack: "总量",
            data: this.temp
          },
          {
            name: "湿度",
            type: "line",
            stack: "总量",
            data: this.humi
          },
          {
            name: "电压",
            type: "line",
            stack: "总量",
            data: this.volt
          },
          {
            name: "电流",
            type: "line",
            stack: "总量",
            data: this.elec
          },
          {
            name: "压力",
            type: "line",
            stack: "总量",
            data: this.press
          },
          {
            name: "功率",
            type: "line",
            stack: "总量",
            data: this.power
          }
        ]
      });
    },
     // 格式化时间
    formatTime(date) {
      let f =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes(); //分
      let s =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds(); //秒
      return (
        date.getFullYear() +
        "年" +
        (date.getMonth()+1) +
        "月" +
        date.getDate() +
        "日" +
        date.getHours() +
        ":" +
        f +
        ":" +
        s
      );
    },
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
      let defaultEnd = Number(now);
      let defaultStart = Number(new Date(yesterday)); //先将昨天的时间变为格式化之前的默认时间样式然后变为时间戳
      this.$axios
        .get(`/api/status/${defaultStart}/${defaultEnd}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          if (res.data.code >= 300) {
            this.$Message.error(res.data.msg);
          } else {
            if (res.data.data.length === 0) {
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
              this.temp.push(
                parseFloat(res.data.data[i].temperature) + Math.random() * 10
              );
              this.humi.push(
                parseFloat(res.data.data[i].humidity) + Math.random() * 10
              );
              this.volt.push(
                parseFloat(res.data.data[i].voltage) + Math.random() * 10
              );
              this.elec.push(
                parseFloat(res.data.data[i].electric) + Math.random() * 10
              );
              this.press.push(
                parseFloat(res.data.data[i].weight) + Math.random() * 10
              );
              this.power.push(
                parseFloat(res.data.data[i].power) + Math.random() * 10
              );
            }
            let history = this.$echarts.init(
              document.getElementById("history")
            );
            history.hideLoading();
            history.setOption({
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: this.time
                }
              ],
              series: [
                {
                  name: "温度",
                  type: "line",
                  stack: "总量",
                  data: this.temp
                },
                {
                  name: "湿度",
                  type: "line",
                  stack: "总量",
                  data: this.humi
                },
                {
                  name: "电压",
                  type: "line",
                  stack: "总量",
                  data: this.volt
                },
                {
                  name: "电流",
                  type: "line",
                  stack: "总量",
                  data: this.elec
                },
                {
                  name: "压力",
                  type: "line",
                  stack: "总量",
                  data: this.press
                },
                {
                  name: "功率",
                  type: "line",
                  stack: "总量",
                  data: this.power
                }
              ]
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleQuery() {
      let value1 = this.value[0]; //获取起始时间
      let value2 = this.value[1]; //获取结束时间
      this.timeSelect.start = Number(value1);
      this.timeSelect.end = Number(value2);
      // 清空默认的数据
      this.time = [];
      this.temp = [];
      this.humi = [];
      this.volt = [];
      this.elec = [];
      this.power = [];
      // 加载动画
      let history = this.$echarts.init(document.getElementById("history"));
      history.showLoading({
        text: "加载中",
        color: "#4cbbff",
        textColor: "#4cbbff",
        maskColor: "rgba(255, 255, 255, 0.8)"
      });
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
              // let f =
              //   date.getMinutes() >= 10
              //     ? date.getMinutes()
              //     : "0" + date.getMinutes(); //分
              // let s =
              //   date.getSeconds() >= 10
              //     ? date.getSeconds()
              //     : "0" + date.getSeconds(); //秒

              // ！！！！！待测试formatTime()函数有没有用


              this.time.push(this.$options.methods.formatTime(date));

              // this.time.push(
              //   date.getFullYear() +
              //     "年" +
              //     (date.getMonth() + 1) +
              //     "月" +
              //     date.getDate() +
              //     "日" +
              //     date.getHours() +
              //     ":" +
              //     f +
              //     ":" +
              //     s
              // );
              this.temp.push(
                parseFloat(res.data.data[i].temperature) + Math.random() * 10
              );
              this.humi.push(
                parseFloat(res.data.data[i].humidity) + Math.random() * 10
              );
              this.volt.push(
                parseFloat(res.data.data[i].voltage) + Math.random() * 10
              );
              this.elec.push(
                parseFloat(res.data.data[i].electric) + Math.random() * 10
              );
              this.press.push(
                parseFloat(res.data.data[i].weight) + Math.random() * 10
              );
              this.power.push(
                parseFloat(res.data.data[i].power) + Math.random() * 10
              );
              // this.humi.push(res.data.data[i].humidity);
              // this.volt.push(res.data.data[i].voltage);
              // this.elec.push(res.data.data[i].electric);
              // this.press.push(res.data.data[i].weight);
              // this.power.push(res.data.data[i].power);
            }
            // 清除动画
            history.hideLoading();
            // 根据查询的时间重新绘制折线图
            history.setOption({
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: this.time
                }
              ],
              series: [
                {
                  name: "温度",
                  type: "line",
                  stack: "总量",
                  data: this.temp
                },
                {
                  name: "湿度",
                  type: "line",
                  stack: "总量",
                  data: this.humi
                },
                {
                  name: "电压",
                  type: "line",
                  stack: "总量",
                  data: this.volt
                },
                {
                  name: "电流",
                  type: "line",
                  stack: "总量",
                  data: this.elec
                },
                {
                  name: "压力",
                  type: "line",
                  stack: "总量",
                  data: this.press
                },
                {
                  name: "功率",
                  type: "line",
                  stack: "总量",
                  data: this.power
                }
              ]
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.ivu-icon-ios-calendar-outline:before {
  content: "";
}
.myChart {
  display: block;
  width: 1309px;
  height: 630px;
}
.ivu-icon-ios-calendar-outline:before {
  content: none;
}
.selectTime {
  margin-top: 8px;
  text-align: center;
}
.sure {
  margin-left: 8px;
}
</style>
