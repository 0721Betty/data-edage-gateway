<template>
  <div class="wrapper">
    <div
      class="success"
      v-if="this.tempWarn === '' && this.humiWarn === '' && this.pressWarn === ''"
    >
      <Alert type="success" show-icon closable>系统正常运行</Alert>
    </div>
    <Alert type="warning" show-icon closable v-if="this.tempWarn != ''">
      系统温度报警
      <template slot="desc">
        <p ref="warn">{{ tempWarn }}</p>
      </template>
      <span slot="close">不再提示</span>
    </Alert>
    <Alert type="warning" show-icon closable v-if="this.humiWarn != ''">
      系统湿度报警
      <template slot="desc">
        <p ref="warn">{{ humiWarn }}</p>
      </template>
      <span slot="close">不再提示</span>
    </Alert>
    <Alert type="warning" show-icon closable v-if="this.pressWarn != ''">
      系统承重报警
      <template slot="desc">
        <p ref="warn">{{ pressWarn }}</p>
      </template>
      <span slot="close">不再提示</span>
    </Alert>

    <div class="adjust">
      <Row :gutter="20">
        <Col span="8" :offset="4">
          <p class="text">温度过高时请开启散热扇</p>
          <br>
          <div class="choose">
            <i-switch size="large" @on-change="change" v-model="switch1">
              <span slot="open">ON</span>
              <span slot="close">OFF</span>
            </i-switch>
          </div>
          <div class="fan">
            <img src="../../src/assets/fan.png" alt ref="img">
          </div>
        </Col>
        <Col span="8">
          <Card>
            <p slot="title">
              <Icon type="md-cog"></Icon>PLC信息
            </p>
            <Form ref="plc" :model="plc">
              <FormItem label="运行状态">
                <i-switch v-model="plc.switch" size="large">
                  <span slot="open">On</span>
                  <span slot="close">Off</span>
                </i-switch>
              </FormItem>
              <FormItem label="PLC选择">
                <CheckboxGroup v-model="plc.checkbox1">
                  <Checkbox label="国产"></Checkbox>
                  <Checkbox label="三菱"></Checkbox>
                  <Checkbox label="西门子"></Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem label="控制设备">
                <CheckboxGroup v-model="plc.checkbox2">
                  <Checkbox label="电机"></Checkbox>
                  <Checkbox label="滑台"></Checkbox>
                  <Checkbox label="推杆"></Checkbox>
                </CheckboxGroup>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";
export default {
  data() {
    return {
      // WebSocket
      stompClient: "",
      timer: "",
      // 温度警报信息
      tempWarn: "",
      // 湿度警报信息
      humiWarn: "",
      // 重量超载警报信息
      pressWarn: "",
      // 散热扇的开关
      switch1: false,
      // 散热扇定时器
      fanTimer: null,
      rotateVal: 0,
      plc: {
        switch: true,
        checkbox1: ["三菱"],
        checkbox2: ["电机", "滑台", "推杆"]
      }
    };
  },
  beforeMount() {
    this.initWebSocket(); //websocket初始化
    if (this.switch1 === true) {
      this.fanTimer = setInterval(() => {
        this.rotateVal += 3;
        // 设置旋转属性(顺时针)
        this.$refs.img.style.transform = "rotate(" + this.rotateVal + "deg)";
        // 设置旋转时的动画  匀速0.1s
        this.$refs.img.style.transition = "0.1s linear";
      }, 1);
    } else if (this.switch1 === false) {
      clearInterval(this.fanTimer);
      this.rotateVal = 0;
    }
  },
  beforeDestroy() {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
    clearInterval(this.timer);
  },
  methods: {
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
      this.stompClient.connect(
        "guest",
        "guest",
        () => {
          this.stompClient.subscribe("/topic/msg", msg => {
            // 订阅服务端提供的某个topic
            let body = JSON.parse(msg.body); //字符串转对象, msg.body存放的是服务端发送给我们的信息
            console.log("获取成功");
            if (body.temperatureWarn === "1") {
              this.tempWarn = "设备温度过高！请开启散热扇！";
            }
            if (body.humidityWarn === "1") {
              this.humiWarn = "设备湿度过高！";
            }
            if (body.weightWarn === "1") {
              this.pressWarn = "设备受重超载！";
            }
            if (body.fan === "1") {
              this.switch1 = false; //风扇关闭
            } else if (body.fan === "0") {
              this.switch1 = true; //风扇打开
            }
          });
        },
        err => {
          // 连接发生错误时的处理函数
          console.log(err);
        },
        "/"
      );
    },
    // 断开连接
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
    },
    change(switch1) {
      if (switch1 === true) {
        // 散热扇旋转，并且向后端发送指令开启扇热扇
        this.$axios
          .get("/api/cmd/fan-open", {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => {
            if (res.data.code < 300) {
              this.$Message.success("指令下发成功！");
            } else {
              this.$Message.error("指令下发失败！");
            }
          })
          .catch(error => {
            console.log(error);
          });
        // 散热扇打开
        this.fanTimer = setInterval(() => {
          this.rotateVal += 3;
          // 设置旋转属性(顺时针)
          this.$refs.img.style.transform = "rotate(" + this.rotateVal + "deg)";
          // 设置旋转属性(逆时针)
          //img.style.transform = 'rotate(-' + rotateVal + 'deg)'
          // 设置旋转时的动画  匀速0.1s
          this.$refs.img.style.transition = "0.1s linear";
        }, 1);
      } else if (switch1 === false) {
        // 扇热扇停止，并且向后端发送关闭指令
        this.$axios
          .get("/api/cmd/fan-close", {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => {
            if (res.data.code < 300) {
              this.$Message.success("指令下发成功！");
            } else {
              this.$Message.error("指令下发失败！");
            }
          })
          .catch(error => {
            console.log(error);
          });
        // 扇热扇关闭
        clearInterval(this.fanTimer);
        this.rotateVal = 0;
      }
    }
  }
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background: url("../assets/bkg.png") no-repeat;
  border: 1px solid #fff;
}
.adjust {
  margin-top: 20px;
}
.text {
  color: #08acf8;
  font-size: 16px;
}
.choose {
  margin-left: 60px;
}
.fan {
  margin-top: 10px;
  width: 128px;
  height: 128px;
  margin-left: 27px;
}
</style>

