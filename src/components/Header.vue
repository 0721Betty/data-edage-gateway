<template>
  <div class="wrapper">
    <Row class-name="head">
      <Col span="3">
        <div class="logo">
            <img src="../assets/logo.png" alt="">
        </div>
      </Col>
      <Col span="18">
        <div class="name">Data Edge Gateway</div>
      </Col>
      <Col span="3">
        <div class="user">
          <Dropdown>
            <a href="javascript:void(0)">
              <span>用户中心</span>
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>未读消息</DropdownItem>
              <DropdownItem>退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
/* 头部样式 */
.head {
  background-color: #caf0fd;
  height: 88px;
  line-height: 88px;
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
.user{
    text-align: center;
}
span{
    font-size: 15px;
}
</style>
