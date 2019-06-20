<template>
<!-- 滑台信息及控制页面 -->
  <div>
    <!-- 滑台信息 -->
    <Row>
      <Col span="16" offset="4">
        <Card>
          <!-- 折线图 -->
          <div id="slideTable" class="myChart"></div>
          <!-- 时间选择查询 -->
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
        </Card>
      </Col>
    </Row>
    <br>
    <!-- 滑台控制 -->
    <Row>
      <Col span="16" offset="4">
        <Card style="width: 450px;">
          <p slot="title">
            <Icon type="md-cog"></Icon>控制滑台的移动(单位cm)
          </p>
          <Form ref="slideTable" :model="slideTable">
            <FormItem label="速度" prop="speed">
              <RadioGroup v-model="slideTable.speed">
                <Radio label="slow">慢速
                </Radio>
                <Radio label="middle">中速
                </Radio>
                <Radio label="fast">快速
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="方向" prop="direction">
              <RadioGroup v-model="slideTable.direction">
                <Radio label="back"><Icon type="ios-arrow-back"></Icon>后退</Radio>
                <Radio label="forward"><Icon type="ios-arrow-forward"></Icon>前进</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="当前距离" prop="distance">
              <br>
              <Slider v-model="slideTable.distance" show-input show-stops :min="0" :max="20" :step="5"></Slider>
            </FormItem>
            <FormItem label="运行状态">
            <i-switch v-model="slideTable.switch" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
            </i-switch>
          </FormItem>
          <FormItem style="margin-left:36px">
              <Button type="primary" @click="handleSubmit()">确定</Button>
              <Button style="margin-left: 8px" @click="handleCancel('slideTable')">取消</Button>
            </FormItem>
          </Form>
        </Card>
        <!-- 滑台图片 -->
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
        distance: 5,
        direction: '',
        speed: '',
        switch: true
      },
      buttonSize: "small",
      value: "",
      timeSelect: {
        start: "",
        end: ""
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
            data: [220, 232, 201, 134, 200, 30, 60]
          }
        ]
      });
    },
    handleCancel(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit(){
      console.log(this.slideTable);
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

