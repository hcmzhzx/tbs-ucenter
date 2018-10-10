<template>
   <div id="open_vip">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.go(-1)" class="rd rd-houtui flex centerv side icon"></a>
         <div class="flexitem center title">开通VIP</div>
         <a href="javascript:;" class="flex center side help" @click="help">帮助</a>
      </div>
      <div id="main" class="flexitemv">
         <form id="vip" method="post">
            <div class="flexv center top" :style="{background:`url(${vip_bj}) 0% 0% / cover`}">
               <div :style="{background:`#fff url(${userImg}) 0% 0% / cover`}"></div>
               <p>助力您的{{brand}}事业！</p>
            </div>
            <div class="row">
               <label class="flex">
                  <i class="flex center rd rd-money" style="background:#FDC5B4"></i>
                  <div class="flexitemv">
                     <div class="flex"><span class="flex">¥{{list0.price}}</span>
                     <s class="flex endv">市场价：¥{{list0.market_price}}</s></div>
                     <div class="flex"><em class="flex">{{list0.attr}}使用期限</em></div>
                  </div>
                  <div class="flex center off" style="color: red">优惠{{discounts(list0.market_price,list0.price)}}%</div>
                  <input type="radio" :id="list0.id" name="payment" class="flex center" @click="listtype(list0.id)" checked="checked">
               </label>
               <label class="flex">
                  <i class="flex center rd rd-gold" style="background:#FB8E6C"></i>
                  <div class="flexitemv">
                     <div class="flex"><span class="flex">¥{{list1.price}}</span>
                     <s class="flex endv">市场价：¥{{list1.market_price}}</s></div>
                     <div class="flex"><em class="flex">{{list1.attr}}使用期限</em></div>
                  </div>
                  <div class="flex center off" style="color: red">优惠{{discounts(list1.market_price,list1.price)}}%</div>
                  <input type="radio" name="payment" class="flex center" @click="listtype(list1.id)" checked="checked">
               </label>
               <label class="flex">
                  <i class="flex center rd rd-diamond" style="background:#D83C0B"></i>
                  <div class="flexitemv">
                     <div class="flex"><span class="flex">¥{{list2.price}}</span>
                     <s class="flex endv">市场价：¥{{list2.market_price}}</s></div>
                     <div class="flex"><em class="flex">{{list2.attr}}使用期限</em></div>
                  </div>
                  <div class="flex center off" style="color: red">优惠{{discounts(list2.market_price,list2.price)}}%</div>
                  <input type="radio" name="payment" class="flex center" @click="listtype(list2.id)" checked="checked">
               </label>
               <label class="flex">
                  <i class="flex center rd rd-vip1" style="background:#a91717"></i>
                  <div class="flexitemv">
                     <div class="flex"><span class="flex">¥{{list3.price}}</span>
                        <s class="flex endv">市场价：¥{{list3.market_price}}</s></div>
                     <div class="flex"><em class="flex">{{list3.attr}}使用期限</em></div>
                  </div>
                  <div class="flex center off" style="color: red">优惠{{discounts(list3.market_price,list3.price)}}%</div>
                  <input type="radio" name="payment" class="flex center" @click="listtype(list3.id)" checked="checked">
               </label>
            </div>
            <div class="row">
               <label class="flex">
                  <i class="flex center rd rd-weixin" style="background:#0FC338;"></i>
                  <p class="flexitemv"><span class="flex normal">微信支付</span><em class="flex">使用微信完成支付</em></p>
                  <input type="radio" name="payment_type" class="flex center" @click="paytype(0)" checked="checked">
               </label>
               <label class="flex">
                  <i class="flex center rd rd-alipay" style="background:#098aff;"></i>
                  <p class="flexitemv"><span class="flex normal">支付宝</span><em class="flex">使用支付宝完成支付</em></p>
                  <input type="radio" name="payment_type" @click="paytype(1)" class="flex center">
               </label>
            </div>
            <!--<input type="hidden" name="user_id" value="145187">-->
         </form>
      </div>
      <a href="javascript:;" id="paynow" @click="sendForm" class="flex center">提交开通</a>
   </div>
</template>
<script>
   import axios from '../../assets/js/axios'
   import {Toast, Indicator, MessageBox } from 'mint-ui';

   export default{
      data(){
         return{
            vip_bj: 'http://tbs.wasd1.com/themes/ucenter/image/vip_bg.jpg',

            userImg:'',
            brand:'',

            list0:{},
            list1:{},
            list2:{},
            list3:{},

            payment_id:0,
            pay_type:0
         }
      },
      created(){
         this.$store.dispatch('partnerList').then(logo=>{
            this.brand = logo.name
         })
         this.$store.dispatch('userInfo').then(user => {
            this.userImg = user.upic;
         })
         this.$store.dispatch('paymentlist').then(list=>{
            list.forEach((val,index)=>{
               if(index == 0){
                  this.list0 = val
               } else if(index == 1){
                  this.list1 = val
               } else if(index == 2){
                  this.list2 = val
               } else {
                  this.list3 = val
                  this.payment_id = val.id;
               }
            })
         })
      },
      methods:{
         discounts(marketPrice,price){ //计算优惠率
            return parseInt((marketPrice - price)/marketPrice * 100)
         },
         listtype(id){ //会员类型
            this.payment_id = id
         },
         paytype(id){ //选中支付类型
            this.pay_type = id
         },
         sendForm(){  //去支付
            Indicator.open({
               text: '提交中',
               spinnerType: 'snake'
            });
            axios.post('pay/order',{payment_id:this.payment_id,pay_type:this.pay_type}).then(play=>{
               console.log(play);

               Indicator.close(); //结束动画
               Toast({
                  message: '提交成功',
                  iconClass: 'rd rd-selected',
                  duration: 800
               });
            }).catch(()=>{
               Indicator.close(); //结束动画
               Toast({ // 提示错误
                  message: '提交失败',
                  iconClass: 'rd rd-guanbi',
                  position: 'center',
                  className: 'error',
                  duration: 800
               })
            })
         },
         help(){  //帮助
            MessageBox({
               title: '支付遇到问题？',
               message: '客服微信：15924288062</br>免费热线：15924288062',
               showCancelButton: false,
            })
         }
      }
   }
</script>

<style>
   #paynow{height: 50px; color: #fff; font-size: 1.05em; background: #27e;}
   #vip .top{height: 150px; background: #fff; border-bottom: 1px solid #f5f5f5;}
   #vip .top div{width: 80px; height: 80px; border-radius: 50%;}
   #vip .top p{font-size: 1.05em; color: #fff; text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.76);}
   #vip .row{background: #fff; margin-top: 10px; border-top: 1px solid #f5f5f5;}
   #vip .row label{padding: 8px; border-bottom: 1px solid #f5f5f5;}
   #vip .row label i{width: 40px; height: 40px; border-radius: 2px; background: #f5f5f5; color: #fff; font-size: 1.6em;}
   #vip .row label span{padding: 0 10px; height: 24px; line-height: 24px; color: #f00; font-size: 1.2em;}
   #vip .row label s{font-size: 0.8em; color: #ccc; padding: 0 5px;}
   #vip .row label span.normal{font-size: 1em; color: #333;}
   #vip .row label em{padding: 0 10px; font-size: 0.8em; color: #888; height: 16px; line-height: 16px;}
   #vip .row label input{width: 24px; height: 24px; padding: 0; border: 1px solid #eee; border-radius: 50%; background: none; -webkit-appearance: none; margin-top: 5px;}
   #vip .row label input:after{content: '\e613'; font-family: 'rd' !important; font-size: 1.1em; color: #fff;}
   #vip .row label input:checked{background: #00E834; border-color: #00E834;}
   #vip .row .off{font-size: 0.8em; color: #666; padding: 0 5px;}

   .mint-msgbox-message{color:#333}
</style>
