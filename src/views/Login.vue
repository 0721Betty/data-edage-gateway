<template>
  <Card class="wrapper">
    <p slot="title" class="title">
      <Icon type="md-happy" class="photo"></Icon>管理员登录
    </p>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="请输入姓名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="请输入密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Checkbox v-model="config.remember">记住密码</Checkbox>
      </FormItem>
      <FormItem>
        <Button type="success" @click="handleSubmit('formInline')">登录</Button>
        <Button type="info" @click="handleCancel('formInline')" class="cancel">取消</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      config: {
        remember: true
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    toRegister() {},
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          // 此处还应该实现查看该用户名有没有在数据库中，并且用户名与密码应该相匹配
          // 跳转到Main.vue
          this.$router.replace('/main');
        } else {
          this.$Message.error("Fail!");
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
