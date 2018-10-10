<template>
   <div class="flexv">
      <my-header :content="text" :router="router"></my-header>
      <div id="tabs" class="flex">
         <a href="javascript:;" @click="tab('all')" :class="['flexitem','center',{current:state =='all'}]">全部留言</a>
         <a href="javascript:;" @click="tab('read')" :class="['flexitem','center',{current:state =='read'}] ">已读留言</a>
         <a href="javascript:;" @click="tab('unread')" :class="['flexitem','center',{current:state =='unread'}] ">未读留言</a>
      </div>

      <div id="main" class="flexitemv">
         <div id="leavemsg"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            :infinite-scroll-immediate-check="true"
            infinite-scroll-distance="10">
            <div class="flexv lists" v-if="msgdata.length>0" v-for="(item,index) in msgdata" :key="index">
               <div class="flex top">
                  <img src="http://tbs.wasd1.com/static/image/unknown.svg" class="flex head" />
                  <div class="flexitemv info">
                     <div class="flex centerv">
                        <span class="flexitem">{{item.name}}</span>
                        <em class="flex">{{item.create_time}}</em>
                     </div>
                     <div class="flex centerv">
                        <span class="flexitem">{{item.phone}}</span>
                        <em class="flex"></em>
                     </div>
                  </div>
               </div>
               <a href="javascript:;" @click="$router.push({name:'details',query:{id:item.id, state:state}})" class="flex center contact">点击查看留言详情</a>
            </div>
         </div>

         <div id="more" class="flex center" v-if="isLoading"><i></i><span>正在加载..</span></div>
         <div id="more" class="flex center" v-if="noMore"><span>已经加载完所有数据</span></div>

      </div>
   </div>
</template>

<script>
   import myHeader from '../header/header.vue'
   import axios from '../../assets/js/axios'

   export default {
      components:{
         myHeader
      },
      created(){
         let state = this.$route.query.state;
         this.state = state || 'all';
         //初次加载
         if(state == 'read'){
            this.$store.dispatch('readMgsData', this.state)
         } else if (state == 'unread'){
            this.$store.dispatch('unreadMgsData', this.state)
         } else {
            this.$store.dispatch('allmsgData', this.state)
         }
      },
      computed:{
         msgdata(){
            if(this.state == 'read'){
               this.meta = this.$store.getters.getReadMgs.meta;
               return this.$store.getters.getReadMgs.arr
            } else if (this.state == 'unread'){
               this.meta = this.$store.getters.getUnreadMgs.meta;
               return this.$store.getters.getUnreadMgs.arr
            } else {
               this.meta = this.$store.getters.getAllMsg.meta;
               return this.$store.getters.getAllMsg.arr
            }
         }
      },
      data(){
         return{
            text:'留言管理',
            router:'user',

            state:'all',

            loading:false,
            isLoading:false,
            noMore:false,

            meta:{},
            current:0
         }
      },
      methods:{
         tab(state){
             //点击切换
            if(state == 'read'){
               this.state = state
               this.$router.push({query:{state:state}})
               this.$store.dispatch('readMgsData', state)
            } else if (state == 'unread'){
               this.state = state
               this.$router.push({query:{state:state}})
               this.$store.dispatch('unreadMgsData', state)
            } else {
               this.state = state
               this.$router.push({query:{}})
               this.$store.dispatch('allmsgData', state)
            }
         },
         loadMore(){  // 加载更多
            this.loading = true
            this.isLoading = true
            if (this.meta.current_page == this.meta.total_pages) { //超过分页
               this.isLoading = false
               this.noMore = true
               return false;
            }
            setTimeout(()=>{
               this.$store.dispatch('msgPage', {URL: this.meta.links.next, type: this.state});
               this.loading = false
            },100)
         }
      }
   }
</script>

<style>
   #tabs{height: 40px; background: #fff; border-bottom: 1px solid #eee;}
   #tabs a{position: relative; font-size: 0.95em; width: 0%;}
   #tabs a:after{content: ''; position: absolute; left: 35%; right: 35%; bottom: 0; height: 3px; background: #c33; visibility: hidden;}
   #tabs a.current{color: #c33;}
   #tabs a.current:after{visibility: visible;}

   #leavemsg .lists{padding: 10px; background: #fff; margin-bottom: 10px;}
   #leavemsg .lists .top{padding: 5px 0;}
   #leavemsg .lists .top .head{width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;}
   #leavemsg .lists .top .info span{font-size: 1.05em; color: #404040;}
   #leavemsg .lists .top .info em{font-size: 0.9em; color: #999;}
   #leavemsg .lists .contact{width: 200px; height: 40px; border-radius: 40px; margin: 0 auto; color: #fdebea; background: -webkit-linear-gradient(#f95e48, #f7403c);}
</style>
