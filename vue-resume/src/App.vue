<template>
  <!--<div class="page">-->
    <!--<header>-->
      <!--<Topbar/>-->
    <!--</header>-->
    <!--<main>-->
      <!--<ResumeEditor/>-->
      <!--<ResumePreview/>-->
    <!--</main>-->
  <div>
    <div class="page">
      <header>
        <Topbar/>
      </header>
      <main>
        <ResumeEditor/>
        <ResumePreview/>
      </main>
    </div>
  </div>
</template>

<script>
  import 'normalize.css/normalize.css'
  import './assets/reset.css'

  import Topbar from './components/Topbar'
  import ResumeEditor from './components/ResumeEditor'
  import ResumePreview from './components/ResumePreview'
  import icons from './assets/icons'

  import store from './store/index'
  import AV from './lib/leancloud'
  console.log('我是app')

  import getAVUser from './lib/getAVUser'



  export default {
  name: 'app',
  store,
  components: {
    Topbar,
    ResumeEditor,
    ResumePreview
  },
  data() {
  	return {
    }
  },
  created() {
  	document.body.insertAdjacentHTML('afterbegin', icons)
    let state = localStorage.getItem('state')
    if(state){
  		state = JSON.parse(state)
    }
    this.$store.commit('initState',state)
    this.$store.commit('setUser',getAVUser())
  }
}
</script>

<style lang="less" rel="stylesheet/less">

  .page{
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #eaebec;
  }
  .page>main{
    flex-grow: 1;
    max-width: 1440px;
    min-width: 1024px;
    margin-top: 16px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    width: 100%;
    align-self: center;
  }

  #resumeEditor{
    min-width: 35%;
    background: #444;
  }

  #resumePreview{
    flex-grow: 1;
    margin-left: 16px;
    background: #777;
  }
  svg.icon{
    height: 1em;
    width: 1em;
    fill: currentColor;
    vertical-align: -0.1em;
    font-size: 16px;
  }
</style>
