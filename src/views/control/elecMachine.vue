<template>
  <!-- 电机信息页面及控制页面 -->
  <Row>
    <Col span="8">
      <Card>
        <div id="elec" class="myChart"></div>
      </Card>
    </Col>
    <Col span="16">
      <div>

      </div>
    </Col>
  </Row>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let elec = this.$echarts.init(document.getElementById("elec"));
      elec.setOption({
        series: [
          {
            name: "设备参数",
            type: "gauge",
            detail: { formatter: "{value}r/min" },
            data: [{ value: 300, name: "转速" }],
            min: 200,
            max: 700,
            title: {
              color: "#08acf8"
            },
            splitNumber: 10,
            fontWeight: "bloder",
            radius: "100%",
            axisLine: {
              lineStyle: {
                color: [[4 / 5, "#91c7ae"], [1, "#c23531"]]
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
.myChart {
  display: block;
  width: 400px;
  height: 300px;
}
</style>

