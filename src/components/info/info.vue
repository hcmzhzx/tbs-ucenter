<template>
   <form id="info" @submit.prevent="sendForm">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.push({name:'user'})" class="rd rd-houtui flex centerv side icon"></a>
         <div class="flexitem center title">修改资料</div>
         <button type="submit" class="flex center side save">保存</button>
      </div>
      <div id="main" class="flexitemv">
         <div id="profile">
            <div class="block">
               <label class="flex centerv row">
                  <span class="flex title">头像</span>
                  <em class="flexitem"></em>
                  <img :src="userImg" class="flex">
                  <i class="rd rd-qianjin flex"></i>
                  <input type="file" accept="image/*" @change="file" ref="file" class="hidden">
               </label>
               <div class="flex centerv row">
                  <span class="flex title">姓名</span>
                  <input type="text" name="name" v-model="userInfo.name" placeholder="请填写您的姓名" class="flexitem input">
               </div>
               <div class="flex centerv row">
                  <span class="flex title">头衔</span>
                  <input type="text" name="title" v-model="userInfo.title" placeholder="请填写您的头衔" class="flexitem input">
               </div>
               <a href="javascript:;" @click="$router.push({name:'signature'})" class="flex centerv row">
                  <span class="flex title">个性签名</span>
                  <em class="flexitem centerv endh">点击修改</em>
                  <i class="rd rd-qianjin"></i>
               </a>
            </div>
            <div class="block">
               <div class="flex centerv row">
                  <span class="flex title">QQ</span>
                  <input type="number" name="qq" v-model="userInfo.qq" placeholder="请填写您的QQ" class="flexitem input">
               </div>
               <div class="flex centerv row">
                  <span class="flex title">微信</span>
                  <input type="text" name="wechat" v-model="userInfo.wechat" placeholder="请填写您的微信" class="flexitem input">
               </div>
               <a href="javascript:;" @click="$router.push({name:'qrcode'})" class="flex centerv row">
                  <span class="flex title">二维码</span>
                  <s class="flexitem centerv endh rd rd-erweima1"></s>
                  <i class="rd rd-qianjin"></i>
               </a>
            </div>
            <div class="block">
               <a href="javascript:;" html="setpwd" class="flex centerv row">
                  <span class="flex title">修改密码</span>
                  <em class="flexitem centerv endh">*******</em>
                  <i class="rd rd-qianjin"></i>
               </a>
               <a href="javascript:;" @click="$router.push({name:'account'})" class="flex centerv row">
                  <span class="flex title">银行卡绑定</span>
                  <em class="flexitem centerv endh">{{card_binding}}</em>
                  <i class="rd rd-qianjin"></i>
               </a>
               <a href="javascript:;" @click="$router.push({name:'wechat'})" class="flex centerv row">
                  <span class="flex title">微信绑定</span>
                  <em class="flexitem centerv endh">{{WX_binding}}</em>
                  <i class="rd rd-qianjin"></i>
               </a>
            </div>
         </div>
      </div>
      <!--裁剪图片-->
      <cliper v-show="visible" ref="clipper" @ok="ok" @cancel="cancel" :img="imgUrl" :clipper-img-width="650" :clipper-img-height="650"></cliper>
   </form>
</template>
<script>
   //import {CheckForm} from '../../assets/js/checkForm'
   import cliper from '../path/cliper'
   import {Toast, Indicator} from 'mint-ui'
   import axios from '../../assets/js/axios'
   import {APP_URL} from '../../assets/js/api'

   export default{
      components:{
         cliper
      },
      created(){
         //获取用户数据
         this.$store.dispatch('userInfo').then(users => {
            this.userImg = this.userInfo.upic = users.upic
            this.userInfo.name = users.name
            this.userInfo.title = users.title
            this.userInfo.qq = users.qq
            this.userInfo.wechat = users.wechat;

            //是否绑定银行卡
            axios.get('user/is_bind_bank').then(res=>{
              if(res.state) {this.card_binding = '已绑定'}
            })
            //是否绑定微信
            axios.get('user/is_bind_wechat').then(res=>{
               if(res.state) {this.WX_binding = '已绑定'}
            })
         })
      },
      data(){
         return{
            userInfo:{
               upic:'',
               name:'',
               title:'',
               qq:'',
               wechat:''
            },
            userImg:'',
            card_binding:'未绑定',
            WX_binding:'未绑定',

            visible:false,
            imgUrl: ''
         }
      },
      methods: {
         file(){ //获取到file里图片地址传给子组件
            this.imgUrl = window.URL.createObjectURL(this.$refs.file.files[0]);
            this.visible = true;
            this.$refs.clipper.change() //调用子组件方法
         },
         ok(data) {
            this.visible = false; //隐藏掉裁剪组件
            Indicator.open({  //动画
               text: '头像保存中',
               spinnerType: 'snake'
            });
            const form = new FormData();
            console.log(data);
            this.userImg = data
            form.append('type','user');
            form.append('image',this.$refs.file.files[0]);
            axios.post('user/image/avatar',form,{headers:{'Content-Type':'multipart/form-data'}}).then(res=>{
               this.userImg = this.userInfo.upic = res.path;
               Indicator.close(); //结束动画
               Toast({
                  message: '头像保存完成',
                  iconClass: 'rd rd-selected',
                  duration:800
               });
            })
         },
         cancel(){
            this.visible = false; //隐藏掉裁剪组件
         },
         sendForm(){  //表单验证提交
            if(this.userInfo.name == ''){
               Toast({ // 提示错误
                  message: '姓名必须填写',
                  iconClass: 'rd rd-guanbi',
                  position: 'center',
                  className: 'error',
                  duration: 800
               })
            } else if(this.userInfo.wechat == ''){
               Toast({ // 提示错误
                  message: '微信号必须填写',
                  iconClass: 'rd rd-guanbi',
                  position: 'center',
                  className: 'error',
                  duration: 800
               })
            } else {
               Indicator.open({  //动画
                  text: '修改中',
                  spinnerType: 'snake'
               });
               this.userInfo.upic = this.userInfo.upic.substring(25); // 截取成相对路径
               this.$store.commit('userState',this.userInfo);// 本地修改状态
               axios.patch('user',this.userInfo).then(()=>{
                  Indicator.close(); //结束动画
                  Toast({
                     message: '修改成功',
                     iconClass: 'rd rd-selected',
                     duration:800
                  })
               })
            }
         }
      }
   }
</script>

<style>
   #profile .gap{height: 10px;}
   #profile .block{margin-top: 10px; background: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee;}
   #profile .block .row{position: relative; padding: 5px; border-bottom: 1px solid #f5f5f5; margin-left: 10px;}
   #profile .block .row:last-child{border-bottom: none;}
   #profile .block .row .title{width: 80px;}
   #profile .block .row img{width: 50px; height: 50px; border-radius: 50%;}
   #profile .block .row i{width: 20px; font-size: 1.2em; color: #888; padding-top: 2px;}
   #profile .block .row s{height: 40px; text-decoration: none; font-size: 1.4em; color: #999; padding: 0 4px;}
   #profile .block .row em{color: #888; height: 40px;}
   #profile .block .row .input{text-align: right; height: 20px; padding: 10px; border: none; background: none;}
   #profile .block .row input.normal{text-align: left;}
   #profile .block .row .hidden{opacity: 0; position: absolute; top: 0; left: 0; bottom: 0; right: 0;}
   #profile .upload{padding: 10px; max-width: 480px; margin: 0 auto;}
   #profile .upload h4{font-weight: normal; font-size: 1em; height: 40px; line-height: 40px;}
   #profile .upload .uparea{position: relative; padding-top: 54%; background: #fff;}
   #profile .upload .uparea .webuploader-pick{position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 1px dashed #eee;}
   #profile .upload .uparea input{position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 8; opacity: 0; padding: 0;}
   #profile .upload .uparea .file{position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: 6;}
   #profile .upload .uparea .file em.text{width: 40px; height: 40px; background: rgba(0,0,0,0.5); color: #fff; border-radius: 4px;}
   #profile .upload .uparea .file em.state{position: absolute; top: 0; left: 0; width: 0%; height: 2px; background: #f00;}
</style>
