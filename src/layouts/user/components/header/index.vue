<template>
  <div class="header-container">
    <logo></logo>
    <navigation></navigation>
    <drop-menu></drop-menu>
  </div>
</template>

<script lang='ts' setup>
import Navigation from './components/navigation.vue';
import DropMenu from './components/drop-menu.vue';
import Logo from './components/logo.vue'
defineOptions({
  name:"Header"
})
</script>

<style scoped lang='scss'>
.header-container {
  height: var(--user-header-height);
  box-sizing: border-box;
  padding: 10px 20px;
  box-shadow: 0 -2px 10px var(--box-shadow-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color-1);
}
</style>