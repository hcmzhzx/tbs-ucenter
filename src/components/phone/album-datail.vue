<template>
   <div class="flexv">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.go(-1)" class="rd rd-houtui flex centerv side icon"></a>
         <div class="flexitem center title">相册详情</div>
         <a href="javascript:;" class="flex center side delete" @click="del">删除</a>
      </div>

      <div id="main" class="flexitemv">
         <div id="album" v-if="photoList.length>0">
            <ul class="clearfix photolist"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                :infinite-scroll-immediate-check="true"
                infinite-scroll-distance="10">
               <li v-for="(item,index) in photoList" :key="index">
                  <a href="javascript:;" @click="swipe(index)"><img :src="item.path" :alt="item.title" class="fitimg"></a>
                  <label class="flex"><input type="text" :value="item.title" class="flexitem changeTitle"></label>
               </li>
            </ul>
         </div>

         <div id="none" class="flexitemv center" v-else><div class="icon"></div><p>该相册暂未上传照片~</p></div>
      </div>

      <div id="tools" class="flex">
         <a href="javascript:;" @click="$router.push({name:'album-upload', query:{id:id}})" class="flexitem center">上传照片</a>
      </div>

      <!--照片详情-->
      <div id="swiper" v-if="contact">
         <div class="flex top">
            <span class="flex center side" @click="contact=false">关闭</span>
            <span class="flexitem center title">{{activeIndex}}/{{photoList.length}}</span>
            <a href="javascript:;" class="flex center side rd rd-menu" @click="administer=true"></a>
         </div>
         <swiper class="wrap" :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide class="center" v-for="(item,index) in photoList" :key="index">
               <img :src="item.path" :alt="item.title">
            </swiper-slide>
         </swiper>
         <div class="text">{{photoList[activeIndex-1].title}}</div>
      </div>
      <!--封面/删除-->
      <mt-actionsheet
         :actions="action"
         v-model="administer">
      </mt-actionsheet>
   </div>
</template>

<script>
   import {MessageBox} from 'mint-ui'
   import axios from '../../assets/js/axios'
   import { swiper, swiperSlide } from 'vue-awesome-swiper'

   export default {
      components: {
         swiper,
         swiperSlide
      },
      created(){
         this.id = this.$route.query.id;
         axios.get(`album/${this.id}/photo/`).then(photo=>{
            this.photoList = [...photo.data]
            this.meta = photo.meta
            console.log(photo)
         })
      },
      data(){
         return{
            id:0,  //相册id
            photoList:[],
            meta:{},

            contact:false,
            activeIndex:1, //当前图片下标

            loading:false,
            isLoading:false,
            noMore:false,

            swiperOption: {  //轮播参数
               notNextTick: true,
               initialSlide:this.activeIndex,
               onSlideChangeStart:(swiper)=>{
                  this.activeIndex = swiper.activeIndex + 1;
               }
            },

            action: [
               {name: '删除照片', method: this.delPhoto},
               {name: '设为封面', method: this.cover}
            ],
            administer:false
         }
      },
      computed: {
         swiper() {
            return this.$refs.mySwiper.swiper
         }
      },
      methods:{
         loadMore(){  //加载更多

         },
         del(){  //删除相册
            MessageBox.confirm('您确定要删除该相册？','').then(()=> {
               axios.delete(`album/${this.id}`).then(()=>{
                  this.$store.commit('albumDel',this.id);
               })
            }).catch(()=>{});
         },
         swipe(index){  //显示相册照片
            this.activeIndex = index+1;
            this.contact = true;

            //this.swiper.slideTo(index, 0, false);
         },
         delPhoto(){ //删除照片
            let ID = this.photoList[this.activeIndex].id;
            axios.delete(`album/photo/${ID}`).then(()=>{
               this.photoList.splice(this.activeIndex-1,0)
            })
         },
         cover(){  //设置封面
            console.log(`设置封面${this.activeIndex}`);
            let ID = this.photoList[this.activeIndex-1].id;
            axios.get(`album/photo/${ID}/set_cover`)
         }
      }
   }
</script>

<style>
   #swiper{position:fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; z-index:99;}
   #swiper .top{position: fixed; top: 0; left: 0; right: 0; height: 52px; background: rgba(0,0,0,0.5); z-index: 10;}
   #swiper .top .title{color: #fff;}
   #swiper .top .side{width: 60px; color: #fff;}
   #swiper .top a.side{font-size: 1.4em;}

   #swiper .swiper-wrapper,#swiper .swiper-slide{display: -webkit-box;height:100%;}
   #swiper .swiper-slide img{max-width: 100%; max-height: 100%;}
   #swiper .text{position: fixed; left: 0; bottom: 0; right: 0; padding: 10px; background: rgba(0,0,0,0.5); color: #fff; height: 20px; line-height: 20px;}

</style>
