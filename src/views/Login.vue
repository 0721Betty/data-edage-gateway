<template>
  <Card class="wrapper">
    <p slot="title" class="title">
      <Icon type="md-happy" class="photo"></Icon>管理员登录
    </p>
    <Form ref="loginUser" :model="loginUser" :rules="ruleInline">
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
        <Button type="primary" @click="handleSubmit('loginUser')">登录</Button>
        <Button type="info" @click="handleCancel('loginUser')" class="cancel">取消</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
const Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
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
      console.log(this.config.remember);
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
  width: 360px;
  margin: 60px auto;
}
.title {
  font-size: 18px;
}
.photo {
  font-size: 24px;
}
.cancel {
  margin-left: 8px;
}
</style>
