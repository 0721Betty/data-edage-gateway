<template>
  <div class="layout">
    <Layout>
      <Header>
        <HeadBar></HeadBar>
      </Header>
      <Layout>
        <Sider class="sider">
          <SideBar></SideBar>
        </Sider>
        <Layout>
          <Content :style="{minHeight: autoHeight, background: '#e0f6fd'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import HeadBar from "../components/Header.vue";
import SideBar from "../components/Sider";
export default {
  components: {
    HeadBar,
    SideBar
  },
  data() {
    return {
      autoHeight: ""
    };
  },
  beforeMount() {
    // this.$router.push('/form1')
    this.autoHeight = window.innerHeight - 88 + "px";
  }
};
</script>
<style scoped>
.ivu-layout-header {
  background-color: #caf0fd;
  height: 88px;
  line-height: 88px;
  margin-bottom: 10px;
}
.sider {
  width: 200px;
  display: block;
  position: relative;
  left: 0;
  top: 0px;
  bottom: 0;
  background-color: #e0f6fd;
  margin-right: 5px;
  box-shadow: 5px 0px 5px #999;
}
.ivu-layout-content{
  padding: 20px;
}
</style>

