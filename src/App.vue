<template>
  <div id="app">
    <router-view />

  </div>
</template>
<script>
export default {

};
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
button {
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  background: #ffffff;
  transition: all 0.2s linear;
  -webkit-tap-highlight-color: transparent;
}
input {
  -webkit-tap-highlight-color: transparent;
}
button:hover {
  transform: scale(0.95);
  opacity: 0.8;
  
}
</style>