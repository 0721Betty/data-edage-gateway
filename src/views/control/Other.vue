<template>
  <!-- 滑台和推杆信息及控制页面 -->
  <div class="wrapper">
    <!-- 滑台信息 -->
    <Row :gutter="60" class="contain">
      <Col span="8" offset="3">
        <Card style="width: 450px;">
          <p slot="title">
            <Icon type="md-cog"></Icon>滑台状态信息
          </p>
          <Form ref="slideTable" :model="slideTable">
            <FormItem label="运行状态">
              <i-switch v-model="slideTable.switch" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
              </i-switch>
            </FormItem>
            <FormItem label="方向" prop="direction">
              <RadioGroup v-model="slideTable.direction">
                <Radio label="back">
                  <Icon type="ios-arrow-back"></Icon>后退
                </Radio>
                <Radio label="forward">
                  <Icon type="ios-arrow-forward"></Icon>前进
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="速度" prop="speed">:
              {{slideTable.speed}}mm/s
            </FormItem>
            <FormItem style="margin-left:36px">
              <!-- 滑台控制 -->
              <Button type="primary" @click="modal1 = true">修改</Button>
              <Modal title="设置滑台的状态" v-model="modal1" :mask-closable="false" @on-ok="slideSubmit">
                <Form ref="slideCg" :model="slideCg">
                  <FormItem label="运行状态">
                    <i-switch v-model="slideCg.switch" size="large">
                      <span slot="open">On</span>
                      <span slot="close">Off</span>
                    </i-switch>
                  </FormItem>
                  <FormItem label="速度" prop="speed">
                    <RadioGroup v-model="slideCg.speed">
                      <Radio label="slow">慢速</Radio>
                      <Radio label="middle">中速</Radio>
                      <Radio label="fast">快速</Radio>
                    </RadioGroup>
                  </FormItem>
                </Form>
              </Modal>
            </FormItem>
          </Form>
          <!-- 滑台图片 -->
          <div class="slidePh">
            <img src="../../assets/slideTable.png" alt title="滑台">
          </div>
        </Card>
      </Col>
      <Col span="8">
        <!-- 推杆信息 -->
        <Card style="width: 450px;">
          <p slot="title">
            <Icon type="md-cog"></Icon>推杆状态信息
          </p>
          <Form ref="pushRod" :model="pushRod">
            <FormItem label="推送距离" prop="distance">
              <br>
              <Slider v-model="pushRod.distance" show-input show-stops :min="0" :max="20" :step="5"></Slider>
            </FormItem>
            <FormItem >
              <!-- 推杆控制 -->
              <Button type="primary" @click="modal2 = true">修改</Button>
              <Modal title="设置推杆推送距离" v-model="modal2" :mask-closable="false" @on-ok="pushSubmit">
                <Form ref="pushCg" :model="pushCg">
                  <FormItem label="推送距离" prop="distance">
                    <br>
                    <Slider
                      v-model="pushCg.distance"
                      show-input
                      show-stops
                      :min="0"
                      :max="20"
                      :step="5"
                    ></Slider>
                  </FormItem>
                </Form>
              </Modal>
            </FormItem>
          </Form>
          <!-- 推杆图片 -->
          <div class="pushPh">
            <img src="../../assets/pushRod.png" alt="" title="推杆">
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 滑台信息
      slideTable: {
        switch: true,
        speed: "8",
        direction: ""
      },
      // 推杆信息
      pushRod: {
        distance: ""
      },
      // 修改滑台信息
      modal1: false,
      slideCg: {
        switch: "",
        speed: ""
      },
      // 修改推杆信息
      modal2: false,
      pushCg: {
        distance: ""
      }
    };
  },
  methods: {
    slideSubmit() {
      console.log(this.slideCg);
    },
    pushSubmit(){
      console.log(this.pushCg);
    }
  }
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background: url("../../assets/bkg.png") no-repeat;
  border: 1px solid #fff;
}
.contain{
  margin-top: 100px;
}
.ivu-input{
  width: 35%!important;
}
.slidePh {
  position: absolute;
  top: 103px;
  right: 60px;
}
.pushPh{
  position: absolute;
  top: 150px;
  right: 105px;
}
.ivu-icon-ios-calendar-outline:before {
  content: none;
}
</style>

