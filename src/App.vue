<template>
  <div id="nav">
    <TheHeader id="header"/>
  </div>
  <router-view/>
</template>

<script>

import TheHeader from '@/components/TheHeader'

export default {
  components: {
    TheHeader
  }
}



</script>

<style lang="stylus">

body
  margin: 0


#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#header
  background-color: aliceblue
  padding: 30px

</style>
