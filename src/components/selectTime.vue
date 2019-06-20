<template>
  <div class="selectTime">
    <Form :model="timeSelect">
      <FormItem>
        <DatePicker
          type="datetimerange"
          placeholder="请选择日期和时间"
          style="width: 300px"
          v-model="value"
        ></DatePicker>
        <Button type="primary" :size="buttonSize" class="sure" @click="handleSubmit()">查询</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      buttonSize: "small",
      value: "",
      timeSelect: {
        start: "",
        end: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      let value1 = this.value[0]; //获取起始时间
      let value2 = this.value[1]; //获取结束时间
      this.timeSelect.start = Number(value1);
      this.timeSelect.end = Number(value2);
      // console.log(this.timeSelect);
      // this.$axios
      //   .post("", this.timeSelect, {
      //     headers: {
      //       token: localStorage.getItem("token")
      //     }
      //   })
      //   .then(res => {})
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  }
};
</script>
<style scoped>
.ivu-icon-ios-calendar-outline:before {
  content: none;
}
.selectTime {
  margin-top: 32px;
  text-align: center;
}
.sure {
  margin-left: 8px;
}
</style>
