<template>
   <div class="flexv">
      <my-header :content="text" :router="router"></my-header>

      <div id="main" class="flexitemv">
         <div id="skin">
            <div class="flexv center title">
               <h3>{{title}}</h3>
               <p>{{desc}}</p>
            </div>
            <swiper class="roll" :options="swiperOption" ref="mySwiper">
               <!-- slides -->
               <swiper-slide class="center" v-for="(item,index) in themeList" :key="index">
                  <img :src="item" class="flex fitimg">
               </swiper-slide>
            </swiper>
            <div class="flex center swiper-pagination"></div>
         </div>
      </div>

      <div id="choise" class="flex center">
         <a href="javascript:;" @click="setTheme" :class="['flexitem','center','btn',{disabled:theme==directory}]">当前已经使用</a>
      </div>
   </div>
</template>

<script>
   import myHeader from '../header/header.vue'
   import axios from'../../assets/js/axios'
   import {Toast, Indicator} from 'mint-ui'
   import {swiper, swiperSlide} from 'vue-awesome-swiper'

   export default {
      components: {
         myHeader,
         swiper,
         swiperSlide
      },
      created(){
         //获取当前使用主题
         this.$store.dispatch('userInfo').then(uers=>{
            this.theme = uers.theme;
         })
         //获取主题详情
         axios.get(`theme/${this.$route.query.id}`).then(res=>{
            this.title = res.title;
            this.desc = res.desc;
            this.themeList = res.cover;
            this.directory = res.directory
            //console.log(res);
         })
      },
      data(){
         return {
            text: '更换主题',
            router: '',

            theme:'', //当前使用的主题
            directory:'',//当前的主题

            title:'',
            desc:'',
            themeList:[],

            swiperOption: {  //轮播参数
               pagination: '.swiper-pagination',
               slidesPerView: 'auto',
               paginationClickable: true
            }
         }
      },
      methods:{
         setTheme(){
            if(this.theme == this.directory) return false;
            Indicator.open({
               text: '设置中',
               spinnerType: 'snake'
            });
            //console.log(this.theme, this.directory);
            axios.patch('theme/user_set',{theme:this.directory}).then(()=>{
               Indicator.close(); //结束动画
               Toast({
                  message: '设置成功',
                  iconClass: 'rd rd-selected',
                  duration: 800
               })
               this.theme = this.directory;
            })
         }
      }
   }
</script>

<style>
   #skin .swiper-wrapper{display:-webkit-box;}
</style>
