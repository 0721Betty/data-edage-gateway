<template>
  <div>
    <Layout>
      <Header>
        <Affix>
          <HeadBar></HeadBar>
        </Affix>
      </Header>
      <Layout>
        <Sider class="sider">
          <Affix :offset-top="90">
            <SideBar></SideBar>
          </Affix>
        </Sider>
        <Divider type="vertical" :style="{minHeight: autoHeight}"/>
        <Layout>
          <Content :style="{minHeight: autoHeight}">
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
  name: "home",
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
    this.autoHeight = window.innerHeight - 80 + "px";
  }
};
</script>
<style scoped>
.ivu-layout-header {
  background-color: #caf0fd;
  height: 80px;
  line-height: 80px;
  padding: 0;
}
.ivu-layout-sider {
  background: #f5f7f9 !important;
  background-color: #e0f6fd !important;
  position: relative;
}
.ivu-layout-sider-children {
  padding-top: 0 !important;
  margin-top: 0 !important;
}
.sider {
  /* width: 200px; */
  width: 20%;
  display: block;
  position: relative;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #e0f6fd;
}
.ivu-layout-content {
  padding: 20px;
  width: 100%;
}
.ivu-divider,
.ivu-divider-vertical {
  margin: 0;
}
</style>

