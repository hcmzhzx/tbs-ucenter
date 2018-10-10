<template>
   <div id="header" class="flex">
      <a href="javascript:" @click="go" class="rd rd-houtui flex centerv side icon"></a>
      <div class="flexitem center title">{{content}}</div>
      <div class="flex center side"></div>
   </div>
</template>
<script>
   export default{
      props: ['content', 'router'],
      methods: {
         go(){
            if (this.router) {
               this.$router.push({name: this.router})
            } else {
               this.$router.go(-1)
            }
         }
      }
   }
</script>
