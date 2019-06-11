<template>
  <Card class="wrapper">
    <p slot="title" class="title">
      <Icon type="md-happy" class="photo"></Icon>管理员注册
    </p>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="姓名" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入你的姓名"></Input>
      </FormItem>
      <FormItem label="密码" prop="pwd">
        <Input type="password" v-model="formValidate.pwd" placeholder="请输入你的密码"></Input>
      </FormItem>
      <FormItem label="验证密码" prop="pwdCheck">
        <Input type="password" v-model="formValidate.pwdCheck" placeholder="请再次输入你的密码"></Input>
      </FormItem>
      <FormItem label="手机号码" prop="mobile">
        <Input v-model="formValidate.mobile" placeholder="请输入你的手机号"></Input>
      </FormItem>
      <FormItem label="E-mail" prop="mail">
        <Input v-model="formValidate.mail" placeholder="请输入你的邮箱"></Input>
      </FormItem>
      <FormItem label="性别" prop="gender">
        <RadioGroup v-model="formValidate.gender">
          <Radio label="male">男</Radio>
          <Radio label="female">女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button type="info" @click="handleReset('formValidate')" class="reset">重置</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback("手机号格式不正确");
      } else {
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formValidate.pwd) {
        callback(new Error("与第一次输入的密码不匹配"));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        name: "",
        pwd: "",
        pwdCheck: "",
        mobile: "",
        mail: "",
        gender: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            min: 2,
            message: "姓名不少于两字",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码不小于六位",
            trigger: "blur"
          }
        ],
        pwdCheck: [
          {
            required: true,
            validator: validatePassCheck,
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          },
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        gender: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          // 提交数据代码
          // 将用户输入的信息存到数据库中
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
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
.reset {
  margin-left: 8px;
}
</style>
