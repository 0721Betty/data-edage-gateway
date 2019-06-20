<template>
<!-- 实时数据页面 -->
  <div>
    <Row :gutter="20">
      <!-- 温度 -->
      <Col span="8">
        <Card>
          <div id="temp" class="myChart"></div>
        </Card>
      </Col>
      <!-- 湿度 -->
      <Col span="8">
        <Card>
          <div id="humi" class="myChart"></div>
        </Card>
      </Col>
      <!-- 电压 -->
      <Col span="8">
        <Card>
          <div id="volt" class="myChart"></div>
        </Card>
      </Col>
    </Row>
    <br>
    <Row :gutter="20">
      <!-- 电流 -->
      <Col span="8">
        <Card>
          <div id="elec" class="myChart"></div>
        </Card>
      </Col>
      <!-- 压力 -->
      <Col span="8">
        <Card>
          <div id="press" class="myChart"></div>
        </Card>
      </Col>
      <!-- 功率 -->
      <Col span="8">
        <Card>
          <div id="power" class="myChart"></div>
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
      // 上述仪表盘默认值
      tempValue: 25.5,
      humiValue: 40.1,
      voltValue: 20.625,
      elecValue: 2.333,
      pressValue: 80.354,
      powerValue: 110
    };
  },
  mounted() {
    this.initWebSocket();//websocket初始化
    this.init();//仪表盘初始化
  },
  beforeDestroy() {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
    clearInterval(this.timer);
  },
  methods: {
    //仪表盘初始化
    init() {
      let temp = this.$echarts.init(document.getElementById("temp"));
      let humi = this.$echarts.init(document.getElementById("humi"));
      let volt = this.$echarts.init(document.getElementById("volt"));
      let elec = this.$echarts.init(document.getElementById("elec"));
      let press = this.$echarts.init(document.getElementById("press"));
      let power = this.$echarts.init(document.getElementById("power"));
      temp.setOption({
        width: "auto",
        height: "auto",
        series: [
          {
            name: "设备参数",
            type: "gauge",
            detail: { formatter: "{value}℃" },
            data: [{ value: this.tempValue, name: "温度" }],
            min: 10,
            max: 60,
            title: {
              color: "#08acf8"
            },
            splitNumber: 5, //分成5份
            fontWeight: "normal",
            radius: "100%", //仪表盘大小
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[4 / 5, "#91c7ae"], [1, "#c23531"]]
              }
            }
          }
        ]
      });
      humi.setOption({
        series: [
          {
            name: "设备参数",
            type: "gauge",
            detail: { formatter: "{value}%rh" },
            data: [{ value: this.humiValue, name: "湿度" }],
            title: {
              color: "#08acf8"
            },
            min: 30,
            max: 60,
            splitNumber: 6,
            fontWeight: "normal",
            radius: "100%",
            axisLine: {
              lineStyle: {
                color: [[4 / 6, "#91c7ae"], [1, "#c23531"]]
              }
            }
          }
        ]
      });
      volt.setOption({
        series: [
          {
            name: "设备参数",
            type: "gauge",
            detail: { formatter: "{value}V" },
            data: [{ value: this.voltValue, name: "电压" }],
            title: {
              color: "#08acf8"
            },
            min: 5,
            max: 30,
            splitNumber: 5,
            fontWeight: "normal",
            radius: "100%",
            axisLine: {
              lineStyle: {
                color: [[0.76, "#91c7ae"], [1, "#c23531"]]
              }
            }
          }
        ]
      });
      elec.setOption({
        series: [
          {
            name: "设备参数",
            type: "gauge",
            detail: { formatter: "{value}A" },
            data: [{ value: this.elecValue, name: "电流" }],
            title: {
              color: "#08acf8"
            },
            min: 0,
            max: 6,
            splitNumber: 6,
            fontWeight: "normal",
            radius: "100%",
            axisLine: {
              lineStyle: {
                color: [[5 / 6, "#91c7ae"], [1, "#c23531"]]
              }
            }
          }
        ]
      });
      press.setOption({
        series: [
          {
            name: "设备参数",
            type: "gauge",
            detail: { formatter: "{value}KG" },
            data: [{ value: this.pressValue, name: "压力" }],
            title: {
              color: "#08acf8"
            },
            min: 0,
            max: 110,
            splitNumber: 11,
            fontWeight: "normal",
            radius: "100%",
            axisLine: {
              lineStyle: {
                color: [[10 / 11, "#91c7ae"], [1, "#c23531"]]
              }
            }
          }
        ]
      });
      power.setOption({
        series: [
          {
            name: "设备参数",
            type: "gauge",
            detail: { formatter: "{value}W" },
            data: [{ value: this.powerValue, name: "功率" }],
            title: {
              color: "#08acf8"
            },
            min: 0,
            max: 150,
            splitNumber: 15,
            fontWeight: "normal",
            radius: "100%",
            axisLine: {
              lineStyle: {
                color: [[11 / 15, "#91c7ae"], [1, "#c23531"]]
              }
            }
          }
        ]
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
            console.log(body); // msg.body存放的是服务端发送给我们的信息
              // let td = parseFloat(body.temperature) + Math.random()*10;
              this.tempValue = body.temperature;
              // console.log(this.tempValue);


              
              //获取到数据后重新绘制仪表盘 
              let temp = this.$echarts.init(document.getElementById("temp"));
              let humi = this.$echarts.init(document.getElementById("humi"));
              let volt = this.$echarts.init(document.getElementById("volt"));
              let elec = this.$echarts.init(document.getElementById("elec"));
              let press = this.$echarts.init(document.getElementById("press"));
              let power = this.$echarts.init(document.getElementById("power"));
              temp.setOption({
              series: [
                {
                  data: [{ value: this.tempValue, name: "温度" }],
                }
              ]
              });
              humi.setOption({
              series: [
                {
                  data: [{ value: this.humiValue, name: "湿度" }],
                }
              ]
              });
              volt.setOption({
              series: [
                {
                  data: [{ value: this.voltValue, name: "电压" }],
                }
              ]
              });
              elec.setOption({
              series: [
                {
                  data: [{ value: this.elecValue, name: "电流" }],
                }
              ]
              });
              press.setOption({
              series: [
                {
                  data: [{ value: this.pressValue, name: "压力" }],
                }
              ]
              });
              power.setOption({
              series: [
                {
                  data: [{ value: this.powerValue, name: "功率" }],
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
  height: 300px;
}
</style>