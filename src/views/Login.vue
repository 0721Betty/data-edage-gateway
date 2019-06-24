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
export default {
  data() {
    return {
      loginUser: {
        name: "",
        password: ""
      },
      config: {
        remember: true
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
              }else{
                // 登录成功
                let token = res.data.data.token;
                localStorage.setItem("token", token);
                this.$Message.success("登录成功！欢迎您！");
                this.$router.push("/home");
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
