<template>
  <!-- 网站首页 显示登录注册页面 -->
  <!-- 简要的介绍我们这个网站是干什么的 -->
  <div class="wrapper">
    <Row class-name="head">
      <Col span="3">
        <div class="logo">
          <img src="../assets/logo.png" alt>
        </div>
      </Col>
      <Col span="18">
        <div class="name">Data Edge Gateway</div>
      </Col>
      <Col span="3">
        <div class="nav" @mouseover="over" @mouseout="out">
          <img src="../assets/we.png" alt>
          <a href="javascript:;">关于我们</a>
          <div ref="text" style="display: none;" class="text">
            本产品主要针对工业应用领域的数据采集，
            开发可以连接多种 PLC、多种传感器，
            能够控制生产过程中使用的电机、开关、指示灯等的设备。
            该设备可以作为数据采集终端，也可以作为数据采集和处理的边缘网关使用。
          </div>
        </div>
      </Col>
    </Row>
    <div class="contain">
      <div class="btns">
        <router-link to="/register" class="btn">注册</router-link>
        <router-link to="/login">登录</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    over() {
      this.$refs.text.style.display = "block";
    }, //鼠标进入显示文字
    out() {
      this.$refs.text.style.display = "none";
    } //鼠标退出不显示文字
  },
  // 设置body的背景颜色
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#e0f6fd;");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  }
};
</script>
<style scoped>
.contain {
  text-align: center;
  box-sizing: border-box;
}
/* 头部样式 */
.head {
  background-color: #caf0fd;
}
/* logo样式 */
.logo {
  height: 88px;
  text-align: center;
  transition: -webkit-transform 1s;
}
/* 系统名称样式 */
.name {
  height: 88px;
  font-size: 50px;
  text-align: center;
  color: #4dd2ff;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-style: italic;
  transition: -webkit-transform 1s;
}
/* 当鼠标悬浮时让logo和name旋转 */
.logo:hover {
  transform: rotate(360deg);
}
.name:hover {
  transform: rotate(-5deg);
}
/* 头部右边样式 */
.nav {
  height: 88px;
}
.nav a {
  display: inline-block;
  height: 88px;
  line-height: 88px;
  color: #4dd2ff;
  font-size: 18px;
  text-align: center;
}
/* 鼠标悬浮时显示的 */
.nav a:hover {
  color: #37ccfd;
}
/* 注册登录按钮样式 */
.contain .btns {
  font-size: 18px;
  width: 360px;
  margin: 60px auto;
}
.router-link-active {
  color: #50a3e7;
  opacity: 1;
  border-bottom: 2px solid;
  padding-bottom: 5px;
}
.text {
  width: 400px;
  height: 57px;
  border-radius: 8px;
  line-height: 18px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: italic;
  border: 1px solid #37ccfd;
  position: absolute;
  right: 66px;
  color: #50a3e7;
}
</style>
