<template>
  <div class="wrapper">
    <Row class-name="head">
      <Col span="3">
      <!-- 点击logo让其跳转到默认的主页面 -->
      <router-link to="/home/msg1" tag="span">
        <div class="logo">
          <img src="../assets/logo.png" alt>
        </div>
        </router-link>
      </Col>
      <Col span="16">
        <div class="name">Data Edge Gateway</div>
      </Col>
      <Col span="2">
      <span class="app" @click="download"><Icon type="ios-navigate" class="photo"/>&nbsp;下载App</span>
      </Col>
      <Col>
      </Col>
      <Col span="3">
        <div class="user">
          <Dropdown @on-click="handleClick">
            <a href="javascript:void(0)">
              <Avatar src="http://www.zhongaigou.com/UploadFiles/2014/cabie.jpg"/>&nbsp;
              <span>{{ adminName }}&nbsp;</span>
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="personal">个人信息</DropdownItem>
              <DropdownItem name="loginOut" @click="confirm">退出登录</DropdownItem>
              <DropdownItem name="empty" @click="confirm">注销账号</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      adminName: ""
    };
  },
  beforeMount() {
    this.getUserName();
  },
  methods: {
    handleClick(name) {
      if (name === "loginOut") {
        // 先提示用户是否确定退出该系统
        this.$Modal.confirm({
          title: "确定退出该系统？",
          onOk: () => {
            this.$router.push("/login");
          },
          onCancel: () => {
            this.$Message.info("欢迎回来！");
          }
        });
      } else if (name === "personal") {
        this.$router.push("/home/personal");
      } else if (name === "empty") {
        // 先提示用户是否注销账号，用户确定后再执行注销账号操作
        this.$Modal.confirm({
          title: "确定注销账号？",
          content:
            "<p>执行该操作后，您将不能通过此账号登录本系统，相关数据将被清空！！！</p>",
          onOk: () => {
            this.$axios
              .delete("/api/admin", {
                headers: { token: localStorage.getItem("token") }
              })
              .then(res => {});
            alert("账号注销成功！");
            this.$router.push("/login");
          },
          onCancel: () => {
            this.$Message.info("欢迎回来！");
          }
        });
      }
    },
    getUserName() {
      this.$axios
        .get("/api/admin", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          this.adminName = res.data.data.name;
        });
    },
    // 下载app版
    download() {
      window.location.href = "http://119.23.243.252:8080/api/download/gateway"
    }
  }
};
</script>

<style scoped>
/* 头部样式 */
.head {
  background-color: #caf0fd;
  height: 80px;
  line-height: 80px;
}
/* logo样式 */
.logo {
  height: 80px;
  text-align: center;
  cursor: pointer;
}
/* 系统名称样式 */
.name {
  height: 80px;
  font-size: 50px;
  margin-left: 415px;
  color: #08acf8;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-style: italic;
  cursor: pointer;
}
.user {
  text-align: center;
  height: 80px;
}
.app{
  color: #08acf8;
  display: inline-block;
  margin-left: 45px;
  cursor: pointer;
}
span {
  font-size: 16px;
}
.ivu-dropdown,
.ivu-dropdown-rel {
  height: 80px !important;
}
.photo{
  font-size: 20px;
}
</style>
