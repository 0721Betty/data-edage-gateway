<template>
  <div class="wrapper">
    <!-- 设备信息修改页面 -->
    <Card class="inner">
      <p slot="title" class="title">
        <Icon type="ios-card"/>设备信息修改
      </p>
      <Form ref="machineInfo" :model="machineInfo" :label-width="60">
        <FormItem label="ID" prop="machineId">
          <Input v-model="machineId" placeholder="请输入设备相应的Id对其信息进行修改"></Input>
        </FormItem>
        <FormItem label="设备名称" prop="name">
          <Input v-model="machineInfo.name"></Input>
        </FormItem>
        <FormItem label="设备类型" prop="type">
          <Input v-model="machineInfo.type"></Input>
        </FormItem>
        <FormItem label="设备描述" prop="desc">
          <Input v-model="machineInfo.desc" type="textarea"></Input>
        </FormItem>
        <FormItem style="margin-left:53px">
          <Button type="primary" @click="handleSubmit('machineInfo')">提交</Button>
          <Button type="info" @click="handleReset('machineInfo')" class="reset">重置</Button>
          <router-link to="/home/machineInfo" tag="span">
            <Button class="back" type="success">返回</Button>
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
        machineId: "",
      machineInfo: {
        name: "",
        type: "",
        desc: ""
      },
    //   rules: {
    //     machineId: [
    //       {
    //         required: true,
    //         message: "设备Id不能为空",
    //         trigger: "blur"
    //       }
    //     ]
    //   }
    };
  },
  methods: {
    handleSubmit(name) {
      console.log(this.machineId);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$axios
            .put(
              `/api/machine/${this.machineId}`,
              this.machineInfo,
              {headers: { token: localStorage.getItem("token")},}
            )
            .then(res => {
                if(res.data.data.row > 0){
                    // 根据res.data.data.row判断修改成功与否
                    this.$Message.success("修改成功！");
                    this.$router.push('/home/machineInfo');//注册成功后跳转到login页面
                }else{
                    this.$Message.error("修改失败！");
                }
                console.log(res);
                console.log(this.machineInfo.name);
              }
            )
            .catch(error => {
              console.log(error);
            });
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
/* .wrapper {
  width: 100%;
  height: 100%;
  background: url("../../assets/bkg.png") no-repeat;
  border: 1px solid #fff;
} */
.inner {
  width: 450px;
  height: 372px;
  margin: 115px auto;
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
.reset,
.back {
  margin-left: 8px;
}
</style>

