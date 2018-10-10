<template>
   <form action="" onsubmit="return false" @submit.prevent="sendForm">
      <div id="header" class="flex">
         <a href="javascript:;" @click="$router.go(-1)" class="rd rd-houtui flex centerv side icon"></a>
         <div class="flexitem center title">添加相册</div>
         <button type="submit" class="flex center side save">保存</button>
      </div>
      <div id="main" class="flexitemv">
         <div id="album">
            <div class="flexv form">
               <p class="flex centerv title">相册标题</p>
               <input type="text" name="title" placeholder="请填写相册标题" v-model="title" class="flexitem text" data-rule="*" data-errmsg="相册标题不能空">
               <p class="flex centerv title">相册描述</p>
               <textarea name="desc" placeholder="请填写相册描述" v-model="desc" class="flexitem text" data-rule="*" data-errmsg="相册描述不能空"></textarea>
            </div>
         </div>
      </div>
   </form>
</template>

<script>
   import {Toast, Indicator} from 'mint-ui'
   import {CheckForm} from '../../assets/js/checkForm'
   import axios from '../../assets/js/axios'

   export default {
      created(){
         let Id = this.$route.query.id;
         this.Id = Id || 0;
         if(Id != undefined){
            let albumArr = this.$store.getters.getalbumlist;
            let current = albumArr.filter((item)=>{
               return item.id == Id
            })[0];
            this.title = current.title;
            this.desc = current.desc;
         }
      },
      data(){
         return{
            title:'',
            desc:'',

            Id:0
         }
      },
      methods:{
         sendForm(e){
            new CheckForm(e,err => {
               Toast({  //提示错误
                  message:err,
                  iconClass: 'rd rd-guanbi',
                  position:'center',
                  className:'error',
                  duration:800
               })
            },posts => {
               Indicator.open({
                  text: '相册创建中',
                  spinnerType: 'snake'
               });
               this.$store.dispatch('albumAdd_list',posts).then(()=>{
                  Indicator.close(); //结束动画
                  Toast({
                     message: '相册创建成功',
                     iconClass: 'rd rd-selected',
                     duration:800
                  });
                  setTimeout(()=>{
                     this.$router.push({name:'album-admin'})
                  },900)
               })
            })
         }
      }
   }
</script>

<style>

</style>
