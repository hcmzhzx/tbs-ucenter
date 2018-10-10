<template>
   <div class="flexv">
      <div id="userboard" class="flexv">
         <h2 class="flex center title">个人中心</h2>
         <div class="flexitem"></div>
         <div class="flex user">
            <div class="flexitem center side">
               <a :href="`http://${userInfo.open_id}.${studio}/#/`" @click="studio(userInfo)" class="flexv center">
                  <i class="flex center rd rd-zhuye"></i>
                  <em class="flex center">工作室</em>
               </a>
            </div>
            <div class="flexitemv center">
               <div class="head" :style="{background:`#fff url(${userInfo.upic}) 0% 0% / cover`}">
                  <i :class="['flex','center','rd','rd-diamond',{vip:vip}]"></i>
               </div>
               <h3>{{userInfo.name}}</h3>
               <a href="javascript:;" @click="$router.push({name:'info'})" class="flex centerv edit">
                  <span>{{title}}</span>
                  <i class="rd rd-edit"></i>
               </a>
            </div>

            <div class="flexitem center side">
               <a href="javascript:;" @click="$router.push({name:'payment'})" class="flexv center">
                  <i class="flex center rd rd-logout"></i>
                  <em class="flex center">升级会员</em></a>
            </div>
         </div>
      </div>

      <div id="main" class="flexitemv center">
         <div id="homelink" class="clearfix" data-ajaxurl="/msg/unread.html">
            <a href="javaScript:;" @click="$router.push({name:'uc_goods'})" class="flexv center">
               <i class="flex center rd rd-chart" style="background:#DB6EDB;"></i>
               <em class="flex">产品管理</em>
            </a>
            <a href="javaScript:;" @click="expand" class="flexv center">
               <i class="flex center rd rd-money" style="background:#43AF88;"></i>
               <em class="flex">推广系统</em>
            </a>
            <a href="javaScript:;" @click="$router.push({name:'contact'})" class="flexv center">
               <i class="flex center rd rd-message" style="background:#6BC8E7;"></i>
               <em class="flex">留言管理</em>
               <s class="flex center" v-if="count">{{count}}</s>
            </a>
            <a href="javaScript:;" @click="$router.push({name:'album-admin'})" class="flexv center">
               <i class="flex center rd rd-album" style="background:#9A5260;"></i>
               <em class="flex">相册管理</em>
            </a>
            <a href="javaScript:;" @click="$router.push({name:'wechat'})" class="flexv center">
               <i class="flex center rd rd-weixin1" style="background:#0FCF1A;"></i>
               <em class="flex">微信绑定</em>
            </a>
            <a href="javaScript:;" @click="$router.push({name:'info'})" class="flexv center">
               <i class="flex center rd rd-edit" style="background:#CC5827;"></i>
               <em class="flex">资料修改</em>
            </a>
            <a href="javascript:;" @click="$router.push({name:'uc_skin'})" uc_skin class="flexv center">
               <i class="flex center rd rd-theme" style="background:#CC5827;"></i>
               <em class="flex">更换主题</em>
            </a>
            <a href="javascript:;" class="flexv center chat">
               <i class="flex center rd rd-message" style="background:#CC5827;"></i>
               <em class="flex">即时通讯</em>
               <s class="flex center">新</s>
            </a>
            <a href="javascript:;" @click="service" class="flexv center chat contact">
               <i class="flex center rd rd-chat" style="background: #c4e437"></i>
               <em class="flex">联系客服</em>
            </a>
            <!--<a href="/page/festival.html?pid=145187&name=laodongjie" class="flexv center chat">
                   <i class="" style="display: inline-block;"><img src="/themes/ucenter/image/51.png" width="100%" height="100%"></i>
                   <em class="flex">五一</em>
                   <s class="flex center">热</s>
               </a>-->
         </div>
      </div>

      <div class="contact-box" v-show="hidden" @click="hidden=false">
         <div class="contact-content">
            <img :src="partner.service_qrcode">
            <p>长按二维码添加客服</p>
            <p>或拨打电话<a :href="`tel:${partner.phone}`">{{partner.phone}}</a></p>
         </div>
      </div>

      <!--<a href="https://mp.weixin.qq.com/s/Pru2YI9e6dfGDpgp_bLjJw" id="signature" class="flex center">免费领取事业签名&nbsp;&gt;</a>-->
   </div>
</template>
<script>
   import axios from '../../assets/js/axios'

   export default{
      created(){
         this.$store.dispatch('userInfo').then(user => {
            //this.userInfo = this.$store.getters.getuserInfo;
            this.userInfo = user
            // 判断头衔
            if(user.title){
               this.title = user.title;
            }
            // 判断会员
            if(user.is_vip){
               this.vip = true
            }
            //未读消息
            axios.get('contact/unread_count').then(unread=>{
               this.count = unread.count;
            })
         })
      },
      data(){
         return {
            url:'',
            userInfo: {
               'upic':'../../assets/image/userImg.png'
            },
            title:'设置头衔',
            hidden: false,

            vip:false,
            count:0,

            partner:{},

            studio:window.location.host
         }
      },
      methods: {
         service(){
            this.$store.dispatch('partnerList').then(partner => {
               this.partner = partner;
            })
            this.hidden = true
         },
         expand(){ //推广链接
            if(!this.userInfo.is_dealer){
               this.$router.push({name:'general'}) //普通
            } else {
               this.$router.push({name:'dealer'}) //经销商
            }
         }
      }
   }
</script>

<style scoped>
   #userboard{height: 260px; background: url(../../assets/image/user_bg.jpg) no-repeat top center; background-size: auto 180px;}
   #userboard .title{font-weight: normal; height: 40px; color: #fff; font-size: 1.05em; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);}
   #userboard .user .side{width: 0%;}
   #userboard .user .side a i{width: 40px; height: 40px; border-radius: 50%; background: #c4e437; font-size: 1.6em; color: #fff;}
   #userboard .user .side a em{font-size: 0.8em; color: #888; padding-top: 4px;}
   #userboard .user .head{position: relative; width: 80px; height: 80px; border-radius: 50%; box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.1);}
   #userboard .user .head i{position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; background: #eee; color: #fff; border-radius: 50%; border: 2px solid #fff; font-size: 0.9em;}
   #userboard .user .head i.vip{background: #f40;}
   #userboard .user h3{font-weight: normal; height: 20px; font-size: 1.1em; padding: 5px 0;}
   #userboard .user .edit span{font-size: 0.8em; color: #888;}

   #homelink{padding: 10px; max-width: 480px; margin: 0 auto;}
   #homelink a{position: relative; float: left; width: 33.33%; margin: 6px 0;}
   #homelink a i{width: 50px; height: 50px; color: #fff; border-radius: 4px; font-size: 1.8em;}
   #homelink a em{font-size: 0.9em; color: #999; padding: 4px 0;}
   #homelink a s{position: absolute; top: 50%; left: 50%; background: #f00; min-width: 16px; height: 16px; padding: 2px; font-size: 0.8em; color: #fff; margin-top: -46px; margin-left: 10px; border-radius: 50%; text-decoration: none;}

   .contact-box{position:fixed;left:0;right:0;top:0;bottom:0;background: rgba(100,100,100,.8);z-index: 99999;}
   .contact-content{width: 200px;position: absolute;left: 50%;top:30%;margin-left: -100px;}
   .contact-content>img{width: 100%;}
   .contact-content>p{text-align: center;color: #fff}
   .contact-content>p>a{color: red}



   @-webkit-keyframes pulse {from{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}50%{-webkit-transform:scale3d(1.05,1.05,1.05);transform:scale3d(1.05,1.05,1.05)}to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}
   @keyframes pulse {from{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}50%{-webkit-transform:scale3d(1.05,1.05,1.05);transform:scale3d(1.05,1.05,1.05)}to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}
   /*#signature{width:140px;height:38px;position:fixed;top:260px;right:0;border-radius:20px 0 0 20px;background:#ff4d4d;box-shadow: 2px 2px 2px 0 #999;font-size:14px;color:#fff;-webkit-animation:pulse 1s linear infinite; animation:pulse 1s linear infinite;z-index:2;}*/
</style>
