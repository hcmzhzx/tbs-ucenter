<template>
   <div id="manage" class="flexv">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.push({name:'user'})" class="rd rd-houtui flex centerv side icon"></a>
         <div class="flexitem center title">商品管理</div>
         <a :href="`http://${userInfo.open_id}.${studio}/#/goods`" class="flex center side manage">预览</a>
      </div>
      <div id="tabs" class="flex">
         <a href="javascript:;" @click="tab('all')" :class="['flexitem','center',{current:type=='all'}]">全部</a>
         <a href="javascript:;" @click="tab('hot')" :class="['flexitem','center',{current:type=='hot'}]">热门商品</a>
         <a href="javascript:;" @click="tab('recommend')" :class="['flexitem','center',{current:type=='recommend'}]">促销商品</a>
         <a href="javascript:;" @click="tab('cancel')" :class="['flexitem','center',{current:type=='cancel'}]">已下架</a>
      </div>
      <!--商品列表-->
      <mescroll id="goods" class="flexitemv mainbox" ref="myScroller" :up="mescrollUp" @init="mescrollInit" v-show="goodList.length">
         <ul class="goods">
            <li class="flex" v-for="(item,index) in goodList" :key="index">
               <div class="flexitem info" @click="$router.push({name:'detail',params:{id:item.id},hash:'all'})">
                  <img :src="item.cover" :alt="item.title" class="flex">
                  <div class="flexitemv">
                     <h3 class="flexv">{{item.title}}</h3>
                     <div class="flexitem"></div>
                     <p class="flex endv">¥{{item.price}}</p>
                  </div>
               </div>
               <div class="flexv option">
                  <a href="javascript:;" v-if="index!=0" class="flexitem center rd rd-fold goup" @click="up(item.id,index)"></a>
                  <a href="javascript:;" v-if="index!=goodList.length-1" class="flexitem center rd rd-open godown" @click="down(item.id,index)"></a>
                  <a href="javascript:;" class="flexitem center rd rd-menu moreoption" @click="actionSheet(item.id)"></a>
                  <mt-actionsheet :actions="actionAll" v-model="sheetVisible"></mt-actionsheet>
               </div>
            </li>
         </ul>
      </mescroll>
      <div id="none" class="flexitemv center" v-show="!goodList.length"><div class="flex icon"></div><p>暂无相关商品信息~</p></div>
   </div>
</template>
<script>
   import axios from '../../assets/js/axios'
   import Mescroll from 'mescroll.js/mescroll'

   export default{
      components: {
         Mescroll
      },
      data(){
         return {
            userInfo: {},

            goodList: [], // 商品列表

            actionAll: [
               {name: '设为推荐', method: this.setRec},
               {name: '设为热门', method: this.setHot},
               {name: '下架商品', method: this.downGoods}
            ],
            actionHot: [
               {name: '取消热门', method: this.cancelHot},
               {name: '设为推荐', method: this.setRec},
               {name: '下架商品', method: this.downGoods}
            ],
            actionRec: [
               {name: '取消推荐', method: this.canRecommend},
               {name: '设为热门', method: this.setHot},
               {name: '下架商品', method: this.downGoods}
            ],
            actionCan: [
               {name: '上架', method: this.upGoods}
            ],
            sheetVisible: false, //显示操作列表
            actionId: 0, //产品id

            type: 'all',
            mescroll: null,
            mescrollUp: {
               callback: this.upCallback,
               page: {
                  num: 0,
                  size: 9,
               },
               noMoreSize: 9,
            },

            meta: {},

            studio: window.location.host
         }
      },
      created(){  //加载前请求一次
         this.$store.dispatch('userInfo').then(() => {
            this.userInfo = this.$store.getters.getuserInfo;
         })

      },
      methods: {
         tab(index){
            this.type = index;
            if (index == 'all') {
               this.$router.push({query: {type: '0'}})
            } else if (index == 'hot') {
               this.$router.push({query: {type: '2'}})
            } else if (index == 'recommend') {
               this.$router.push({query: {type: '1'}})
            } else if (index == 'cancel') {
               this.$router.push({query: {status: 'cancel'}})
            }
            this.goodList = [];
            this.mescroll.resetUpScroll();  // 刷新列表数据
         },
         //滚动加载分页
         mescrollInit(mescroll){
            this.mescroll = mescroll
         },
         //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
         upCallback(page, mescroll){
            var tabtype = '' || this.$route.query, url = 'user/products/manage';
            JSON.stringify(tabtype)
            if (JSON.stringify(tabtype) != '{}') {
               for (let [key, val] of Object.entries(tabtype)) {
                  url = `${url}?${key}=${val}`;
                  let types = url.substring(url.indexOf('?'));
                  if (types == '?type=0') {
                     this.type = 'all'
                     url = url.substring(0, url.indexOf('?'));
                  } else if (types == '?type=2') {
                     this.type = 'hot'
                  } else if (types == '?type=1') {
                     this.type = 'recommend'
                  } else if (types == '?status=cancel') {
                     this.type = 'cancel'
                  }
                  axios.get(`${url}?page=${page.num}`).then(res => {
                     if (page.num == 1) {this.goodList = []}
                     this.goodList.push(...res.data);
                     this.$nextTick(() => {
                        mescroll.endSuccess(res.data.length);
                     })
                  }).catch(() => {
                     mescroll.endErr();
                  })
               }
            } else {
               axios.get(`${url}?page=${page.num}`).then(res => {
                  if (page.num == 1) {this.goodList = []}
                  this.goodList.push(...res.data);
                  this.$nextTick(() => {
                     mescroll.endSuccess(res.data.length);
                  })
               }).catch(() => {
                  mescroll.endErr();
               })
            }
         },
         //类型操作
         genre(state){
            axios.post('user/products/manage_type', state).then(res => {
               //arr.unshift(dd) 数组前添加
            })
         },

         // 调换数组位置
         swapItems(arr, index1, index2) {
            arr[index1] = arr.splice(index2, 1, arr[index1])[0];
         },

         //上移
         up(id, index){
            let body = {
               product_id: id,  // 商品 id
               type: this.type, // 商品类型
               sort: 'up'       // 操作类型
            }
            axios.post('user/products/manage_sort', body).then(res => {
               if (this.type == 'all') {
                  this.$store.commit('upgoodsAll', index);
               } else if (this.type == 'hot') {
                  this.$store.commit('upgoodsHot', index);
               } else if (this.type == 'recommend') {
                  this.$store.commit('upgoodsRec', index);
               }
            });
         },
         //下移
         down(id, index){
            let body = {
               product_id: id,
               type: this.type,
               sort: 'down'
            }
            axios.post('user/products/manage_sort', body).then(res => {
               if (this.type == 'all') {
                  this.$store.commit('downgoodsAll', index);
               } else if (this.type == 'hot') {
                  this.$store.commit('downgoodsHot', index);
               } else if (this.type == 'recommend') {
                  this.$store.commit('downgoodsRec', index);
               }
            })
         },
         //显示上拉菜单并传值
         actionSheet(id){
            this.actionId = id;
            this.sheetVisible = true
         },
         // 设为推荐(全部)
         setRec(){
            let manage = {product_id: this.actionId, operation: 'become', type: 3}
            this.genre(manage);
            this.$store.commit('setRec', this.actionId);
            this.sheetVisible = false
         },
         // 设为热门(全部)
         setHot(){
            let manage = {product_id: this.actionId, operation: 'become', type: 2}
            this.genre(manage);
            this.$store.commit('setHot', this.actionId);
            this.sheetVisible = false
         },
         // 下架商品(全部)
         downGoods(){
            let manage = {product_id: this.actionId, operation: 'cancel', type: 1}
            this.genre(manage);
            this.$store.commit('downGoods', this.actionId);
            this.sheetVisible = false
         },
         // 取消热门
         cancelHot(){
            let manage = {product_id: this.actionId, operation: 'cancel', type: 2}
            this.genre(manage);
            this.$store.commit('cancelHot', this.actionId);
            this.sheetVisible = false
         },
         // 取消推荐
         canRecommend(){
            let manage = {product_id: this.actionId, operation: 'cancel', type: 3}
            this.genre(manage);
            this.$store.commit('cancelRec', this.actionId);
            this.sheetVisible = false
         },
         // 上架
         upGoods(){
            let manage = {product_id: this.actionId, operation: 'become', type: 1}
            this.genre(manage);
            this.$store.commit('upGoods', this.actionId);
            this.sheetVisible = false
         }

      }
   }
</script>

<style>
   #tabs{height:40px;background:#fff;border-bottom:1px solid #eee}
   #tabs a{position:relative;font-size:.95em;width:0}
   #tabs a:after{content:'';position:absolute;left:35%;right:35%;bottom:0;height:3px;background:#c33;visibility:hidden}
   #tabs a.current{color:#c33}
   #tabs a.current:after{visibility:visible}
   a.mint-actionsheet-button{color:red}

   /*.mint-loadmore {overflow:hidden}*/
   #goods{position:relative}
   #goods .goods li{padding:5px;background:#fff;border-bottom:1px solid #f5f5f5}
   #goods .goods li .info img{width:80px;height:80px}
   #goods .goods li .info div{padding:0 10px}
   #goods .goods li .info h3{font-size:.95em;font-weight:400;height:40px;line-height:20px;text-overflow:ellipsis;-webkit-line-clamp:2;word-break:break-all;overflow:hidden}
   #goods .goods li .info p{height:20px;color:red;font-size:1.1em}
   #goods .goods li .option{width:50px}
   #goods .goods li .option a.rd{color:#888;font-size:1.2em}
</style>
