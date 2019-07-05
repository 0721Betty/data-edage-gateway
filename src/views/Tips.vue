<template>
  <div class="wrapper">
    <div
      class="success"
      v-if="this.tempWarn === '' && this.elecWarn === '' && this.pressWarn === ''"
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
    <Alert type="warning" show-icon closable v-if="this.elecWarn != ''">
      系统电流报警
      <template slot="desc">
        <p ref="warn">{{ elecWarn }}</p>
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
          <br />
          <div class="choose">
            <i-switch size="large" @on-change="change" v-model="switch1">
              <span slot="open">ON</span>
              <span slot="close">OFF</span>
            </i-switch>
          </div>
          <div class="fan">
            <img src="../../src/assets/fan.png" alt ref="img" />
          </div>
        </Col>
        <Col span="8">
          <Card>
            <p slot="title">
              <Icon type="md-cog"></Icon>PLC信息
            </p>
            <Form ref="plc" :model="plc">
              <FormItem label="运行状态">
                <i-switch v-model="plc.switch" size="large" disabled>
                  <span slot="open">On</span>
                  <span slot="close">Off</span>
                </i-switch>
              </FormItem>
              <FormItem label="PLC选择">
                <CheckboxGroup v-model="plc.checkbox1">
                  <Checkbox label="国产" disabled></Checkbox>
                  <Checkbox label="三菱" disabled></Checkbox>
                  <Checkbox label="西门子" disabled></Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem label="控制设备">
                <CheckboxGroup v-model="plc.checkbox2">
                  <Checkbox label="电机" disabled style="opacity:5"></Checkbox>
                  <Checkbox label="滑台" disabled></Checkbox>
                  <Checkbox label="推杆" disabled></Checkbox>
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
      // 电流警报信息
      elecWarn: "",
      // 重量超载警报信息
      pressWarn: "",
      // 散热扇的开关
      switch1: false,
      // 散热扇定时器
      // fanTimer: null,
      fanTimer: null,
      rotateVal: 0,
      plc: {
        switch: false,
        checkbox1: ["三菱"],
        checkbox2: ["电机", "滑台", "推杆"]
      }
    };
  },
  mounted(){
    this.initWebSocket();
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
      let socket = new SockJS("http://47.111.134.50:8200/ws");
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
            this.plc.switch = true;
            if (body.temperatureWarn === "1") {
              this.tempWarn = "设备温度过高！请开启散热扇！";
            }
            if (body.humidityWarn === "1") {
              this.elecWarn = "设备电流过大！";
            }
            if (body.weightWarn === "1") {
              this.pressWarn = "设备受重超载！";
            }
            if (body.fan === "0") {
              this.switch1 = false; //风扇关闭
              clearInterval(this.fanTimer);
            } else if (body.fan === "1") {
              clearInterval(this.fanTimer)
              this.switch1 = true; //风扇打开
              this.fanTimer = setInterval(() => {
                // this.rotateVal = 0;
                this.rotateVal += 3;
                // 设置旋转属性(顺时针)
                this.$refs.img.style.transform =
                  "rotate(" + this.rotateVal + "deg)";
                // 设置旋转时的动画  匀速0.1s
                this.$refs.img.style.transition = "0.1s linear";
              }, 1);
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
      this.$Message.info("指令下发中请耐心等待！");
      if (switch1 === true) {
        // 散热扇旋转，并且向后端发送指令开启扇热扇
        this.$axios
          .get("/api/cmd/fan-open", {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => { 
             if (res.data.code < 300) {
              this.$Message.success("打开散热扇指令下发成功！");
              clearInterval(this.fanTimer)
              // 散热扇打开
              this.fanTimer = setInterval(() => {
                this.rotateVal += 3;
                // 设置旋转属性(顺时针)
                this.$refs.img.style.transform =
                  "rotate(" + this.rotateVal + "deg)";
                // 设置旋转时的动画  匀速0.1s
                this.$refs.img.style.transition = "0.1s linear";
              }, 1);
            } else {
              this.$Message.error("打开散热扇指令下发失败！");
              this.switch1 = false;
              clearInterval(this.fanTimer);
              // this.rotateVal = 0;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (switch1 === false) {
        // 扇热扇停止，并且向后端发送关闭指令
        this.$axios
          .get("/api/cmd/fan-close", {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => {
            if (res.data.code < 300) {
              this.$Message.success("关闭扇热扇指令下发成功！");
              // 扇热扇关闭
              clearInterval(this.fanTimer);
              // this.rotateVal = 0;
            } else {
              this.$Message.error("关闭扇热扇指令下发失败！");
              this.switch1 = true;
              clearInterval(this.fanTimer)
              // 散热扇打开
              this.fanTimer = setInterval(() => {
                // this.rotateVal = 0;
                this.rotateVal += 3;
                // 设置旋转属性(顺时针)
                this.$refs.img.style.transform =
                  "rotate(" + this.rotateVal + "deg)";
                // 设置旋转时的动画  匀速0.1s
                this.$refs.img.style.transition = "0.1s linear";
              }, 1);
            }
          })
          .catch(error => {
            this.$Message.error("系统错误！");
            console.log(error);
          });
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
.ivu-switch-disabled{
  opacity: 20!important;
}
.ivu-checkbox-input{
  opacity: 100!important;
}
</style>

