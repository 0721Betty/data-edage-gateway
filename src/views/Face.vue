<template>
  <!-- 网站首页 显示登录注册页面 -->
  <!-- 简要的介绍我们这个网站是干什么的 -->
  <div>
    <Row class-name="head">
      <Col span="3">
        <div class="logo">
          <img src="../assets/logo.png" alt="">
        </div>
      </Col>
      <Col span="16">
        <div class="name">Data Edge Gateway</div>
      </Col>
      <Col span="2">
      <span  class="app" @click="download"><Icon type="ios-navigate" class="photo"/>&nbsp;下载App</span>
      </Col>
      <Col span="3">
        <div class="nav" @mouseover="over" @mouseout="out">
          <img src="../assets/we.png" alt class="about">&nbsp;<a href="javascript:;">关于我们</a>
          <div ref="text" class="text">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本产品主要针对工业应用领域的数据采集，开发可以连接多种 PLC、多种传感器，能够控制生产过程中使用的电机、开关、指示灯等的设备。该设备可以作为数据采集终端，也可以作为数据采集和处理的边缘网关使用。
          </div>
        </div>
      </Col>
    </Row>
    <div class="contain">
      <div class="btns">
        <router-link to="/register" class="btn"><Icon type="ios-leaf" />&nbsp;注册</router-link>&nbsp;
        <router-link to="/login"><Icon type="ios-paper-plane" />&nbsp;登录</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  // 设置body的背景颜色
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#e9f6fa;");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  methods: {
    over() {
      this.$refs.text.style.display = "block";
    }, //鼠标进入显示文字
    out() {
      this.$refs.text.style.display = "none";
    }, //鼠标退出不显示文字
    // 下载app版
  download(){
    window.location.href = "http://47.111.134.50:8200/api/download/gateway"
  }
  },
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
  height: 80px;
  line-height: 80px;
  text-align: center;
  cursor: pointer;
}
/* 系统名称样式 */
.name {
  height: 80px;
  font-size: 50px;
  margin-left: 388px;
  color: #08acf8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: italic;
  transition: -webkit-transform 1s;
  cursor: pointer;
}
.ivu-col-span-2{
  height: 80px;
}
.app{
  line-height: 80px;
  font-size: 18px;
  color: #08acf8;
  cursor: pointer;
}
/* 头部右边样式 */
.nav {
  height: 80px;
}
.nav a {
  display: inline-block;
  height: 80px;
  line-height: 80px;
  color: #08acf8;
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
  display: none;
  width: 387px;
  height: 120px;
  font-size: 18px;
  border-radius: 8px;
  line-height: 23px;
  font-style: italic;
  border: 1px solid #37ccfd;
  position: absolute;
  right: 66px;
  color: #50a3e7;
}
.about{
  vertical-align: middle;
}
.photo{
  font-size: 22px;
}
</style>
