<template>
   <div id="forget">
      <form action="" method="post" class="form" onsubmit="return false;" @submit.prevent="sendForm">
         <div class="flex centerv row">
            <i class="flex center rd rd-account"></i>
            <input type="tel" name="phone" placeholder="帐号/注册时填写的手机号码" maxlength="11" class="flexitem text" v-model="form.phone" data-rule="m" data-errmsg="手机号码格式错误">
         </div>
         <div class="flex centerv row">
            <i class="flex center rd rd-account"></i>
            <input type="tel" name="code" placeholder="短信验证码" class="flexitem text" v-model="form.code" data-rule="code" data-errmsg="短信验证码错误">
            <a href="javascript:;" @click="getcode" :class="['flex','center','getcode',{disable:contact}]">{{code}}</a>
         </div>
         <div class="flex centerv row">
            <i class="flex center rd rd-password"></i>
            <input type="password" name="pwd1" placeholder="请输入新密码" class="flexitem text" v-model="form.pwd1" data-rule="pwd" data-errmsg="请输入新密码">
         </div>
         <div class="flex centerv row">
            <i class="flex center rd rd-password"></i>
            <input type="password" name="pwd2" placeholder="请再次输入新密码" class="flexitem text" v-model="form.pwd2" data-rule="pwd" data-errmsg="两次密码不一致">
         </div>
         <div class="flexv center row sub">
            <button type="submit" class="flex submit">立即重置</button>
            <a href="javascript:;" @click="$router.go(-1)" class="flex back">返回上一页</a>
         </div>
      </form>
   </div>
</template>
<script>
   import {Toast, Indicator} from 'mint-ui'
   import axios from '../../assets/js/axios'
   import smsTimer, {CheckForm} from '../../assets/js/checkForm'

   export default{
      name: 'forget',
      data(){
         return {
            code: '获取验证码',
            contact: false,
            form: {
               phone: '',
               code: '',
               pwd1: '',
               pwd2: ''
            },

            key:''
         }
      },
      methods: {
         sendForm(e){
            new CheckForm(e, err => {
               Toast({ // 提示错误
                  message: err,
                  iconClass: 'rd rd-guanbi',
                  position: 'center',
                  className: 'error',
                  duration: 800
               })
            }, posts => {
               //判断2次密码是否一致
               if(this.form.pwd1 !== this.form.pwd2){
                  Toast({ // 提示错误
                     message: '两次密码不一致',
                     iconClass: 'rd rd-guanbi',
                     position: 'center',
                     className: 'error',
                     duration: 800
                  });
                  return
               }
               if(!this.key){
                  Toast({ // 提示错误
                     message: '验证码错误',
                     iconClass: 'rd rd-guanbi',
                     position: 'center',
                     className: 'error',
                     duration: 800
                  });
                  return
               }
               Indicator.open({   //重置动画
                  text: '密码重置中',
                  spinnerType: 'snake'
               });
               //数据请求
               axios.patch('users/password',{verification_key:this.key, verification_code:this.form.code, password:this.form.pwd2}).then(ret=>{
                  console.log(ret);
                  Indicator.close(); //结束动画
                  Toast({
                     message: '密码重置成功',
                     iconClass: 'rd rd-selected',
                     duration: 800
                  });
                  setTimeout(()=>{this.$router.push({name: 'login'})},900)
               }).catch(err=>{
                  console.log(err);
                  Indicator.close(); //结束动画
                  Toast({ // 提示错误
                     message: err.data.message,
                     iconClass: 'rd rd-guanbi',
                     position: 'center',
                     className: 'error',
                     duration: 800
                  });
                  return
               })
            })
         },
         getcode(){ //获取验证码
            if(!/^1[3456789]\d{9}$/.test(this.form.phone)){
               Toast({ // 提示错误
                  message: '手机号码格式错误',
                  iconClass: 'rd rd-guanbi',
                  position: 'center',
                  className: 'error',
                  duration: 800
               });
               return
            }
            if (this.contact) return false;
            this.contact = true;
            this.code = "验证码发送中";
            //验证码请求
            this.$http.post('verification/password',{phone:this.form.phone, type:'password'}).then(res=>{
               this.key = res.data.key;
               smsTimer(this, '重新获取', 60);
            }).catch(rej=>rej);
         }
      }
   }
</script>
