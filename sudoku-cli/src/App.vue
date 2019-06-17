<template>
  <div id="app">
    <!--跟据路由其中设置的路径与组件的对应关系，将<router-view/>替换为对应的组件-->
    <router-view/>

  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
