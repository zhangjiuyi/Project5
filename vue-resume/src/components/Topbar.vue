/**
* Created by jiuyi on 2017/2/6.
*/

<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resumer</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Topbar'
  }
</script>


<style>
  #topbar{
    background: #fff;
    box-shadow: 0 1px 3px 0 raba(0,0,0,0.25);
  }
  #topbar>.wrapper{
    min-width: 1024px;
    max-width: 1440px;
    margin: 0 auto;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
  }

  #topbar .logo{
    color: #000;
    font-size: 24px;
  }


</style>
