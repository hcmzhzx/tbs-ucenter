<template>
   <div class='flexv'>
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.go(-1)" class="rd rd-houtui flex centerv side icon"></a>
         <div class="flexitem center title">申请提现</div>
         <a href="javascript:;" @click="$router.push({name:'cashlog'})" class="flex center side save">记录</a>
      </div>

      <div id="main" class="flexitemv">
         <form id="cash" @submit.prevent="sendForm">
            <div class="box">
               <div class="flex card">
                  <span class="flex title">到账银行卡</span>
                  <a href="javascript:;" @click="$router.push({name:'account'})" class="flexitemv info">
                     <span class="flex">支付宝({{account(bank.bank_sn)}})</span>
                     <em class="flex">提现到支付宝</em>
                  </a>
               </div>
               <div class="flexv amount">
                  <span class="flex title">提现金额</span>
                  <div class="flex centerv input">
                     <span class="flex">¥</span>
                     <input type="number" ref="money" name="fee" class="flexitem">
                  </div>
                  <div class="flex tips"><span>当前可提现余额¥{{balance}}</span></div>
               </div>
               <div class="submit">
                  <button type="submit" class="flex center post">提交申请</button>
               </div>
            </div>
         </form>
      </div>
   </div>
</template>

<script>
   import {Toast} from 'mint-ui'
   import axios from '../../assets/js/axios'

   export default {
      created(){
         axios.get('user/bank').then(bank => {  //查看账户
            console.log(bank);
            this.bank = bank
         })
         axios.get('extension/balance').then(balance => {  //查看余额
            this.balance = balance.balance
         })
      },
      data(){
         return {
            bank: {
               'bank_sn': '0'
            },
            balance: 0
         }
      },
      methods: {
         account(num){  //截取账号最后4位
            return num.substring(num.length - 4)
         },
         sendForm(){
            if (this.$refs.money.value < 100) {
               Toast({ // 提示错误
                  message: '抱歉,提现金额不得少于100元',
                  iconClass: 'rd rd-guanbi',
                  position: 'center',
                  className: 'error',
                  duration: 900
               })
            } else if (this.balance < this.$refs.money.value) {
               Toast({ // 提示错误
                  message: `抱歉,您最多只能体现${this.balance}元`,
                  iconClass: 'rd rd-guanbi',
                  position: 'center',
                  className: 'error',
                  duration: 900
               })
            }


         }
      }
   }
</script>

<style>
   #cash .box{margin:10px;border-radius:2px;background:#fff}
   #cash .card{padding:10px;background:#fdfdfd}
   #cash .card .title{width:90px}
   #cash .card .info span{padding-bottom:5px;color:#27e}
   #cash .card .info em{color:#888;font-size:.8em}
   #cash .amount{padding:10px}
   #cash .amount .input{padding:10px 0}
   #cash .amount .input span{padding-right:8px;font-size:1.2em}
   #cash .amount .input input{border:none;font-size:1.6em}
   #cash .amount .tips{padding-top:10px;border-top:1px solid #eee;color:#999;font-size:.8em}
   #cash .submit{padding:20px 10px}
   #cash .submit .post{width:100%;height:50px;border-radius:2px;background:#26DA26;color:#fff}

</style>
