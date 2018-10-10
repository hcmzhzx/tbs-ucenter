<template>
   <div id="record" class="flexv">
      <my-header :content="text" :router="router"></my-header>
      <div id="filter" class="flex">
         <a href="javascript:;" @click="tab(1)" :class="['flexitem','center',{current:member==1}]">已开通会员</a>
         <a href="javascript:;" @click="tab(0)" :class="['flexitem','center',{current:member==0}]">未开通会员</a>
      </div>
      <div id="main" class="flexitemv">
         <div id="pushlist">
            <ul class="lists" v-if="open.length>0 && member==1"
                v-infinite-scroll='loadMore'
                infinite-scroll-disabled='loading'
                infinite-scroll-immediate-check="false"
                infinite-scroll-distance='10'>
               <li class="flex" v-for="(item,index) in open">
                  <img :src="item.upic" class="flex">
                  <div class="flexitemv info">
                     <h3 class="flexitem"><span class="flexitem">{{item.name}}</span><em>&yen;{{item.order_price}}</em></h3>
                     <p class="flex endv"><span class="flexitem">注册/{{item.create_time}}</span><span>开通/{{item.up_time}}</span></p>
                  </div>
               </li>
            </ul>

            <ul class="lists" v-if="un_open.length>0 && member==0"
                v-infinite-scroll='loadMore'
                infinite-scroll-disabled='loading'
                infinite-scroll-immediate-check="false"
                infinite-scroll-distance='4'>
               <li class="flex" v-for="(item,index) in un_open">
                 <img :src="item.upic" class="flex">
                 <div class="flexitemv info">
                    <h3 class="flexitem"><span class="flexitem">{{item.name}}</span><em>未开通</em></h3>
                    <p class="flex endv"><span class="flexitem">注册/{{item.create_time}}</span></p>
                 </div>
              </li>
            </ul>

            <div id="more" class="flex center" v-if="isLoading"><i></i><span>正在加载..</span></div>
         </div>
      </div>
   </div>
</template>
<script>
   import myHeader from '../header/header.vue'

   export default{
      components:{
         myHeader
      },
      created(){
         //请求数据
         this.member = this.$route.query.member;
         this.type = this.$route.query.type;

         this.getType(this.member,this.type);

      },
      data(){
         return{
            text:'推广记录',
            router: 0,

            member:1,
            type:'',

            loading:false,
            isLoading:false
         }
      },
      methods:{
         tab(index){
            //this.$router.push({query:{member:index}})
            this.member = index
            this.getType(index);
         },
         getType(index){
            if(index == 1){  // 开通
               this.$store.dispatch('recordOpen',this.type)
            } else {  //未开通
               this.$store.dispatch('recordUn_open',this.type)
            }
         },
         loadMore(){  //加载更多
            if(this.isLoading) return
            this.loading = this.isLoading = true;
            let meta = {};
            if(this.member == 1){
               meta = this.$store.getters.getrecordOpen.meta
            } else {
               meta = this.$store.getters.getrecordUn_open.meta
            }
            if (meta.current_page == meta.total_pages) {
               this.loading = true;
               this.isLoading = false
               return false
            }
            setTimeout(()=>{
               this.$store.dispatch('recordPage', {URL: meta.links.next, member: this.member}).then(()=>{
                  this.loading = this.isLoading = false
               })
            },100)
         },
      },
      computed:{
         open(){
            return this.$store.getters.getrecordOpen.arr
         },
         un_open(){
            return this.$store.getters.getrecordUn_open.arr
         }
      }
   }
</script>

<style>
   #pushlist .lists li{padding: 8px; background: #fff; border-bottom: 1px solid #f5f5f5;}
   #pushlist .lists li img{width: 50px; height: 50px; border-radius: 50%;}
   #pushlist .lists li .info{padding: 0 10px;}
   #pushlist .lists li .info h3{font-weight: normal; font-size: 1em; padding: 2px 0;}
   #pushlist .lists li .info h3 span{color: #27e; word-break: break-all; overflow: hidden; text-overflow: ellipsis;  -webkit-line-clamp: 1; -webkit-box-orient: vertical; padding-right: 10px;}
   #pushlist .lists li .info h3 em{color: #f00;}
   #pushlist .lists li .info p span{font-size: 0.8em; color: #999;}

   #filter{height: 40px; border-bottom: 1px solid #eee; background: #fff;}
   #filter a{position: relative; font-size: 0.95em; color: #666;}
   #filter a:after{content: ''; position: absolute; bottom: -1px; left: 50%; width: 20px; margin-left: -10px; height: 3px; background: #27e; visibility: hidden;}
   #filter a.current{color: #27e;}
   #filter a.current:after{visibility: visible;}

   #pushlist .lists li{padding: 8px; background: #fff; border-bottom: 1px solid #f5f5f5;}
   #pushlist .lists li img{width: 50px; height: 50px; border-radius: 50%;}
   #pushlist .lists li .info{padding: 0 10px;}
   #pushlist .lists li .info h3{font-weight: normal; font-size: 1em; padding: 2px 0;}
   #pushlist .lists li .info h3 span{color: #27e; word-break: break-all; overflow: hidden; text-overflow: ellipsis;  -webkit-line-clamp: 1; -webkit-box-orient: vertical; padding-right: 10px;}
   #pushlist .lists li .info h3 em{color: #f00;}
   #pushlist .lists li .info p span{font-size: 0.8em; color: #999;}
</style>
