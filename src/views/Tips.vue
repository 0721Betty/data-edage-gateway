<template>
  <div>
    <div class="success" v-if="status === 1">
      <Alert type="success" show-icon>系统正常运行</Alert>
    </div>
    <div class="warning" v-else>
      <Alert type="warning" show-icon>
        系统警告
        <template slot="desc">
          <p ref="warn">{{ msg }}</p>
        </template>
      </Alert>
    </div>
    <div class="adjust">
      <p>温度过高时请开启继电器</p>
      <br>
      <i-switch size="large">
        <span slot="open">ON</span>
        <span slot="close">OFF</span>
      </i-switch>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: 2,
      msg: "温度过高，电机转速过快！！！"
    };
  }
};
</script>
<style scoped>

</style>

