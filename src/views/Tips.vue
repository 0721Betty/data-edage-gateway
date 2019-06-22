<template>
  <div>
    <div class="success" v-if="this.msg === ''">
      <Alert type="success" show-icon closable>系统正常运行</Alert>
    </div>
    <div class="warning" v-else>
      <Alert type="warning" show-icon closable>
        系统警告
        <template slot="desc">
          <p ref="warn">{{ msg }}</p>
        </template>
        <span slot="close">不再提示</span>
      </Alert>
    </div>
    <div class="adjust">
      <Row :gutter="20">
        <Col span="8" :offset="4">
          <p class="text">温度过高时请开启散热扇</p>
          <br>
          <Button type="info" @click="open()">开启</Button>
          <Button type="primary" style="margin-left:8px;" @click="close()">停止</Button>
          <div class="fan">
            <img src="../../src/assets/fan.png" alt ref="img">
          </div>
        </Col>
        <Col span="8">
          <Card>
            <p slot="title">
              <Icon type="md-cog"></Icon>PLC信息
            </p>
            <Form ref="plc" :model="plc">
              <FormItem label="运行状态">
                <i-switch v-model="plc.switch" size="large">
                  <span slot="open">On</span>
                  <span slot="close">Off</span>
                </i-switch>
              </FormItem>
              <FormItem label="PLC选择">
                <CheckboxGroup v-model="plc.checkbox1">
                  <Checkbox label="国产"></Checkbox>
                  <Checkbox label="三菱"></Checkbox>
                  <Checkbox label="西门子"></Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem label="控制设备">
                <CheckboxGroup v-model="plc.checkbox2">
                  <Checkbox label="电机"></Checkbox>
                  <Checkbox label="滑台"></Checkbox>
                  <Checkbox label="推杆"></Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit()">确定</Button>
                <Button style="margin-left: 8px" @click="handleCancel('plc')">取消</Button>
              </FormItem>
            </Form>
          </Card>
        </Col>
        <Col span="8"></Col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "",
      timer: null,
      rotateVal: 0,
      plc: {
        switch: true,
        checkbox1: ["三菱"],
        checkbox2: ["电机", "滑台", "推杆"]
      }
    };
  },
  methods: {
    open() {
      this.timer = setInterval(() => {
        this.rotateVal += 3;
        // 设置旋转属性(顺时针)
        this.$refs.img.style.transform = "rotate(" + this.rotateVal + "deg)";
        // 设置旋转属性(逆时针)
        //img.style.transform = 'rotate(-' + rotateVal + 'deg)'
        // 设置旋转时的动画  匀速0.1s
        this.$refs.img.style.transition = "0.1s linear";
      }, 1);
    },
    close() {
      clearInterval(this.timer);
    },
    handleCancel(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit(){
      console.log(this.plc);
      
    }
  }
};
</script>
<style scoped>
/* .adjust {
  margin-bottom: 20px;
  width: 300px;
  /* display: inline-block; 
} */
.text {
  color: #08acf8;
  font-size: 16px;
}
.fan {
  margin-top: 10px;
  width: 128px;
  height: 128px;
}
</style>

