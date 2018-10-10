<template>
   <div class="login">
      <form class="form" @submit.prevent="sendForm">
         <div class="flex centerv row">
            <i class="flex center rd rd-account"></i>
            <input type="tel" name="phone" v-model="form.phone" data-rule="m" data-errmsg="手机号码格式错误" placeholder="账号/手机号码" class="flexitem text" maxlength="11">
         </div>
         <div class="flex centerv row">
            <i class="flex center rd rd-password"></i>
            <input type="password" name="pwd" v-model="form.password" data-rule="pwd" data-errmsg="账号或密码错误" placeholder="请输入登录密码" class="flexitem text">
            <a href="javascript:;" @click="$router.push({name:'forget'})" class="flex center forget">忘记密码？</a>
         </div>
         <div class="flexv center row sub">
            <button type="submit" class="flex submit">立即登录</button>
            <a href="javascrpt:;" @click="$router.go(-1)" class="flex back">返回上一页</a>
         </div>
      </form>
   </div>
</template>
<script>
   import {Toast, Indicator} from 'mint-ui'
   import {CheckForm} from '../../assets/js/checkForm'

   export default{
      data(){
         return {
            form: {
               phone: '18307209731',
               password: 'tbs123456'
//               phone: '15061979558',
//               password: '123456'
            }
         }
      },
      methods: {
         sendForm(e) {
            new CheckForm(e, err => {
               Toast({ // 提示错误
                  message: err,
                  iconClass: 'rd rd-guanbi',
                  position: 'center',
                  className: 'error',
                  duration: 800
               })
            }, posts => {
               Indicator.open({
                  text: '登录中',
                  spinnerType: 'snake'
               });
               this.$http.post("login", this.form).then(res => {
                  const token = res.data.meta;
                  localStorage.setItem('access_token', `Bearer ${token.access_token}`)
                  Indicator.close(); //结束动画
                  Toast({
                     message: '登录成功',
                     iconClass: 'rd rd-selected',
                     duration: 800
                  });
                  this.$router.push({name: 'user'})
               }).catch(err => {
                  Indicator.close(); //结束动画
                  Toast({ // 提示错误
                     message: err.response.data.message,
                     iconClass: 'rd rd-guanbi',
                     position: 'center',
                     className: 'error',
                     duration: 800
                  })
               })
            })
         }
      }
   }
</script>

