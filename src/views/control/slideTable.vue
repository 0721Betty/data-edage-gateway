<template>
  <div class="contain">
    <Row>
      <Col span="16" offset="4">
        <Card>
          <div id="slideTable" class="myChart"></div>
        </Card>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="16" offset="4">
        <Card style="width: 450px;">
          <p slot="title">
            <Icon type="md-cog"></Icon>控制滑台的移动
          </p>
          <Form ref="slideTable" :model="slideTable">
            <FormItem label="当前距离" prop="distance">
              <br>
              <Slider v-model="slideTable.distance" show-input></Slider>
            </FormItem>
            <FormItem label="方向" prop="direction">
              <RadioGroup v-model="slideTable.direction">
                <Radio label="back"><Icon type="ios-arrow-back"></Icon>后退</Radio>
                <Radio label="forward"><Icon type="ios-arrow-forward"></Icon>前进</Radio>
              </RadioGroup>
            </FormItem>
            <ButtonGroup shape="circle" style="margin-left:28px;">
              <Button type="primary">
                <Icon type="ios-play"></Icon>开始
              </Button>
              <Button type="primary">
                停止
                <Icon type="md-power"></Icon>
              </Button>
            </ButtonGroup>
          </Form>
        </Card>
        <div class="photo">
          <img src="../../assets/slideTable.png" alt title="滑台">
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slideTable: {
        distance: 25,
        direction: ''
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let slideTable = this.$echarts.init(
        document.getElementById("slideTable")
      );
      slideTable.setOption({
        title: {
          text: "滑台移动距离记录"
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
          data: ["滑台移动距离"]
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
            name: "滑台移动距离",
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
    }
  }
};
</script>
<style scoped>
.myChart {
  display: block;
  width: 850px;
  height: 400px;
}
.photo {
  position: absolute;
  top: 73px;
  right: 120px;
}
</style>

