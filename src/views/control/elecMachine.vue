<template>
  <!-- 电机信息页面及控制页面 -->
  <div>
    <Row :gutter="20">
      <Col span="8">
        <div class="data">
          <Card>
            <div id="dashBoard" class="myChart"></div>
          </Card>
        </div>
      </Col>
      <Col span="16">
        <Card>
          <div id="brokenLine" class="line"></div>
        </Card>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">
            <Icon type="md-cog"></Icon>控制电机的转速转向
          </p>
          <Form ref="elecCtrl" :model="elecCtrl">
            <FormItem label="转速" prop="speed">
              <Input type="number" placeholder="请输入电机的转速" style="width: 200px;" v-model="elecCtrl.speed"></Input>&nbspr/min
            </FormItem>
            <FormItem label="转向" prop="turn">
              <RadioGroup v-model="elecCtrl.turn">
                <Radio label="clockWise"><Icon type="ios-redo" />顺时针</Radio>
                <Radio label="antiClockWise"><Icon type="ios-undo" />逆时针</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem style="margin-left:36px">
              <Button type="primary">确定</Button>
              <Button style="margin-left: 8px" @click="handleCancel('elecCtrl')">取消</Button>
            </FormItem>
            <div class="photo">
              <img src="../../assets/elec.png" alt title="电机">
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      buttonSize: "large",
      elecCtrl: {
        speed: '',
        turn: ''
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 电机的仪表盘，显示实时数据
      let dashBoard = this.$echarts.init(document.getElementById("dashBoard"));
      let brokenLine = this.$echarts.init(
        document.getElementById("brokenLine")
      );
      dashBoard.setOption({
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
      // 电机的折线图，显示历史数据
      brokenLine.setOption({
        title: {
          text: "电机转速记录"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["电机转速"]
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
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "电机转速",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            data: [220, 532, 401, 334, 200, 330, 600]
          }
        ]
      });
    },
    handleCancel(name) {
      this.$refs[name].resetFields();
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
.line {
  display: block;
  width: 840px;
  height: 300px;
}
.photo {
  position: absolute;
  top: 73px;
  right: 245px;
}
</style>

