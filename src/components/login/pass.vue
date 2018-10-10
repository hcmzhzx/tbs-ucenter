<template>
   <div id="login">
      <div class="flexv center top" :style="{background:`url(${signBj}) 0% 0% / cover`}">
         <div class="logo" :style="{backgroundImage:`url(${logo})`}"></div>
         <div class="flex centerv link">
            <router-link :to="{name:'login'}" v-if="!($route.name === 'forget')" :class="['flexitem','center',{current:$route.name === 'login'}]">登录</router-link>
            <router-link :to="{name:'register'}" v-if="!($route.name === 'forget')" :class="['flexitem','center',{current:$route.name==='register'}]">注册</router-link>
            <a href="javascript:;" v-if="$route.name === 'forget'" class="flexitem center current">找回密码</a>
         </div>
      </div>
      <router-view></router-view>
   </div>
</template>
<script>
   export default{
      created(){
         this.$store.dispatch('partnerList').then(logo=>{
             this.logo = logo.logo
         })
      },
      data(){
         return{
            signBj:'http://tbs.wasd1.com/themes/ucenter/image/sign_bg.jpg',
            logo:'',
         }
      }
   }
</script>

<style>
   #login .top{position: relative; height: 120px; padding-bottom: 50px;}
   #login .top .logo{width: 80px; height: 80px; border-radius: 50%; background-size: cover; box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.2);}
   #login .top .link{position: absolute; left: 0; right: 0; bottom: 0;}
   #login .top .link a{position: relative; width:50%; height: 50px; color: #fff; font-size: 1.1em;}
   #login .top .link a:after{content: ''; position: absolute; left: 50%; bottom: 0; margin-left: -8px; border: 8px solid transparent;}
   #login .top .link a.current:after{border-color: transparent transparent #fff transparent;}
   #login .top .link em{width: 1px; height: 20px; background: #fff;}

   #login .form{padding: 20px;}
   #login .form .row{border-bottom: 1px solid #eee; padding: 10px 0; margin: 5px 0;}
   #login .form .row i{font-size: 1.2em; color: #ccc; height: 30px; width: 30px;}
   #login .form .row input.text{border: none; background: none; padding: 5px; height: 20px;}
   #login .form .row button.submit{width: 80%; height: 40px; border-radius: 40px; border: none; background: #f40; font-size: 1rem; color: #fff;}
   #login .form .row a.forget{font-size: 0.9em; color: #999; height: 30px;}
   #login .form .row a.getcode{color: #27e; font-size: 0.95em;}
   #login .form .row a.getcode.disable{color: #999;}
   #login .form .row:last-child{border-bottom: none;}
   #login .form .row.sub{padding-top: 20px;}
   #login .form .row.sub a.deal{margin: 10px 0; color: #999;}
   #login .form .row.sub a.back{margin-top: 20px; color: #ccc;}
</style>
