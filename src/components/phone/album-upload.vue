<template>
   <div class="flexv">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.go(-1)" class="rd rd-houtui flex centerv side icon"></a>
         <div class="flexitem center title">上传照片</div>
         <a href="javascript:;" class="flex center side upload" @click='upload'>上传</a>
      </div>

      <div id="main" class="flexitemv">
         <form id="upload" action="" onsubmit="return false" method="post" enctype="multipart/form-data">
            <div class="flex album" @click="contact=true">
               <div class="flex cover"><img :src="album.cover" class="fitimg"></div>
               <div class="flexitemv info">
                  <h3 class="flexitem">{{album.title}}</h3>
                  <p>{{album.desc}}</p>
               </div>
               <i class="flex center rd rd-qianjin"></i>
               <input type="hidden" name="albumId" value="0">
            </div>

            <ul class="photos clearfix br">
               <li v-if="albumlist.length>0" v-for="(item,index) in albumlist" :key="index">
                  <a href="javascript:;" class="cover" @click="deleteFile(index)">
                     <span class="flex center">点击可移除</span>
                     <img :src="item.src" class="fitimg">
                  </a>
                  <div class="flex"><input type="text" :value="item.name" class="flexitem" onfocus="this.select()"></div>
               </li>
            </ul>
         </form>
      </div>

      <div id="tools" class="flexv">
         <div class="flexitem center picker" v-if="albumlist.length==0" @click="uploaderBtn">
            <div class="webuploader-pick">选择照片</div>
            <input type="file" name="image" multiple="multiple" accept="image/*" ref="xzfile">
         </div>
         <div class="flexitem center lists" v-else>
            <div class="flexitem counter">共{{albumlist.length}}张图片 , {{size}}</div>
            <div class="continue" @click="uploaderBtn">
               <div class="webuploader-pick">继续选择</div>
               <input type="file" name="image" multiple="multiple" accept="image/*" ref="jxfile"></div>
         </div>
      </div>
      <!--选择相册-->
      <div id="albumlist" :class="['frame',{frameshow:contact}]">
         <div class="header">
            <a href="javascript:;" class="side cancel" @click="contact=false">取消</a>
            <div class="title">选择相册</div>
            <a href="javascript:;" class="side save"></a>
         </div>
         <div class="bodys" id="albumbody">
            <div id="album" style="padding-bottom:50px">
               <ul class="albumlist"
                   v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="loading"
                   :infinite-scroll-immediate-check="true"
                   infinite-scroll-distance="10">
                  <li class="flex" v-for="(item,index) in selectlist" :key="index" @click="admlist(item.id)">
                     <img :src="item.cover" class="flex">
                     <div class="flexitemv info">
                        <h3>{{item.title}}</h3>
                        <p>{{item.desc}}</p>
                     </div>
                     <i class="flex centerv rd rd-qianjin"></i>
                  </li>
               </ul>
               <div id="more" class="flex center" v-if="isLoading"><i></i><span>正在加载..</span></div>
               <div id="more" class="flex center" v-if="noMore"><span>已经加载完所有数据</span></div>
            </div>
         </div>
      </div>
      <!--进度条-->
      <div id="progressbar" class="flex center" v-if="progress">
         <div class="content">
            <div class="bar"><mt-progress :value="value" :barHeight="20" transition="progress-fade"><em class="num" slot="end">{{ value }}%</em></mt-progress></div>
            <div class="flex center text">{{stateText}}</div>
            <div class="flex center btns" v-if="stateBtn">
               <a href="javascript:;" class="flexitem center" @click="check">去相册查看</a><a href="javascript:;" @click="goon" class="flexitem center">继续上传</a>
            </div>
         </div>
      </div>

   </div>
</template>

<script>
   import {Toast, MessageBox, Progress } from 'mint-ui'
   import axios from '../../assets/js/axios'

   export default {
      created(){
         //选择过相册
         this.id = this.$route.query.id;
         if(this.id != undefined){
            axios.get(`album/${this.id}`).then(res => {
               this.album = res.data
            })
         }
         //防止刷新无数据
         this.$store.dispatch('albumList')
      },
      data(){
         return {
            defaults: {
               fileType: /(jpg)|(png)|(jpeg)/i, // 上传文件的类型
               fileSize: 1024 * 1024 * 3,       // 上传文件的大小 3M
               fileNum: 20                     // 上传图片总张数
            },
            contact: false,

            size: '',
            totalsize: 0,
            albumlist: [], //预览图
            fileList:[],  //file对象数组

            id: 0, //相册id
            album: {
               cover:'http://pic.sanjinzuan.com/album/default.jpg',
               title:'未选择',
               desc:'请选择相册'
            },

            progress:false, //进度条
            value:0,
            stateText:'正在上传...',
            stateBtn:false,

            loading:false,
            isLoading:false,
            noMore:false
         }
      },
      computed: {
         selectlist(){
            return this.$store.getters.getalbumlist
         }
      },
      methods: {
         uploaderBtn(){
            let file = this.$refs.xzfile || this.$refs.jxfile;
            file.onchange = () => {
               let fileList = file.files;
               this._validate(fileList);
            }
         },
         _validate(files) {
            for (let item of Object.values(files)) {
               let type = item.type.split("").join("").split("/")[1];
               if (this.defaults.fileType.test(type)) {
                  if (item.size >= this.defaults.fileSize) {
                     Toast({ // 提示错误
                        message: '照片大小超出限制',
                        iconClass: 'rd rd-guanbi',
                        position: 'center',
                        className: 'error',
                        duration: 1000
                     });
                     return
                  } else {
                     this.fileList.push(item)
                     let total = this.totalsize += item.size;
                     this.size = this.formatSize(total);
                     this.albumlist.push({name: item.name, src: window.URL.createObjectURL(item), size: item.size})
                  }
               } else {
                  Toast({ // 提示错误
                     message: '照片格式错误',
                     iconClass: 'rd rd-guanbi',
                     position: 'center',
                     className: 'error',
                     duration: 800
                  })
               }
            }
         },
         formatSize(size){  //格式化文件大小, 输出成带单位的字符串
            let unit, units = ['B', 'K', 'M', 'G', 'TB'];
            while ((unit = units.shift()) && size > 1024) {
               size = size / 1024
            }
            return (unit === 'B' ? size : size.toFixed(2)) + unit;
         },
         deleteFile(index){  //删除图片
            MessageBox.confirm('您确定从列表中移除该照片!', '温馨提示').then(() => {
               let delSize = this.albumlist.splice(index, 1)[0].size;
               let total = this.totalsize -= delSize;
               this.size = this.formatSize(total);
               this.fileList.filter((val, item) => {
                  return item != index;
               }).forEach((val, item) => {
                  //console.log(item);
                  if (item == 0) {
                     this.fileList = []
                     this.fileList.push(val);
                  } else {
                     this.fileList.push(val);
                  }
               });
            }).catch(() => {})
         },
         upload(){  //上传照片
            if(this.fileList.length ==0){
               Toast({
                  message: '没有要上传的照片',
                  iconClass: 'rd rd-guanbi',
                  position: 'center',
                  className: 'error',
                  duration: 800
               })
            } else {
               if(this.id == undefined){
                  Toast({
                     message: '请选择相册',
                     iconClass: 'rd rd-guanbi',
                     position: 'center',
                     className: 'error',
                     duration: 800
                  })
               } else {
                  let form = new FormData();
                  this.fileList.forEach((item)=>{
                     form.append('images[]',item);
                  })
                  this.progress = true
                  axios.post(`album/${this.id}/photo`,form,{headers:{'Content-Type':'multipart/form-data'},onUploadProgress:(progressEvent)=>{let complete = Math.round((progressEvent.loaded / progressEvent.total * 100 | 0));this.value = complete}}).then(()=>{
                      this.stateText = '上传完成';
                      this.stateBtn = true
                  })
               }
            }
         },
         loadMore(){  //分页
            let meta = this.$store.getters.getAlbumMeta;
            this.loading = true
            this.isLoading = true
            if (meta.current_page == meta.total_pages) { //超过分页
               this.isLoading = false
               this.noMore = true
               return false;
            }
            setTimeout(()=>{  //缓冲
               this.$store.dispatch('albumPage', meta.links.next);
            },100)
            this.loading = false
         },
         admlist(id){  //选中相册
            this.album = this.$store.getters.getalbumlist.filter((item)=>{
               this.id == item.id;
               return this.id = id
            })[0];
            this.contact=false
         },
         check(){  //去查看相册
            this.$router.push({name:'album-datail',query:{id:this.id}})
         },
         goon(){  //继续上传
            console.log(1);
            this.albumlist = [];
            this.fileList = [];
            this.progress = false
            this.stateBtn = false
         }
      }
   }
</script>

<style>
   #upload .album{border-bottom: 1px solid #f5f5f5; padding: 6px; background: #fff;}
   #upload .album .cover{position: relative; width: 40px; height: 40px; overflow: hidden;}
   #upload .album .cover img{position: absolute; top: 0; left: 0;}
   #upload .album .info{padding: 0 10px;}
   #upload .album .info h3{font-weight: normal; font-size: 1em; height: 20px; line-height: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
   #upload .album .info p{font-size: 0.8em; color: #888; height: 14px; line-height: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
   #upload .album  i{height: 40px; font-size: 1.4em; color: #999;}
   #upload .photos{padding: 5px;}
   #upload .photos li{position: relative; width: 33.33%; padding-top: 33.33%; padding-bottom: 30px; float: left;}
   #upload .photos li .cover{position: absolute; top: 5px; left: 5px; right: 5px; bottom: 35px; overflow: hidden; background: #f5f5f5;}
   #upload .photos li .cover em{position: absolute; left: 0; top: 50%; width: 100%; text-align: center; height: 30px; line-height: 30px; text-align: center; font-size: 0.8em; margin-top: -20px;}
   #upload .photos li .cover img{position: absolute; top: 0; left: 0; z-index: 3;object-fit:cover;}
   #upload .photos li .cover span{position: absolute; left: 0; bottom: 0; height: 24px; background: rgba(255,0,0,0.5); color: #fff; width: 100%; font-size: 0.9em; z-index: 4;}
   #upload .photos li div{position: absolute; bottom: 5px; left: 5px; right: 5px; height: 30px;}
   #upload .photos li div input{border: none; padding: 6px; font-size: 0.8em;}

   #tools{position: relative; background: #fff; height: 50px; border-top: 1px solid #ddd; overflow: hidden;}
   #tools a{border-left: 1px solid #eee; margin-left: -1px;}
   #tools span{font-size: 1.05em; color: #27e;}
   #tools input{position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0; z-index: 2; padding: 0;}
   #tools div.picker,#tools div.lists{position: absolute; top: 0; left: 0; height: 100%; width: 100%; background: #fff; z-index: 2;}
   #tools div.show{z-index: 3;}
   #tools .counter{font-size: 0.8em; color: #666; padding: 0 5px;}
   #tools .continue{position: relative; width: 80px; height: 40px; background: #27e; margin-right: 4px; border-radius: 2px;}
   #tools .webuploader-pick{display: -webkit-box; -webkit-box-pack: center; -webkit-box-align: center;  width: 100%; height: 100%; font-size: 1.05em; color: #27e;}
   #tools .continue .webuploader-pick{color: #fff; font-size: 0.9em;}

   .frame{position: fixed; top: 0; left: 0; width: 100%; height: 100%; transition: transform 0.2s linear; -webkit-transition: transform 0.2s linear; transform: translateX(100%); -webkit-transform: translateX(100%); background: #fff; z-index: 9999;}
   .frameshow{transform: translateX(0px); -webkit-transform: translateX(0px);}
   .frame .header{position: absolute; top: 0; left: 0; right: 0; height: 52px; border-bottom: 1px solid #eee; line-height: 52px; z-index: 9;}
   .frame .header .side{position: absolute; top: 0; left: 0; color: #555; width: 60px; padding: 0 5px; text-align: center;}
   .frame .header .save{left: initial; right: 0;}
   .frame .header .title{font-size: 1.05em; text-align: center;}
   .frame .bodys{position: absolute; top: 52px; left: 0; right: 0; bottom: 0; overflow-x: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch;}
   .fitimg{width: 100%; height: 100%;}
   /*进度条*/
   #progressbar{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5);z-index:20;}
   #progressbar .content{width: 80%; background: #fff; border-radius: 2px; overflow: hidden;}
   #progressbar .bar{position: relative;  background: #eee; height: 20px; margin: 10px; line-height: 20px;}
   #progressbar .bar em{position:absolute;top: 0;left: 50%;transform:translateX(-50%); z-index: 4; display: block; text-align: center; font-size: 0.9em;}
   #progressbar .text{padding: 2px 10px 10px;}
   #progressbar .btns a{border-top: 1px solid #eee; border-left: 1px solid #eee; height: 36px; margin-left: -1px;}
   #progressbar .mt-progress{height:18px;line-height:initial;}

</style>
