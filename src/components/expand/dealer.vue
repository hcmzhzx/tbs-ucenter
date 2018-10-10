<template>
   <div class="flexv">
      <my-header :content="text" :router="router"></my-header>
      <div id="main" class="flexitemv">
         <div id="pride">
            <div class="flexv center counter">
               <h4>今日收益</h4>
               <h2 class="flexitem">{{dayTotal}}</h2>
               <p>累计总收益</p>
               <h3>{{allTotal}}</h3>
            </div>
            <div class="chart">
               <div class="flex btns">
                  <a href="javascript:;" @click="tab('day')" :class="['flex','center',{current:!contact}]">今日</a>
                  <a href="javascript:;" @click="tab('all')" :class="['flex','center',{current:contact}]">累计</a>
               </div>
               <div class="flex charts">
                  <canvas id="charts" width="120" height="120"></canvas>
                  <div class="flexv center total"><h3>{{Person.total}}</h3><p>共计邀请</p></div>
                  <div class="flexitemv centerh desc">
                     <a href="javascript:;" class="flex centerv" @click="goUp(1)">
                        <em class="flex" style="background:#f60"></em>
                        <span>已开通会员</span>
                        <s class="flexitem endh" id="isvip">{{Person.member}}</s>
                        <i class="rd rd-qianjin"></i>
                     </a>
                     <a href="javascript:;" class="flex centerv" @click="goUp(0)">
                        <em class="flex" style="background:#ddd"></em>
                        <span>未开通会员</span>
                        <s class="flexitem endh" id="unvip">{{Person.un_member}}</s>
                        <i class="rd rd-qianjin"></i>
                     </a>
                  </div>
               </div>
            </div>
            <div class="flex cash">
               <a href="javascript:;" @click="$router.push({name:'cashlog'})" class="flexitem center">提现记录</a>
               <a href="javascript:;" @click="$router.push({name:'cash'})" class="flexitem center">申请提现</a>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import myHeader from '../header/header.vue'

   export default {
      components:{
         myHeader
      },
      created(){
         this.$store.dispatch('yjToday').then(day=>{ //今日(佣金)
            this.dayTotal = day.total;
         });
         this.$store.dispatch('yjAll').then(all=>{ //全部(佣金)
            this.allTotal = all.total;
         });
         this.$store.dispatch('expandDay').then(day=>{ //今日推广人数
            this.Person = {...day}
         })
      },
      data(){
         return{
            text:'推广系统',
            router:'user',
            contact:false,

            dayTotal:0,
            allTotal:0,

            Person:{}
         }
      },
      beforeUpdate(){
         let can = document.getElementById('charts'), ctx = can.getContext('2d');
         var cenX = can.width/2, cenY = can.height/2, rad = -Math.PI*2/100, deg = (100/this.Person.total) * this.Person.member;
         ctx.clearRect(0,0,can.width,can.height); //清空画布
         //绘制底色外圈
         ctx.save();
         ctx.beginPath();
         ctx.lineWidth = 14; //设置线宽
         ctx.strokeStyle = "#ddd"  //填充边线颜色
         ctx.arc(cenX, cenY, 52, 0, Math.PI*2, false); // true为反向画
         ctx.stroke();
         //绘制运动外圈
         ctx.save();
         ctx.beginPath();
         ctx.lineWidth = 14;
         ctx.strokeStyle = "#f60"
         ctx.arc(cenX, cenY, 52, -Math.PI/2, -Math.PI/2+ deg *rad, true);
         ctx.stroke();
      },
      methods:{
         tab(type){
            if(type == 'day'){
               this.contact = false;
               this.$store.dispatch('expandDay').then(day=>{ //今日推广人数
                  this.Person = {...day}
               })
            } else {
               this.contact = true;
               this.$store.dispatch('expandAll').then(all=>{ //累计推广人数
                  this.Person = {...all}
               })
            }
         },
         goUp(member){
            if(!this.contact){
               // 今日
               if(member){
                  this.$router.push({name:'record', query:{member:1, type:'today'}}) // 开通
               }else{
                  this.$router.push({name:'record', query:{member:0, type:'today'}})  // 未开通
               }
            } else {
               // 累计
               if(member){
                  this.$router.push({name:'record', query:{member:1, type:'all'}}) // 开通
               }else{
                  this.$router.push({name:'record', query:{member:0, type:'all'}})  // 未开通
               }
            }
         }
      }
   }
</script>

<style>
   #pride .counter{padding: 20px 10px; height: 160px; background: #fff; border-bottom: 1px solid #f5f5f5;}
   #pride .counter h2{font-size: 2em; font-weight: normal; padding-top: 6px;}
   #pride .counter h3{font-size: 1.3em; font-weight: normal;}
   #pride .counter h4{font-weight: normal; font-size: 1em;}
   #pride .counter p{font-size: 0.9em;}
   #pride .chart{padding: 20px 0;}
   #pride .chart .btns{padding-bottom: 10px;}
   #pride .chart .btns a{width: 70px; height: 32px; border-radius: 40px; border: 2px solid #eee; margin-left: 10px;}
   #pride .chart .btns a.current{border-color: #27e; color: #27e;}
   #pride .charts{height: 120px; padding: 10px; position: relative;}
   #pride .charts #charts{position: relative; width:120px;height:120px; z-index: 9;}
   #pride .total{position: absolute; width: 96px; height: 96px; top: 10px; left: 10px; border: 12px solid #eee; border-radius: 50%; z-index: 1;}
   #pride .total p{font-size: 0.9em; color: #666;}
   #pride .total h3{font-weight: normal; font-size: 1.3em;}
   #pride .charts .desc{padding-left: 8px;}
   #pride .charts .desc a{border-bottom: 1px solid #eee; height: 30px; padding: 5px;}
   #pride .charts .desc a em{width: 20px; height: 20px; background: #eee;}
   #pride .charts .desc a span{font-size: 0.9em; padding: 0 6px; vertical-align: 1px;}
   #pride .charts .desc a s{font-style: normal; text-decoration: none;}
   #pride .charts .desc a i{color: #ccc;}
   #pride .cash a{height: 46px; border-radius: 2px; margin: 10px; border: 1px solid #27e; border-radius: 2px; background: #27e; color: #fff;}
   #pride .cash a:first-child{background: none; color: #666;}
   #pride .lists li{position: relative; padding: 8px; border-bottom: 1px solid #eee;}
   #pride .lists .head{width: 50px; height: 50px; overflow: hidden; border-radius: 50%;}
   #pride .lists .info{padding-left: 10px;}
   #pride .lists .info div{height: 20px; padding-bottom: 10px;}
   #pride .lists .info div span{overflow: hidden; -webkit-line-clamp: 1; text-overflow: ellipsis; margin-right: 8px;}
   #pride .lists .info div em{font-size: 1.2em; color: #f00;}
   #pride .lists  i{padding-left: 2px; color: #888; font-size: 1.2em;}
   #pride .lists .info p{height: 20px;}
   #pride .lists .info p span{font-size: 0.75em; color: #666;}
</style>
