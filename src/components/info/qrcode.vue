<template>
   <div id="qrcode">
      <my-header :content="text" :router="router"></my-header>
      <div id="main">
         <div class="qrcodebox">
            <div class="qrcode" @click="file"><span v-if="!imgsrc">您当前尚未上传二维码</span><img v-if="imgsrc" :src="imgsrc" class="fitimg"></div>
            <a href="javascript:;" class="uploader"><span>上传二维码</span><input type="file" ref="file" accept="image/*"></a>
         </div>
      </div>

      <!--裁剪图片-->
      <cliper v-show="visible" ref="clipper" @ok="ok" @cancel="cancel" :img="imgUrl" :clipper-img-width="400" :clipper-img-height="400"></cliper>
   </div>
</template>
<script>
   import {Toast, Indicator} from 'mint-ui'
   import cliper from '../path/cliper'
   import myHeader from '../header/header.vue'
   import axios from '../../assets/js/axios'

   export default{
      components:{
         myHeader,
         cliper
      },
      created(){
         this.$store.dispatch('userInfo').then(users => {
            this.imgsrc = users.qrcode
         })
      },
      data(){
         return{
            text:'修改二维码',
            router:'info',

            visible:false,
            imgUrl: '',
            imgsrc:''
         }
      },
      methods: {
         file(){
            //自动触发file点击事件
            let evt = document.createEvent('HTMLEvents');
            evt.initEvent('click',true,true);
            this.$refs.file.dispatchEvent(evt);
            this.$refs.file.click();
            console.log(1);
            //获取到file里图片地址传给子组件
            this.$refs.file.onchange = ()=>{
               this.imgUrl = window.URL.createObjectURL(this.$refs.file.files[0]);
               this.visible = true;
               this.$refs.clipper.change() //调用子组件方法
               console.log(2);
            }
         },
         ok(data) {
            this.visible = false; //隐藏掉裁剪组件
            Indicator.open({  //动画
               text: '二维码保存中',
               spinnerType: 'snake'
            });
            //数据发送
            axios.post('user/image/qrcode',{qrcode:data}).then(res=>{
               this.imgsrc = res.data.qrcode;
               Indicator.close(); //结束动画
               Toast({
                  message: '二维码保存完成',
                  iconClass: 'rd rd-selected',
                  duration:800
               });
            })
         },
         cancel(){
            this.visible = false; //隐藏掉裁剪组件
         }
      }
   }
</script>

<style>
   #qrcode .qrcodebox{padding: 40px 0;}
   #qrcode .qrcodebox .qrcode{position: relative; width: 240px; height: 240px; border: 1px dashed #eee; background: #fff; margin: 0 auto;}
   #qrcode .qrcodebox .qrcode span{position: absolute; top: 50%; left: 10px; right: 10px; text-align: center; color: #666; height: 20px; line-height: 20px; margin-top: -10px;}
   #qrcode .qrcodebox .uploader{position: relative; display: block; width: 120px; height: 50px; line-height: 50px; text-align: center; background: #62E262; color: #fff; border-radius: 2px; margin: 20px auto; overflow: hidden;}
   #qrcode .qrcodebox .uploader input{position: absolute; top: 0; left: 0; width: 100%; bottom: 0; padding: 0; opacity: 0;}
</style>
