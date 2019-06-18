<template>
  <div>
    <Row :gutter="20">
      <Col span="8">
        <Card>
          <div id="temp" class="myChart"></div>
        </Card>
      </Col>
      <Col span="8">
        <Card>
          <div id="humi" class="myChart"></div>
        </Card>
      </Col>
      <Col span="8">
        <Card>
          <div id="volt" class="myChart"></div>
        </Card>
      </Col>
    </Row>
    <br>
    <Row :gutter="20">
      <Col span="8">
        <Card>
          <div id="elec" class="myChart"></div>
        </Card>
      </Col>
      <Col span="8">
        <Card>
          <div id="press" class="myChart"></div>
        </Card>
      </Col>
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
      timer: ""
    };
  },
  mounted() {
    this.initWebSocket();
    this.init();
  },
  beforeDestroy() {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
    clearInterval(this.timer);
  },
  methods: {
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
            data: [{ value: 50.1, name: "温度" }],
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
            data: [{ value: 40.1, name: "湿度" }],
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
            data: [{ value: 20.625, name: "电压" }],
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
            data: [{ value: 2.333, name: "电流" }],
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
            data: [{ value: 80.354, name: "压力" }],
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
            data: [{ value: 110, name: "功率" }],
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
    initWebSocket() {
      this.connection();
    },
    connection() {
      // 建立连接对象
      let socket = new SockJS("http://10.168.30.104:8080/ws");
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(socket);
      // 向服务器发起websocket连接
      this.stompClient.connect("guest", "guest", () => {
          this.stompClient.subscribe("/topic/msg", msg => {
            // 订阅服务端提供的某个topic
            console.log("广播成功");
            console.log(msg.body); // msg.body存放的是服务端发送给我们的信息
          });
        },err => {
          // 连接发生错误时的处理函数
          console.log("失败");
          console.log(err);
        }, "/");
    }, //连接 后台
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
    } // 断开连接
  }
};
</script>
<style scoped>
.myChart {
  display: block;
  width: 400px;
  height: 300px;
}
/* #temp,#humi,#volt,#elec,#press{
  background-color: #e0f6fd;
} */
</style>