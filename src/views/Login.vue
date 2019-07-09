<template>
<div class="wrapper" :style="{height: autoHeight}">
  <Card class="inner">
    <p slot="title" class="title">
      <Icon type="md-happy" class="photo"></Icon>管理员登录
    </p>
    <Form ref="loginUser" :model="loginUser" :rules="ruleInline" style="width: 240px;margin-left:43px;margin-top:8px;">
      <FormItem prop="name">
        <Input type="text" v-model="loginUser.name" placeholder="请输入姓名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="loginUser.password" placeholder="请输入密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Checkbox v-model="config.remember">记住密码</Checkbox>
      </FormItem>
      <FormItem>
        <Button type="info" @click="handleCancel('loginUser')">重置</Button>
        <Button type="primary" @click="handleSubmit('loginUser')" class="cancel">登录</Button>
      </FormItem>
      <div><p class="register">还没有账号？马上<router-link to="/register">注册</router-link></p></div>
    </Form>
  </Card>
  </div>
</template>

<script>
const Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      autoHeight: "",
      loginUser: {
        name: "",
        password: ""
      },
      config: {
        remember: ""
      },
      ruleInline: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不小于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  beforeMount(){
    this.autoHeight = window.innerHeight + "px";
  },
  created() {
    // 在页面加载时从cookie获取登录信息
    let name = this.getCookie("name");
    let password = Base64.decode(this.getCookie("password"));//对存入cookie中的密码解密
    // 如果用户名存在赋值给表单，并且将记住密码勾选
    if (name) {
      this.loginUser.name = name;
      this.loginUser.password = password;
      this.config.remember = true;
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/account", this.loginUser)
            .then(res => {
              if (res.data.code > 300) {
                // 登录失败，账号或密码错误
                this.$Message.error(res.data.msg);
              } else {
                // 登录成功
                let token = res.data.data.token;
                localStorage.setItem("token", token);
                this.$Message.success("登录成功！欢迎您！");
                this.$router.push("/home");
                // 储存登录信息(账号密码存到cookie中)
                this.setUserInfo();
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$Message.error("账号或密码格式不对！");
        }
      });
    },
    handleCancel(name) {
      this.$refs[name].resetFields();
      this.config.remember = false;
      this.loginUser = "";
    },
    // 储存表单信息
    setUserInfo() {
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，密码经过Base64加密
      // 如果没有勾选，储存的信息为空
      if (this.config.remember) {
        this.setCookie("name", this.loginUser.name);
        // base64加密密码
        let passWord = Base64.encode(this.loginUser.password);//对存入cookie中的密码加密
        this.setCookie("password", passWord);
      } else {
        this.setCookie("name", "");
        this.setCookie("password", "");
      }
    },
    // 获取cookie
    getCookie(key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + "=");
        if (start !== -1) {
          start = start + key.length + 1;
          var end = document.cookie.indexOf(";", start);
          if (end === -1) end = document.cookie.length;
          return unescape(document.cookie.substring(start, end));
        }
      }
      return "";
    },
    // 保存cookie
    setCookie(cName, value, expiredays) { //expiredays是保留的天数
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        cName +
        "=" +
        decodeURIComponent(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background: url("../assets/loginBkg.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.inner {
  width: 360px;
  margin-top: 300px;
  margin-left: 1055px;
}
.title {
  font-size: 18px;
  text-align: center;
}
.photo {
  font-size: 22px;
}
.cancel {
  margin-left: 12px;
}
.register {
  text-align: center;
}
.ivu-form-item {
  text-align: center;
}
</style>
