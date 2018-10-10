<template>
   <div class="flexv">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.go(-1)" class="rd rd-houtui flex centerv side icon"></a>
         <div class="flexitem center title">提现记录</div>
         <a href="javascript:;" @click="$router.push({name:'cash'})" class="flex center side save">提现</a>
      </div>

      <div id="main" class="flexitemv">
         <div id="cashlog"
              v-infinite-scroll='loadMore'
              infinite-scroll-disabled='loading'
              infinite-scroll-immediate-check="false"
              infinite-scroll-distance='5'>
            <div class="flexv lists" v-for="(item,index) in logList" v-if="logList.length>0">
               <h2 class="flex centerv"><span class="flexitem">{{item.bank}} ({{account(item.bank_number)}})</span><em>&yen;{{item.money}}</em></h2>
               <p class="flex endv"><span class="flexitem">{{item.create_time}}</span><span>{{item.status}}</span></p>
            </div>

            <div id="more" class="flex center" v-if="loading"><i></i><span>正在加载..</span></div>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      created(){
         this.$store.dispatch('cashlogList')
      },
      data(){
         return{
            loading:false
         }
      },
      methods:{
         account(num){  //截取账号最后4位
            return num.substring(num.length-4)
         },
         loadMore(){  //加载更多
            this.loading = true;
            let meta = this.$store.getters.getCashList.meta;
            if (meta.current_page == meta.total_pages) {
               this.loading = false;
               return false
            }
            setTimeout(()=>{
               this.$store.dispatch('cashlogPage', meta.links.next).then(()=>{
                  this.loading = false;
               })
            },100)
         }
      },
      computed:{
         logList(){
            return this.$store.getters.getCashList.arr;
         }
      }
   }
</script>

<style>
   #cashlog .lists{padding: 10px; border-bottom: 1px solid #f5f5f5; background: #fff;}
   #cashlog .lists h2{font-weight: normal; font-size: 1.1em;}
   #cashlog .lists h2 em{color: #f00;}
   #cashlog .lists p span{font-size: 0.8em; color: #888;}
</style>
