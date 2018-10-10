<template>
   <div id="signature">
         <my-header :content="text" :router="router"></my-header>
      <div id="main" class="flexitemv">
         <form action="" class="flexv" onsubmit="return false"  @submit.prevent="sendForm">
            <textarea name="signature" v-model="content" placeholder="请填写您的个性签名（100字）" class="flexitem"></textarea>
            <!--<input type="submit" value="保存签名" class="flexitem submit">-->
            <button type="submit" class="flexitem submit">保存签名</button>
         </form>
      </div>
   </div>
</template>
<script>
   import {Toast, Indicator} from 'mint-ui'
   import myHeader from '../header/header.vue'
   //import {CheckForm} from '../../assets/js/checkForm'
   import axios from '../../assets/js/axios'

   export default{
      components:{
         myHeader
      },
      created(){
         this.$store.dispatch('userInfo').then(user=>{
             this.content = user.signature
         })
      },
      data(){
         return{
            text:'修改签名',
            router:'info',

            content:''
         }
      },
      methods:{
         sendForm(e){
            Indicator.open({ //动画
               text: '修改中',
               spinnerType: 'snake'
            });
            axios.patch('user/signature',{signature:this.content}).then(()=>{
               Indicator.close(); //结束动画
               Toast({
                  message: '修改成功',
                  iconClass: 'rd rd-selected',
                  duration:800
               });
               setTimeout(()=>{
                  this.$router.push({name:'info'})
               },900)
            })
         }
      }
   }
</script>

<style>
   #signature .flexv{padding: 10px;}
   #signature .flexv textarea{padding: 10px; font-size: 0.95em; line-height: 20px; height: 140px; background: #fff; border-radius: 2px; resize: none; border: none;}
   #signature .flexv .submit{margin-top: 20px; font-size: 1.05em; color: #fff; border: none; background: #66DC52; border-radius: 2px; height: 50px;}
</style>
