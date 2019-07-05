<template>
  <!-- 滑台和推杆信息及控制页面 -->
  <div class="wrapper">
    <!-- 滑台信息 -->
    <Row class="contain code-row-bg" type="flex" justify="center" align="middle">
      <Col span="8" offset="1">
        <Card style="width: 450px;">
          <p slot="title">
            <Icon type="md-cog"></Icon>滑台状态信息
          </p>
          <Form ref="slideTable" :model="slideTable">
            <FormItem label="运行状态">
              <i-switch v-model="slideTable.switch" size="large" disabled>
                <span slot="open">On</span>
                <span slot="close">Off</span>
              </i-switch>
            </FormItem>
            <FormItem label="方向" prop="turn">
              <RadioGroup v-model="slideTable.turn">
                <Radio label="0" disabled>
                  <Icon type="md-rewind" />后退
                </Radio>
                <Radio label="1" disabled>
                  <Icon type="md-fastforward" />前进
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="速度" prop="speed">
              <RadioGroup v-model="slideTable.speed">
                <Radio label="0" disabled>慢速</Radio>
                <Radio label="1" disabled>中速</Radio>
                <Radio label="2" disabled>快速</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem style="margin-left:36px">
              <!-- 滑台控制 -->
              <Button type="primary" @click="modal1 = true">控制</Button>
              <Modal title="设置滑台的状态" v-model="modal1" :mask-closable="false" @on-ok="slideSubmit">
                <Form ref="slideCg" :model="slideCg">
                  <FormItem label="运行状态">
                    <i-switch v-model="slideCg.switch" size="large">
                      <span slot="open">On</span>
                      <span slot="close">Off</span>
                    </i-switch>
                  </FormItem>
                  <FormItem label="速度" prop="speed">
                    <RadioGroup v-model="slideCg.speed">
                      <Radio label="slow">慢速</Radio>
                      <Radio label="middle">中速</Radio>
                      <Radio label="fast">快速</Radio>
                    </RadioGroup>
                  </FormItem>
                </Form>
              </Modal>
            </FormItem>
          </Form>
          <!-- 滑台图片 -->
          <div class="slidePh">
            <img src="../../assets/slideTable.png" alt title="滑台" />
          </div>
        </Card>
      </Col>
      <Col span="8" offset="3">
        <!-- 推杆信息 -->
        <Card style="width: 450px;">
          <p slot="title">
            <Icon type="md-cog"></Icon>推杆状态信息
          </p>
          <Form ref="pushRod" :model="pushRod">
            <FormItem label="推送距离(单位cm)" prop="distance">
              <br />
              <Slider
                v-model="pushRod.distance"
                show-input
                show-stops
                :min="0"
                :max="20"
                :step="5"
                disabled
              ></Slider>
            </FormItem>
            <FormItem>
              <!-- 推杆控制 -->
              <Button type="primary" @click="modal2 = true">控制</Button>
              <Modal title="设置推杆推送距离" v-model="modal2" :mask-closable="false" @on-ok="pushSubmit">
                <Form ref="pushCg" :model="pushCg">
                  <FormItem label="推送距离" prop="distance">
                    <br />
                    <Slider
                      v-model="pushCg.distance"
                      show-input
                      show-stops
                      :min="0"
                      :max="20"
                      :step="5"
                    ></Slider>
                  </FormItem>
                </Form>
              </Modal>
            </FormItem>
          </Form>
          <!-- 推杆图片 -->
          <div class="pushPh">
            <img src="../../assets/pushRod.png" alt title="推杆" />
          </div>
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
      // WebSocket
      stompClient: "",
      timer: "",
      // 滑台信息
      slideTable: {
        switch: false,
        speed: "",
        turn: ""
      },
      // 推杆信息
      pushRod: {
        distance: ""
      },
      // 修改滑台信息
      modal1: false,
      slideCg: {
        switch: "",
        speed: ""
      },
      // 修改推杆信息
      modal2: false,
      pushCg: {
        distance: ""
      }
    };
  },
  mounted() {
    this.initWebSocket(); //websocket初始化
  },
  beforeDestroy() {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
    clearInterval(this.timer);
  },
  methods: {
    // 滑台指令下发
    slideSubmit() {
      this.$Message.info("指令下发中请耐心等待！");
      if (this.slideCg.switch === true) {
        // 滑台打开
        this.$axios
          .get("/api/cmd/slide-open", {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => {
            if (res.data.code < 300) {
              this.$Message.success("控制滑台打开指令下发成功！");
              // console.log(res);
            } else {
              this.$Message.error("控制滑台打开指令下发失败！");
              // console.log(res);
            }
          })
          .catch(error => {
            this.$Message.error("系统错误！");
            console.log(error);
          });
      } else if (this.slideCg.switch === false) {
        // 滑台关闭
        this.$axios
          .get("/api/cmd/slide-close", {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => {
            if (res.data.code < 300) {
              this.$Message.success("控制滑台关闭指令下发成功！");
              // console.log(res);
            } else {
              this.$Message.error("控制滑台关闭指令下发失败！");
              // console.log(res);
            }
          })
          .catch(error => {
            this.$Message.error("系统错误！");
            console.log(error);
          });
      }
      if (this.slideCg.speed === "0" && this.slideCg.switch === true) {
        // 慢速
        this.$axios
          .get("/api/cmd/slide-slow", {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => {
            if (res.data.code < 300) {
              this.$Message.success("控制滑台慢速指令下发成功！");
            } else {
              this.$Message.error("控制滑台慢速指令下发失败！");
            }
          })
          .catch(error => {
            this.$Message.error("系统错误！");
            console.log(error);
          });
      } else if (this.slideCg.speed === "1" && this.slideCg.switch === true) {
        // 中速
        this.$axios
          .get("/api/cmd/slide-middle", {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => {
            if (res.data.code < 300) {
              this.$Message.success("控制滑台中速指令下发成功！");
            } else {
              this.$Message.error("控制滑台中速指令下发失败！");
            }
          })
          .catch(error => {
            this.$Message.error("系统错误！");
            console.log(error);
          });
      } else if (this.slideCg.speed === "2" && this.slideCg.switch === true) {
        // 快速
        this.$axios
          .get("/api/cmd/slide-fast", {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => {
            if (res.data.code < 300) {
              this.$Message.success("控制滑台快速指令下发成功！");
            } else {
              this.$Message.error("控制滑台快速指令下发失败！");
            }
          })
          .catch(error => {
            this.$Message.error("系统错误！");
            console.log(error);
          });
      }
    },
    // 推杆指令下发
    pushSubmit() {
      this.$Message.info("指令下发中请耐心等待！");
      if (this.pushCg.distance === 0) {
        // 推杆距离为0cm
        this.$axios
          .get("/api/cmd/rod-dis-0", {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => {
            if (res.data.code < 300) {
              this.$Message.success("推杆距离调整为0cm指令下发成功！");
            } else {
              this.$Message.error("推杆距离调整为0cm指令下发失败！");
            }
          })
          .catch(error => {
            this.$Message.error("系统错误！");
            console.log(error);
          });
      } else if (this.pushCg.distance === 5) {
        // 推杆距离为5cm
        this.$axios
          .get("/api/cmd/rod-dis-5", {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => {
            if (res.data.code < 300) {
              this.$Message.success("推杆距离调整为5cm指令下发成功！");
            } else {
              this.$Message.error("推杆距离调整为5cm指令下发失败！");
            }
          })
          .catch(error => {
            this.$Message.error("系统错误！");
            console.log(error);
          });
      } else if (this.pushCg.distance === 10) {
        //  推送距离为10
        this.$Message.error("请选择另外一个距离！传感器不足！");
      } else if (this.pushCg.distance === 15) {
        // 推杆距离为15cm
        this.$axios
          .get("/api/cmd/rod-dis-15", {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => {
            if (res.data.code < 300) {
              this.$Message.success("推杆距离调整为15cm指令下发成功！");
            } else {
              this.$Message.error("推杆距离调整为15cm指令下发失败！");
            }
          })
          .catch(error => {
            this.$Message.error("系统错误！");
            console.log(error);
          });
      } else if (this.pushCg.distance === 20) {
        // 推杆距离为20cm
        this.$axios
          .get("/api/cmd/rod-dis-20", {
            headers: { token: localStorage.getItem("token") }
          })
          .then(res => {
            if (res.data.code < 300) {
              this.$Message.success("推杆距离调整为20cm指令下发成功！");
            } else {
              this.$Message.error("推杆距离调整为20cm指令下发失败！");
            }
          })
          .catch(error => {
            this.$Message.error("系统错误！");
            console.log(error);
          });
      }
    },
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
            let body = JSON.parse(msg.body); //字符串转对象
            // 滑台信息
            if (body.slideOpen === "1") {
              this.slideTable.switch = true; //滑台开启
              this.slideTable.turn = body.slideDir; //滑台方向
              this.slideTable.speed = body.slideSpeed; //滑台速度
            } else if (body.slideOpen === "0") {
              this.slideTable.switch = false; //滑台关闭
            }
            // if(body.slideDir === "1"){
            //   this.slideTable.direction = "1";
            // }else if(body.slideDir === "0"){
            //   this.slideTable.direction = "0";
            // }

            this.pushRod.distance = body.rodDistance; //推杆距离
          });
        },
        err => {
          // 连接发生错误时的处理函数
          this.$Message.error("连接失败！");
        },
        "/"
      );
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
.wrapper {
  width: 100%;
  height: 100%;
  background: url("../../assets/bkg.png") no-repeat;
  border: 1px solid #fff;
}
.contain {
  margin-top: 100px;
}
/* 滑台图片 */
.slidePh {
  position: absolute;
  top: 103px;
  right: 60px;
}
/* 推杆图片 */
.pushPh {
  position: absolute;
  top: 150px;
  right: 105px;
}
.ivu-icon-ios-calendar-outline:before {
  content: none;
}
.pushLayout {
  margin-left: 10px;
}
.ivu-switch-disabled {
  opacity: 20 !important;
}
</style>

