<template>
   <div id="wechat" class="flexv">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.go(-1)" class="rd rd-houtui flex centerv side icon"></a>
         <div class="flexitem center title">微信绑定</div>
         <a href="javascript:;" class="flex center side save"></a>
      </div>
      <div id="main" class="flexitemv">
         <div id="bind" class="flexitemv">
            <div class="flex connect">
               <img :src="userImg" class="flex">
               <div class="flexitemv info">
                  <h3 class="flexitem">{{userName}}</h3>
                  <p>您当前已绑定微信</p>
               </div>
            </div>
            <div class="flexitemv center qrcode">
               <div class="flex center"><img :src="qrcodeImg"></div>
               <h2>长按识别二维码加关注！</h2>
               <p>关注公众号后可通过公众号直接登录！</p>
            </div>
            <div class="flexitem center bind"><a href="javascript:;" @click="btn" class="flex center unbind">{{btntxt}}</a></div>
         </div>
      </div>
   </div>
</template>
<script>
   import myHeader from '../header/header.vue'

   export default{
      components:{
         myHeader
      },
      data(){
         return{
            userImg:'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK9mYAqiby94VDjt5hG3zOtnGWrqyLhOeMjbErPTwND0kAhp3znIlelcN9mZoLsaG5I3m7riamYfczw/132',
            userName:'小胡',
            qrcodeImg:'http://pic.wuxixinsanguo.cn/qrcode/20170407/58e7015515dc4.jpg',
            btntxt:'解除绑定'
         }
      },
      methods:{
         btn(){
            this.userImg='http://pic.wuxixinsanguo.cn/logo/sh.jpg',
            this.userName='尚未绑定',
            this.btntxt='立即绑定'
         }
      }
   }
</script>

<style>
   #bind .connect{position: relative; background: #13C313; height: 80px; margin-bottom: 30px;}
   #bind .connect img{position: absolute; left: 30px; bottom: -30px; width: 60px; height: 60px; border-radius: 50%;}
   #bind .connect .info{position: absolute; left: 100px; bottom: -24px;}
   #bind .connect .info h3{font-size: 1.1em; font-weight: normal; color: #fff; line-height: 30px; padding-bottom: 8px;}
   #bind .connect .info p{font-size: 0.9em; color: #999; height: 16px;}
   #bind .qrcode div{width: 200px; height: 200px;}
   #bind .qrcode img{width: 100%; height: 100%;}
   #bind .qrcode h2{font-size: 1.1em; font-weight: normal; padding: 10px;}
   #bind .qrcode p{font-size: 0.9em; color: #999; text-align: center;}
   #bind .bind a{width: 140px; height: 50px; border-radius: 50px; background: #28a7e1; color: #fff;}
</style>
