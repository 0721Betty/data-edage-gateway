<template>
  <div class="layout">
    <Layout>
      <Header>
        <HeadBar></HeadBar>
      </Header>
      <Layout>
        <Sider class="sider" style="border-right:1px solid #dcdee2;">
          <SideBar></SideBar>
        </Sider>
        <Layout>
          <Content :style="{padding: '20px 20px 20px 200px', minHeight: autoHeight, background: '#e0f6fd'}">
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
}
.sider {
  width: 200px;
  display: block;
  position: absolute;
  left: 0;
  top: 88px;
  bottom: 0;
  background-color: #e0f6fd;
}
</style>

