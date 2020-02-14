<template>
  <div id="app">
    <LeftNav />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import LeftNav from "@/components/common/LeftNav";
export default {
  name: "App",
  components: {
    LeftNav
  }
};
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}
.main{
  float: left;
  width: 95%;
  background-color: #EFF2F7;
  height: 100%;
  overflow: hidden;
}
</style>
