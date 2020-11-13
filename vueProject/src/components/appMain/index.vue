<template>
  <div class="main">  
    <app-link v-show="$route.path !== '/home'"></app-link>
  
    <router-view></router-view>
  </div>
</template>

<script>
import AppLink from './link.vue'
export default {
    components:{
        AppLink
    }
};
</script>
<style scoped>
.main {
  position: absolute;
  top: 50px;
  left: 230px;
  bottom: 0;
  right: 0;
  padding: 10px;
  overflow-y: auto;   
  /* text-align: center; */
}
.el-breadcrumb{
    height: 10px;
    padding: 20px;
    border-radius: 20px;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

</style>