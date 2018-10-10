<template>
   <div id="account">
      <my-header :content="text" :router="router"></my-header>
      <div id="main">
         <form id="cardinfo" class="common" v-if="hide" ref="cardinfo" @submit.prevent="sendForm1">
            <div class="block stepone">
               <div class="tips">请绑定持卡本人的银行卡</div>
               <div class="flex centerv row">
                  <span class="flex title">开户姓名</span>
                  <div class="flexitem input">
                     <input type="text" name="name" v-model="form.name" data-rule="cname" data-errmsg="姓名格式错误" placeholder="请输入开户姓名" class="flexitem text" disabled="disabled">
                  </div>
               </div>
               <div class="flex centerv row">
                  <span class="flex title">开户银行</span>
                  <div class="flexitem input">
                     <select name="bank_type"  v-model="form.bank_type" class="flexitem text" disabled="disabled" data-rule="*" data-errmsg="请选择开户银行">
                        <option value="-1">请选择开户银行</option>
                        <option value="0" selected="">支付宝</option>
                     </select>
                  </div>
               </div>
               <div class="flex centerv row">
                  <span class="flex title">银行卡号</span>
                  <div class="flexitem input">
                     <input type="text" name="bank_sn" v-model="form.bank_sn" data-rule="*" data-errmsg="请填写正确银行卡号" placeholder="请填写银行卡号" class="flexitem text" disabled="disabled">
                  </div>
               </div>
               <div class="flex sub">
                  <button type="submit" ref="change" :class="['flexitem','center','nextstep',{disable:contact}]">{{val}}</button>
               </div>
            </div>
         </form>
         <form action="" class="common" v-if="!hide" @submit.prevent="sendForm2">
            <div class="block steptwo">
               <div class="tips">系统已给本账号用户手机发送了短信验证，请输入验证码之后提交。</div>
               <div class="flex centerv row">
                  <span class="flex title">验证码</span>
                  <div class="flexitem input">
                     <input type="tel" name="code" v-model="form.verification_code" maxlength="6" data-rule="code" data-errmsg="请填写正确验证码" placeholder="短信验证码" class="flexitem text">
                     <span :class="['flex','center','getcode',{disable:contact}]" @click="getcode">{{code}}</span>
                  </div>
               </div>
               <div class="flex sub"><button type="submit" class="flexitem center submit">提交</button></div>
            </div>
         </form>
      </div>
   </div>
</template>
<script>
   import {Toast, Indicator} from 'mint-ui'
   import myHeader from '../header/header.vue'
   import smsTimer,{CheckForm} from '../../assets/js/checkForm'
   import axios from'../../assets/js/axios'

   export default{
      components:{
         myHeader
      },
      created(){
         this.$store.dispatch('userInfo').then(users => {
            this.phone = users.phone;

            //查看微信
            axios.get('user/bank').then(bank=>{
               this.form.name = bank.name;
               this.form.bank_type = bank.bank_type;
               this.form.bank_sn = bank.bank_sn;
            })

         })
      },
      data(){
         return{
            text:'银行卡绑定',
            router:'info',

            hide:true,
            val:'修改',
            form:{
               name:'',
               bank_type:0,
               bank_sn:'',
               verification_key:'',
               verification_code:''
            },
            phone:0,

            code:'获取验证码',
            contact:false

         }
      },
      methods:{
         getcode(){  //获取短信验证码
            if (this.contact) return false;
            this.contact = true;
            this.code = "验证码发送中";
            smsTimer(this,'重新获取',60);
         },
         sendForm1(e){
            if(this.val == '下一步'){
               new CheckForm(e,err=>{
                  Toast({ // 提示错误
                     message: err,
                     iconClass: 'rd rd-guanbi',
                     position: 'center',
                     className: 'error',
                     duration:800
                  })
               },()=>{
                  if(!this.hide) return;
                  this.val = '验证码发送中';
                  this.contact = true;
                  axios.post('verification/bank',{phone:this.phone}).then(res=>{
                     this.form.verification_key = res.key;
                     this.contact = false
                     this.hide = false;
                     this.getcode()
                  })
               })
            }
            if(this.val === '下一步') return
            this.val = '下一步';
            let serarry = this.$refs.cardinfo.elements;
            [...serarry].forEach((val)=>{
               val.removeAttribute('disabled');
            });
            serarry[0].select();
         },
         sendForm2(e){
            new CheckForm(e,err=>{
               Toast({ // 提示错误
                  message: err,
                  iconClass: 'rd rd-guanbi',
                  position: 'center',
                  className: 'error',
                  duration:800
               })
            },()=>{
               Indicator.open({  //动画
                  text: '请稍等',
                  spinnerType: 'snake'
               });
               console.log(this.form);
               Indicator.close(); //结束动画
               axios.post('user/bank',this.form).then(res=>{
                  console.log(res);
                  Toast({
                     message: '设置成功',
                     iconClass: 'rd rd-selected',
                     duration:800
                  });
                  setTimeout(()=>{this.$router.push({name:'user'})},900)
               }).catch(err=>{
                  console.log(err);
               })
            })
         }
      }
   }
</script>

<style>
   #account .common .tips{padding: 10px; font-size: 0.8em; color: #999; border-bottom: 1px solid #f5f5f5;}
   #account .common .row{border-bottom: 1px solid #f5f5f5; background: #fff;}
   #account .common .row .title{width: 70px; padding: 0 2px 0 10px;}
   #account .common .row .input{padding: 10px;}
   #account .common .row .input input.text{border: none; background: none; height: 20px; padding: 6px 5px;}
   #account .common .row .input select.text{border: none; height: 32px; background: none; padding: 0 5px; color: #666;}
   #account .common .row span.getcode{font-size: 0.95em; color: #27e;}
   #account .common .row span.disable{color: #999;}
   #account .common .sub{padding: 20px 10px;}
   #account .common .sub button{font-size: 1.05em; color: #fff; border: none; height: 48px; border-radius: 2px; background: #f40;}
   #account .common .sub button.disable{background: #ccc;}
   /********************/
   #account .common .context{position: relative; margin: 10px 10px 0; background: #eee; padding: 5px; border-radius: 2px;}
   #account .common .context .cover{position: relative; width: 54px; height: 54px; margin-right: 5px; background: #fff; overflow: hidden;}
   #account .common .context .cover img{position: absolute; top: 0; left: 0;}
   #account .common .context .text{-webkit-line-clamp: 3; overflow: hidden; text-overflow: ellipsis; line-height: 18px; font-size: 0.8em;}
   #account .common .context .url{position: absolute; top: 0; left: 0; width: 100%; height: 100%;}
   #account .common .notice{padding-top: 10px; margin: 0 10px; font-size: 0.8em; color: #888;}
   #account .common .block{margin-top: 10px; background: #fff; border-top: 1px solid #f2f2f2; border-bottom: 1px solid #f2f2f2;}
   #account .common .block.notop{margin-top: 0;}
   #account .common .block .row{margin-left: 10px; border-bottom: 1px solid #f2f2f2; min-height: 40px; padding: 5px;}
   #account .common .block .row:last-child{border-bottom: none;}
   #account .common .block .row .title{width: 80px;}
   #account .common .block .row .input{border: none; background: none; resize: none; font-size: 1em;}
   #account .common .block .row .select select{color: #666; width: 0%;}
   #account .common .block .row .getcode{font-size: 0.95em; color: #28a7e1;}
   #account .common .block .row .disable{color: #888;}
   #account .common .block .row .codeimg{width: 80px; height: 40px;}
   #account .common .block .row .text{font-size: 0.9em;}
   #account .common .submit{width: 200px; height: 46px; border-radius: 50px; background: #28a7e1; color: #fff; margin: 20px auto 10px;}
</style>
