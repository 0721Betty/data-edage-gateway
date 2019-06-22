<template>
  <div class="wrapper">
    <!-- 个人信息页面 -->
    <Card class="inner move">
      <p slot="title" class="title">
        <Icon type="ios-card" />个人信息
      </p>
      <Form ref="admin" :model="admin" :label-width="60">
        <FormItem label="ID" prop="adminId">
          <Input v-model="admin.adminId"></Input>
        </FormItem>
        <FormItem label="姓名" prop="name">
          <Input v-model="admin.name"></Input>
        </FormItem>
        <FormItem label="手机号码" prop="phone">
          <Input v-model="admin.phone"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="admin.email"></Input>
        </FormItem>
        <FormItem label="注册时间" prop="createTime">
          <Input v-model="admin.createTime"></Input>
        </FormItem>
        <FormItem label="修改时间" prop="updateTime">
          <Input v-model="admin.updateTime"></Input>
        </FormItem>
        <FormItem>
          <router-link to="/home/modifyInfo" tag="span">
          <Button class="changeBtn" type="primary">
            修改
          </Button>
          </router-link>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      admin: {
        adminId: "",
        name: "",
        phone: "",
        email: "",
        createTime: "",
        updateTime: ""
      }
    };
  },
  beforeMount() {
    this.getMsg();
  },
  methods: {
    // 格式化时间
    formatTime(date) {
      let f =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes(); //分
      let s =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds(); //秒
      return (
        date.getFullYear() +
        "年" +
        (date.getMonth()+1) +
        "月" +
        date.getDate() +
        "日" +
        date.getHours() +
        ":" +
        f +
        ":" +
        s
      );
    },
    // 获取到个人信息
    getMsg() {
      this.$axios
        .get("/api/admin", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          this.admin.adminId = res.data.data.adminId;
          this.admin.name = res.data.data.name;
          this.admin.phone = res.data.data.phone;
          this.admin.email = res.data.data.email;
          this.admin.createTime = this.$options.methods.formatTime(//vue中methods中一个方法调用前面已经存在的方法formatTime()
            new Date(res.data.data.createTime)
          );
          this.admin.updateTime = this.$options.methods.formatTime(
            new Date(res.data.data.updateTime)
          );
        });
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
.inner {
  width: 450px;
  height: 470px;
  margin: 50px auto;
}
.ivu-input-wrapper {
  width: 85%;
}
.title {
  font-size: 18px;
}
.photo {
  font-size: 24px;
}
.changeBtn {
  margin-left: 118px;
}
.move{
  animation: animated 0.5s;
}
@keyframes animated {
  0%  {
    top: 0;
    left: 0;
  }
  50% {
    top: 0px;
    left: -400px;
  }
  100% {
    top: 0px;
    left: 200px;
  } 
}
</style>

