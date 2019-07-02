<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  mounted(){
    this.$Message.config({
        top: 80,
        duration: 10
      });
  }
}
</script>

