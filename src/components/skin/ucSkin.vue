<template>
   <div class="flexv">
      <my-header :content="text" :router="router"></my-header>

      <div id="main" class="flexitemv">
         <div id="skinlist" style="padding-bottom:50px;">
            <ul class="br lists">
               <li v-for="(item,index) in themeList" :key="index">
                  <a href="javascript:;" class="flex" @click="$router.push({name:'ucDetail', query:{id:item.id}})">
                     <img :src="item.cover[0]" class="fitimg">
                  </a>
                  <p class="flexv centerh">{{item.title}}</p>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>

<script>
   import myHeader from '../header/header.vue'
   import axios from'../../assets/js/axios'

   export default {
      components: {
         myHeader
      },
      created(){
         //获取模板
         this.$store.dispatch('skinList').then(theme=>{
            this.themeList = theme
            //console.log(theme);
         })
      },
      data(){
         return {
            text: '主题市场',
            router:'',

            themeList:[]
         }
      }
   }
</script>

<style>

</style>
