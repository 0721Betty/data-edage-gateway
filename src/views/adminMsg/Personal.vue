<template>
  <div class="wrapper">
    <!-- 个人信息页面 -->
    <Card class="inner move">
      <p slot="title" class="title">
        <Icon type="ios-card"/>个人信息
      </p>
      <Form ref="admin" :model="admin" :label-width="180" class="name">
        <p>姓名：{{admin.name}}</p>
        <p>手机号码：{{admin.phone}}</p>
        <p>邮箱：{{admin.email}}</p>
        <p>注册时间：{{admin.createTime}}</p>
        <p>修改时间：{{admin.updateTime}}</p>
        <FormItem>
          <router-link to="/home/modifyInfo" tag="span">
            <Button class="changeBtn" type="primary">修改</Button>
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
        (date.getMonth() + 1) +
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
          this.admin.name = res.data.data.name;
          this.admin.phone = res.data.data.phone;
          this.admin.email = res.data.data.email;
          this.admin.createTime = this.$options.methods.formatTime(
            //vue中methods中一个方法调用前面已经存在的方法formatTime()
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
  width: 430px;
  height: 425px;
  margin: 50px auto;
}
.title {
  font-size: 18px;
}
.photo {
  font-size: 24px;
}
p {
  font-size: 16px;
  text-align: center;
  line-height: 57px;
}
.changeBtn{
  margin-top: 8px;
}
/* 让card出现的时候有动画效果 */
.move {
  animation: animated 0.5s;
}
@keyframes animated {
  0% {
    top: 0;
    left: 0px;
  }
  50% {
    top: 0px;
    left: 1000px;
  }
  100% {
    top: 0px;
    left: 600px;
  }
}
</style>

