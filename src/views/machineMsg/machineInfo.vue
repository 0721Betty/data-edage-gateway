<template>
  <!-- 设备信息页面 -->
  <div class="wrapper">
    <div class="excel">
      <Table border :columns="columns" :data="data1"></Table>
      <router-link to="/home/changeInfo" tag="span">
        <Button class="changeBtn" type="primary">修改</Button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "ID 编号",
          key: "id",
          width: 200,
          align: "center"
        },
        {
          title: "设备名称",
          key: "name",
          width: 200,
          align: "center"
        },
        {
          title: "设备类型",
          key: "type",
          width: 200,
          align: "center"
        },
        {
          title: "设备描述",
          key: "describe",
          width: 400,
          align: "center"
        }
      ],
      data1: []
    };
  },
  mounted() {
    this.getMachineId();
  },
  methods: {
    //  先获取设备的Id，然后根据id输入设备的信息
    getMachineId() {
      this.$axios
        .get("/api/machine", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(res => {
          let data = [];
          for (let i = 0; i < res.data.data.length; i++) {
            data.push({
              key: i,
              id: res.data.data[i].machineId,
              name: res.data.data[i].name,
              describe: res.data.data[i].machineDesc,
              type: res.data.data[i].type
            });
          }
          this.data1 = data;
        });
    }
  }
};
</script>
<style scoped>
.excel {
  width: 1003px;
  margin: 100px auto;
}
.changeBtn {
  margin: 20px 474px;
}
</style>

