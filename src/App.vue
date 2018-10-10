<template>
   <div id="wrap">
      <router-view/>
   </div>
</template>

<script>
   export default {
      name: 'wrap'
   }
</script>

<style>
   @import url(http://at.alicdn.com/t/font_164153_05g5gz2deug6tj4i.css);.rd{font-size:x-large;}
   html,body,div,ul,ol,li,dl,dt,dd,form,input,textarea,table,h1,h2,h3,h4,p,span,a,em,i,img{margin: 0; padding: 0; font-style: normal;}
   html,body{height: 100%; background: #fafafa; font: 1em '\5FAE\8F6F\96C5\9ED1','\9ED1\4F53','\5B8B\4F53';}
   ul,ol{list-style: none;}table{border-collapse: collapse;}
   iframe,img{border:none;}
   a,a:hover,a:visited,a:active{text-decoration:none;color:inherit;}
   input,button,select,textarea{font:inherit;outline:0;border:0;border-radius:0;-webkit-tap-highlight-color:transparent;-moz-appearance:none;appearance:none;-webkit-appearance:none;background:transparent;line-height:normal;-webkit-writing-mode:horizontal-tb;resize:none;color:inherit;white-space:pre-wrap;word-wrap:break-word;-webkit-rtl-ordering:logical;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;/*flex-direction: column;*/}
   input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none !important;-moz-appearance:none !important;}
   input[type="file"]{position:absolute;top:0;left:0;bottom:0;right:0;opacity:0;}
   input[type="radio"],input[type="checkbox"]{font:caption;}
   .flex{display: -webkit-box;}
   .flexv{display: -webkit-box;/*! autoprefixer:off */ -webkit-box-orient: vertical;/* autoprefixer:on */}
   .flexitem{display: -webkit-box;/*! autoprefixer:off */ -webkit-box-flex: 1;/* autoprefixer:on */ -webkit-flex: 1; flex: 1;}
   .flexitemv{display: -webkit-box;/*! autoprefixer:off */ -webkit-box-flex: 1;/* autoprefixer:on */ -webkit-flex: 1; flex: 1; -webkit-box-orient: vertical;}
   .center{-webkit-box-align: center;/*! autoprefixer:off */ -webkit-box-pack: center;/* autoprefixer:on */}
   .centerv{-webkit-box-align: center;}
   .centerh{-webkit-box-pack: center;}
   .end{-webkit-box-align: end;/*! autoprefixer:off */ -webkit-box-pack: end;/* autoprefixer:on */}
   .endh{-webkit-box-pack: end;}
   .endv{-webkit-box-align: end;}
   .br{display: flex;flex-wrap:wrap;}  /*换行*/
   .fitimg{width: 100%; height: 100%;}
   .wrap{height:100%;}
   /*************** mint-ui css ************/
   .mint-actionsheet-button{color:#f00}
   .mint-msgbox-btn{font-size:1.05em}
   .mint-toast.error{background: rgba(255,0,0,0.6)}
   /**************** 动画 ******************/
   @keyframes progresses{0%{transform: rotate(0deg);}100%{transform: rotate(360deg);}}
   @-webkit-keyframes progresses{0%{-webkit-transform: rotate(0deg);}100%{-webkit-transform: rotate(360deg);}}
   @-webkit-keyframes imageLoad{0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);} 100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}
   @keyframes imageLoad {0% {-webkit-transform: rotate(0deg); transform: rotate(0deg);} 100% {-webkit-transform: rotate(360deg); transform: rotate(360deg);}}

   /***************************************/
   #wrap,#wrap>div{height: 100%;}
   #main{position: relative; overflow-x: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch;}
   #main::-webkit-scrollbar{display: none;}
   /****************** 加载 **********************/
   #more{width:100%;height: 50px;}
   #more i{width: 16px; height: 16px; display: inline-block; border-width: 1px; border-style: solid; border-color: #ccc #ccc #222 #222; border-radius: 50%; -webkit-animation: imageLoad 1s infinite linear; animation: imageLoad 1s infinite linear; vertical-align: -3px;}
   #more span{font-size: 0.9em; padding-left: 8px; color: #999;}
   /*没有相册提示*/
   #none{padding: 10px;}
   #none .icon{width: 80px; height: 80px; background: url(./assets/image/error.png) no-repeat; background-size: cover;}
   #none p{padding: 10px 0; color: #555;}
   #none .link{margin-top: 10px;}
   #none .link a{background: #fff; border: 1px solid #f5f5f5; padding: 10px; border-radius: 4px; font-size: 0.8em;}
   /***************** 头部 **********************/
   #header{height: 52px; background: #fbfbfb; border-bottom: 1px solid #eee;}
   #header .side{width: 60px;}
   #header input.side{border: none; padding: 0; background: none; color: #27e;}
   #header .side.icon{font-size: 1.5em; color: #ababab; text-indent: 5px;}
   #header .side span{color: #d5e7ff; font-size: 0.95em;}
   #header .delete{color: #f00;}
   #header .title{font-size: 1.05em; overflow: hidden;}
   #header .title i{padding: 0 4px;}
   #header .title input.searchkey{padding: 6px; font-size: 0.95em; border: 1px solid #eee; background: #ececec; border-radius: 5px;}
   #header .tabs a{position: relative; width: 90px; height: 52px;}
   #header .tabs a:after{content: ''; position: absolute; left: 30%; width: 40%; bottom: -1px; height: 2px; background: transparent;}
   #header .tabs a.current{color: #27e;}
   #header .tabs a.current:after{background: #27e;}
   #header .tabs a span{-webkit-line-clamp: 1; padding: 0 4px; height: 20px; line-height: 20px; overflow: hidden;}
   #header .search{margin: 8px 6px; border: 1px solid #eee; background: #ececec; border-radius: 5px; padding: 6px; font-size: 0.95em; color: #555;}
   /***************** 底部栏 **********************/
   #tabbar{position: relative; z-index: 8;  height: 50px; background: #fff; box-shadow: 0 -2px 4px rgba(0,0,0,0.05),0 -1px 0 rgba(0,0,0,0.05);}
   #tabbar a{width: 0%; border-left: 1px solid #eee; margin-left: -1px;}
   /*修改相册*/
   #album .form{padding: 10px;}
   #album .form .title{height: 40px; color: #666;}
   #album .form .text{border: 1px solid #f5f5f5; height: 20px; line-height: 20px; padding: 15px;}
   #album .form textarea.text{resize: none; height: 140px; font-size: 1em;}

   #album input,#album textarea{background:#fff}

   /*相册列表*/
   #album .albumlist li{position: relative; padding: 8px; background: #fff; border-bottom: 1px solid #f5f5f5;}
   #album .albumlist li img{width: 80px; height: 80px;}
   #album .albumlist li div{padding: 0 10px;}
   #album .albumlist li div h3{font-weight: normal; font-size: 1em; height: 20px; line-height: 20px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; padding-bottom: 6px;}
   #album .albumlist li div p{font-size: 0.8em; color: #888; height: 54px; line-height: 18px; overflow: hidden;}
   #album .albumlist li i{height: 80px; color: #888; font-size: 1.2em;}
   #album .albumlist li a{position: absolute; top: 0; left: 0; right: 40px; bottom: 0;}
   #album .photolist{padding: 4px;}
   #album .photolist li{position: relative;  float: left; width: 33.333%; padding-top: 33.333%; padding-bottom: 30px;}
   #album .photolist li a{position: absolute; top: 4px; left: 4px; right: 4px; bottom: 34px; background: #eee; overflow: hidden;}
   #album .photolist li.covers a:after{content: '封面'; position: absolute; top: 0; right: 0; height: 20px; line-height: 20px; font-size: 0.7em; color: #fff; background: rgba(0,0,0,0.5); padding: 0 5px;}
   #album .photolist li a img{position: absolute; top: 0; left: 0; display: block;object-fit: cover;}
   #album .photolist li label{position: absolute; bottom: 4px; left: 4px; right: 4px; height: 30px;}
   #album .photolist li label input{border: none; font-size: 0.8em; height: 20px; line-height: 20px; padding: 5px 4px;}
   #album .form{padding: 10px;}
   #album .form .title{height: 40px; color: #666;}
   #album .form .text{border: 1px solid #f5f5f5; height: 20px; line-height: 20px; padding: 15px;}
   #album .form textarea.text{resize: none; height: 140px; font-size: 1em;}
   /*相册底部上传*/
   #tools{position: relative; background: #fff; height: 50px; border-top: 1px solid #ddd; overflow: hidden;}
   #tools a{border-left: 1px solid #eee; margin-left: -1px;}

   /*主题*/
   #skinlist{position: relative;}
   #skinlist .lists{padding: 2px;}
   #skinlist .lists li{position: relative; width: 50%; padding-top: 80%; margin-bottom: 20px;}
   #skinlist .lists li a{position: absolute; top: 2px; left: 2px; right: 2px; bottom: 2px; background: #eee;}
   #skinlist .lists li p{position: absolute; left: 2px; right: 2px; bottom: -20px; height: 20px; font-size: 0.95em; color: #555; -webkit-line-clamp: 1;}
   #skin .title{height: 60px; padding: 10px;}
   #skin .title h3{font-weight: normal; font-size: 1.05em;}
   #skin .title p{font-size: 0.8em; color: #666; padding-top: 4px;}
   #skin .roll .swiper-slide{width: 180px; height: 300px; background: #fff; overflow: hidden; margin-right: 10px;}
   #skin .roll .swiper-slide:last-child{margin-right: 0;}
   #skin .swiper-pagination{padding-top: 10px;}
   #skin .swiper-pagination span{display: inline-block; width: 10px; height: 10px; background: #ccc; margin: 0 5px;}
   #skin .swiper-pagination span.swiper-pagination-bullet-active{background: #f40;}
   #choise{height: 52px; background: #fff; border-top: 1px solid #f2f2f2;}
   #choise .btn{margin: 0 20%; background: #27e; color: #fff; height: 40px; border-radius: 50px;}
   #choise .disabled{background: #eee;}
</style>
