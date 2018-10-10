<template>
   <div id="details" class="flexv">
      <header class="flex center">
         <a href="javascript:;" class="flex" @click="$router.go(-1)"><span class="rd rd-houtui"></span></a>
         <h1 class="flexitem center">咨询详情</h1>
      </header>

      <div class="info">
         <div class="p1">
            <span class="hint">姓&ensp;&ensp;&ensp;&ensp;名：</span>
            <span>{{contactdata.name}}</span>
         </div>
         <div class="p1">
            <span class="hint">手机号码：</span>
            <span>{{contactdata.phone}}</span>
         </div>
         <div class="p1">
            <span class="hint">年龄段：</span>
            <span>{{contactdata.age}}</span>
         </div>
         <div class="p1">
            <span class="hint">咨询内容：</span>
            <span>{{contactdata.message}}</span>
         </div>
      </div>
      <div class="flexv center qrcode">
         <div class="img">
            <img src="http://pic.wuxixinsanguo.cn/qrcode/20171130/5a1fa056bdfe6.jpg">
         </div>
         <p style="text-align:center">长按识别二维码<br>联系客服咨询</p>
      </div>

   </div>
</template>

<script>
   import axios from '../../assets/js/axios'

   export default {
      created(){
         let Id = this.$route.query.id, state = this.$route.query.state;
         console.log(state);
         //初次加载
         if(state == 'read'){
            this.$store.dispatch('readMgsData').then(msg=>{
               this.contactdata = msg.filter((item)=>{
                   return item.id == Id
               })[0]
            })
         }  else if(state == 'unread'){
            this.$store.dispatch('unreadMgsData').then(msg=>{
               this.contactdata = msg.filter((item)=>{
                  return item.id == Id
               })[0]
            })
         } else {
            this.$store.dispatch('allmsgData').then(msg=>{
               this.contactdata = msg.filter((item)=>{
                  return item.id == Id
               })[0]
            })
         }

         //更新留言
         axios.patch('contact/read',{id:Id})
      },
      data(){
         return{
            contactdata:{}
         }
      }
   }
</script>

<style>
   #details header{width:100%;height:3rem;background: #f20a46;color: #fefefe;padding: 0 0 0 20px;}
   #details header a{display: block;}
   #details header span{font-size: 1.4rem;}
   #details header h1{margin-left:-4rem;font-size: 1.4rem;}
   #details .info{padding:0 1rem 1rem;color:#333;}
   #details .info .p1{border-bottom: 1px solid #ddd;padding:1rem 0;}
   #details .info .p1 span{font-size: 1.3rem;}
   #details .info .p1 .hint{width: 4.86rem;}
   #details .dredge{padding: 10px;}
   #details .dredge .button{width:100%;height: 4rem;font-size:1.5rem;background: #f20a46;border-radius: 5px;color: #fff;}
   #details .dredge p{color: #F20A46;padding: 10px 0;font-size: 1.2rem;}
   /*#details .qrcode{margin: 10px 0;padding: 5px;}*/
   #details .qrcode .img{width: 120px;height: 120px;background: #fff;}
   #details .qrcode .img img{width: 100%;height:100%;}
</style>
