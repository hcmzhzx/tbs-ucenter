<template>
   <div id="admin" class="flexv">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.push({name:'user'})" class="rd rd-houtui flex centerv side icon"></a>
         <div class="flexitem center title">相册管理</div>
         <a href="javascript:;" class="flex center side manage" @click="administer=true">管理</a>
      </div>
      <div id="main" class="flexitemv">
         <div id="album" v-if="albumlist.length>0">
            <ul class="albumlist"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                :infinite-scroll-immediate-check="true"
                infinite-scroll-distance="10">
               <li class="flex" v-for="(item,index) in albumlist" :key="index">
                  <img :src="item.cover" class="flex">
                  <div class="flexitemv info">
                     <h3>{{item.title}}</h3>
                     <p>{{item.desc}}</p>
                  </div>
                  <i class="flex centerv rd rd-menu" @click="admlist(item.id)"></i>
                  <a href="javascript:;" @click="$router.push({name:'album-datail', query:{id:item.id}})"></a>
               </li>
            </ul>

            <div id="more" class="flex center" v-if="isLoading"><i></i><span>正在加载..</span></div>
            <div id="more" class="flex center" v-if="noMore"><span>已经加载完所有数据</span></div>
         </div>

         <div id="none" class="flexitemv center" v-else>
            <div class="icon"></div>
            <p>您当前尚未创建相册~</p>
            <div class="flex center link"><a href="javascript:;" @click="$router.push({name:'album-add'})">创建一个相册</a></div>
         </div>
      </div>
      <div id="tools" class="flex" v-if="albumlist.length>0">
         <a href="javascript:;" @click="$router.push({name:'album-add'})" class="flexitem center">创建相册</a>
         <a href="javascript:;" @click="$router.push({name:'album-upload'})" class="flexitem center">上传照片</a>
      </div>
      <mt-actionsheet
         :actions="action"
         v-model="administer">
      </mt-actionsheet>
      <mt-actionsheet
         :actions="amend"
         v-model="modification">
      </mt-actionsheet>
   </div>
</template>

<script>
   import {MessageBox} from 'mint-ui'
   import axios from '../../assets/js/axios'

   export default {
      created(){
         this.$store.dispatch('albumList')
      },
      data(){
         return {
            action:[
               {name: '创建相册', method: this.add},
               {name: '上传照片', method: this.upload}
            ],
            amend:[
               {name: '修改相册', method: this.edit},
               {name: '上传照片', method: this.upload},
               {name: '删除相册', method: this.trash}
            ],
            administer: false,
            modification: false,

            Id:0,

            loading:false,
            isLoading:false,
            noMore:false
         }
      },
      methods: {
         admlist(id){
            this.modification = true;
            this.Id = id
         },
         add(){  //创建
            this.$router.push({name:'album-add'})
         },
         upload(){  //上传
            if(this.Id != 0){
               this.$router.push({name: 'album-upload',query:{id:this.Id}})
            }else{
               this.$router.push({name: 'album-upload'})
            }
         },
         edit(){  //修改
            this.$router.push({name:'album-edit',query:{id:this.Id}})
         },
         trash(){  //删除
            MessageBox.confirm('您确定要删除该相册？删除后不可恢复！','温馨提示').then(()=> {
               axios.delete(`album/${this.Id}`).then(()=>{
                  this.$store.commit('albumDel',this.Id);
               })
            }).catch(()=>{});
         },
         loadMore(){ // 加载更多
            let meta = this.$store.getters.getAlbumMeta;
            this.loading = true
            this.isLoading = true
            if (meta.current_page == meta.total_pages) { //超过分页
               this.isLoading = false
               this.loading = this.noMore = true
               return false;
            }
            setTimeout(()=>{
               this.$store.dispatch('albumPage', meta.links.next).then(()=>{
                  this.loading = false
               })
            },100)
         }
      },
      computed:{
         albumlist(){
            return this.$store.getters.getalbumlist;
         }
      }
   }
</script>
