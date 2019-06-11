<template>
  <div class="wrapper">
    <Menu active-name="1-1" :open-names="['1']" class="inner" @on-select="handleRouter" accordion>
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-stats"/>设备信息
        </template>
        <MenuItem name="1-1">
          <Icon type="ios-flash"/>电机
        </MenuItem>
        <MenuItem name="1-2">
          <Icon type="ios-cube"/>滑台
        </MenuItem>
        <MenuItem name="1-3">
          <Icon type="ios-barcode"/>PLC
        </MenuItem>
        <MenuItem name="1-4">
          <Icon type="ios-build"/>推杆
        </MenuItem>
        <MenuItem name="1-5">
          <Icon type="ios-settings"/>继电器
        </MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-construct"/>设备控制
        </template>
        <MenuItem name="2-1">
          <Icon type="ios-flash"/>电机
        </MenuItem>
        <MenuItem name="2-2">
          <Icon type="ios-cube"/>滑台
        </MenuItem>
        <MenuItem name="2-3">
          <Icon type="ios-barcode"/>PLC
        </MenuItem>
        <MenuItem name="2-4">
          <Icon type="ios-build"/>推杆
        </MenuItem>
        <MenuItem name="2-5">
          <Icon type="ios-settings"/>继电器
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
		handleRouter(name) {
      // 设备信息展示页面路由跳转
			if (name === '1-1') this.$router.push('/msg1')
			if (name === '1-2') this.$router.push('/msg2')
			if (name === '1-3') this.$router.push('/msg3')
      if (name === '1-4') this.$router.push('/msg4')
      if (name === '1-5') this.$router.push('/msg5')

      // 设备控制页面路由跳转
      if (name === '2-1') this.$router.push('/ctrl1')
			if (name === '2-2') this.$router.push('/ctrl2')
			if (name === '2-3') this.$router.push('/ctrl3')
      if (name === '2-4') this.$router.push('/ctrl4')
      if (name === '2-5') this.$router.push('/ctrl5')
		}
	},
};
</script>
<style scoped>
/* 让侧边栏占满 */
.wrapper {
  width: 200px;
  display: block;
  position: absolute;
  left: 0;
  top: 0px;
  bottom: 0;
  background-color: #e0f6fd;
}
.inner {
  width: 200px;
}
.ivu-menu-light {
  background-color: #e0f6fd;
}
/* 设置左边导航栏的宽及文字居中*/
ul {
  width: 200px !important;
  text-align: center;
}
/* 高亮显示的颜色 */
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: #caf0fd;
}
/* 让导航栏右边的线消失 */
.ivu-menu-vertical.ivu-menu-light:after {
  width: 0px;
  height: 0px;
}
</style>

