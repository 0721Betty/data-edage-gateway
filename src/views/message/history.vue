<template>
<!-- 横轴根据后台传递过来的json数据的长度或时间点决定 -->
  <div>
    <div class="selectTime">
      <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="Select date and time(Excluding seconds)" style="width: 300px"></DatePicker>
    </div>
    <Row>
      <Col span="24">
        <Card>
          <div id="temp" class="myChart"></div>
        </Card>
      </Col>
    </Row>
  </div>
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
      let temp = this.$echarts.init(document.getElementById("temp"));
      temp.setOption({
        title: {
          text: "设备历史数据"
        },
        tooltip: {
          trigger: "axis",
          formatter: '{b}<br/>{a0}:{c0}℃<br/>{a1}:{c1}%rh<br/>{a2}:{c2}V<br/>{a3}:{c3}A<br/>{a4}:{c4}Kg<br/>{a5}:{c5}W',
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["温度", "湿度", "电压", "电流", "压力", "功率"]
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            restore: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            // width: 50
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "温度",
            type: "line",
            stack: "总量",
            data: [40.1, 43.2, 30.5, 34.6, 90, 23.0, 21.9]
          },
          {
            name: "湿度",
            type: "line",
            stack: "总量",
            data: [30.9, 40.8, 33.3, 44.4, 49.9, 42.3, 36.6]
          },
          {
            name: "电压",
            type: "line",
            stack: "总量",
            data: [5.0, 16.333, 22.333, 21.154, 16.19, 20.33, 22.41]
          },
          {
            name: "电流",
            type: "line",
            stack: "总量",
            data: [4.32, 4.332, 5.301, 3.334, 3.39, 4.33, 2.32]
          },
          {
            name: "压力",
            type: "line",
            stack: "总量",
            data: [82.12, 93.322, 90.131, 93.444, 88.129, 89.133, 95.132]
          },
          {
            name: "功率",
            type: "line",
            stack: "总量",
            data: [109.132, 108.332, 102.301, 110.334, 110.139, 120.033, 102.032]
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
  width: 1309px;
  height: 630px;
}
.selectTime{
  position: absolute;
  z-index: 999;
  right: 153px;
  top: 134px;
}
</style>
