<template>
   <div id="promotion" class="flexv">
      <my-header :content="text" :router="router"></my-header>
      <div id="main" class="flexitemv">
         <div id="push">
            <div class="flexv counter">
               <div class="flexitemv center today">
                  <h4>今日推广</h4>
                  <h2 class="flexitem">{{dayTotal}}</h2>
               </div>
               <div class="flex pride">
                  <div class="flexitemv">
                     <p>累计获得奖励(月)</p>
                     <h3>{{allTotal}}</h3>
                  </div>
               </div>
            </div>
            <div class="pushtips" style="color: red">当前推广开通一个奖励会员时长个月</div>
            <ul class="showlist">
               <router-link tag="li" class="flex" :to="{name:'record',query:{member:1}}">
                  <i class="flex center rd rd-opened"></i>
                  <div class="flexitemv info"><h3 class="flexitem">已开通</h3>
                     <p>查看我推广已开通的会员</p></div>
                  <em class="flex center rd rd-qianjin"></em>
               </router-link>
               <router-link tag="li" class="flex" :to="{name:'record',query:{member:0}}">
                  <i class="flex center rd rd-unopen"></i>
                  <div class="flexitemv info"><h3 class="flexitem">未开通</h3>
                     <p>查看我推广未开通的会员</p></div>
                  <em class="flex center rd rd-qianjin"></em>
               </router-link>
            </ul>
         </div>
      </div>
   </div>
</template>
<script>
   import myHeader from '../header/header.vue'
   import axios from '../../assets/js/axios'

   export default{
      components:{
         myHeader
      },
      created(){
         axios.get('extension/reward/user').then(total=>{
            this.dayTotal = total.extension_count
            this.allTotal = total.reward_month
         })
      },
      data(){
         return{
            text:'推广系统',
            router:'user',
            dayTotal:0,
            allTotal:0,
         }
      }
   }
</script>

<style>
   #push .counter{height: 240px; background: #cc3333;}
   #push .counter .today{padding: 40px 10px 0; color: #fff;}
   #push .counter .today h2{font-size: 2em; font-weight: normal; padding-top: 6px;}
   #push .counter .today h4{font-weight: normal; font-size: 1em;}
   #push .pride{background: rgba(0,0,0,0.4); color: #fff; padding: 10px;}
   #push .pride p{font-size: 0.9em; padding-bottom: 4px;}
   #push .pride h3{font-size: 1.1em; font-weight: normal;}
   #push .pushtips{padding: 10px; font-size: 0.9em; color: #888;}
   #push .showlist{border-top: 1px solid #eee;}
   #push .showlist li{position: relative; height: 40px; padding: 6px; border-bottom: 1px solid #eee; background: #fff;}
   #push .showlist li i{width: 40px; height: 40px; border-radius: 2px; background: #49E845; font-size: 1.4em; color: #fff;}
   #push .showlist li:last-child i{ background: #0076ff;}
   #push .showlist li em{font-size: 1.2em; color: #888;}
   #push .showlist li div{padding: 0 10px;}
   #push .showlist li div h3{font-weight: normal; font-size: 1em;}
   #push .showlist li div p{font-size: 0.8em; color: #888; height: 16px;}
   #push .showlist li a{position: absolute; top: 0; left: 0; right: 0; bottom: 0;}
</style>
