<template>
   <div id="detail" class="flexv">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.go(-1)" class="rd rd-houtui flex centerv side icon"></a>
         <div class="flexitem center title">商品详情</div>
         <a href="javascript:;" @click="show=true" class="flex center rd rd-fenxiang side icon shareit"></a>
      </div>

      <div id="main" class="flexitemv">
         <div id="goods">
            <div class="cover">
               <div class="img"><img :src="detail.cover" :alt="detail.title"></div>
            </div>
            <div class="info">
               <h1>{{detail.title}}</h1>
               <p><span>规格：{{detail.specification}}</span></p>
               <p><i>¥{{detail.price}}</i></p>
            </div>
            <div class="flex center titles"><span>详情介绍</span></div>
            <div class="detail" v-html="detail.content"></div>
         </div>
      </div>

      <div id="tabbar" class="flex">
         <a href="javascript:;" class="flexitem center">工作室</a>
         <a href="javascript:;" @click.stop="$router.push({name:'goods'})" class="flexitem center">产品展示</a>
         <a href="javascript:;" class="flexitem center">每日分享</a>
      </div>

      <div id="notice" v-show="show" @click="show=false"></div>
   </div>
</template>

<script>
   export default {
      //加载前请求
      created(){
         let Id = this.$route.params.id, type = this.$route.hash;
         let stateArr = [];
         //console.log(type);
         if(type == 'all'){
             stateArr = [...this.$store.getters.getgoodsAll];
         } else if(type == 'hot'){
            stateArr = [...this.$store.getters.getgoodsHot];
         } else if(type == 'recommend'){
            stateArr = [...this.$store.getters.getgoodsRecommend];
         } else if(type == 'cancel'){
            stateArr = [...this.$store.getters.getgoodsCancel];
         }
         //console.log(stateArr);
         //去商品列表里查找有无对应的商品(返回找到的)
         let newArr = stateArr.filter((val)=>{
            return val.id == Id
         });
         //console.log(newArr);
         //如果没找到就去重新请求
         if(newArr.length>0){
            this.detail = {...newArr}[0];
         }else{
            this.$http.get(`product/${Id}`).then(ret=>{
               this.detail = ret.data
            })
         }
      },
      data(){
         return{
            detail:{},
            types:'',
            show:false
         }
      },
      methods:{

      }
   }
</script>

<style>
   #detail #goods .cover{position: relative; max-width: 480px; margin: 0 auto; padding-top: 100%;}
   #detail #goods .cover .img{position: absolute; top: 0; left: 0; width: 100%; height: 100%;}
   #detail #goods .cover .img img{width: 100%; height: 100%;}
   #detail #goods .info{padding: 10px; background: #fff; border-bottom: 1px solid #eee;}
   #detail #goods .info h1{font-size: 1.1em; font-weight: normal; border-bottom: 1px solid #f5f5f5; padding-bottom: 10px;}
   #detail #goods .info p{padding-top: 10px;}
   #detail #goods .info p span{font-size: 0.9em; color: #999; margin-right: 10px;}
   #detail #goods .info p i{font-size: 1.2em; color: #f00;}
   #detail #goods .titles{position: relative; height: 40px; padding: 10px;}
   #detail #goods .titles:after{content: ''; position: absolute; top: 28px; left: 10px; right: 10px; height: 2px; background: #eee;}
   #detail #goods .titles span{position: relative; padding: 0 10px; background: #fafafa; z-index: 2; font-size: 1.1em;}
   #detail #goods .detail{padding: 10px; background: #fff; border-top: 1px solid #f5f5f5;}
   #detail #goods .detail img{max-width: 100%;}
   #detail #goods .detail p{line-height: 1.45em; padding-bottom: 10px; color: #333;}
</style>
