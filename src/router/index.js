import Vue from 'vue'
import Router from 'vue-router'
import pass from '@/components/login/pass'
import login from '@/components/login/login'
import register from '@/components/login/register'
import forget from '@/components/login/forget'
import user from '@/components/user/user'
import ucGoods from '@/components/goods/uc_goods'
import detail from '@/components/goods/detail'
import general from '@/components/expand/general' //推广普通
import record from '@/components/expand/record' //推广普通
import dealer from '@/components/expand/dealer'
import cashlog from '@/components/expand/cashlog'
import cash from '@/components/expand/cash'

import contact from '@/components/msg/contact'
import details from '@/components/msg/details'

import albumAdmin from '@/components/phone/album-admin'
import albumAdd from '@/components/phone/album-add'
import albumEdit from '@/components/phone/album-edit'
import albumUpload from '@/components/phone/album-upload'
import albumDatail from '@/components/phone/album-datail'

import wechat from '@/components/wechat/wechat'
import info from '@/components/info/info'
import signature from '@/components/info/signature'
import qrcode from '@/components/info/qrcode'
import account from '@/components/info/account'

import payment from '@/components/payment/payment'

import ucskin from '@/components/skin/ucskin'
import ucDetail from '@/components/skin/detail'


Vue.use(Router)

export default new Router({
   routes: [
      {path: 'pass', name: 'pass', component: pass, redirect: '/login', children: [
         {path: '/login', name: 'login', component: login},
         {path: '/register', name: 'register', component: register},
         {path: '/forget', name: 'forget', component: forget}
      ]},
      {path: '/', name: 'user', component: user},
      {path: '/ucGoods', name: 'uc_goods', component: ucGoods},
      {path: '/detail/:id', name: 'detail', component: detail},
      {path: '/expand/general', name: 'general', component: general}, //推广普通
      {path: '/expand/dealer', name: 'dealer', component: dealer},  //推广经销商
      {path: '/expand/record', name: 'record', component: record},
      {path: '/expand/cashlog', name: 'cashlog', component: cashlog},
      {path: '/expand/cash', name: 'cash', component: cash},

      {path: '/msg/contact', name: 'contact', component: contact},
      {path: '/msg/details', name: 'details', component: details},
      {path: '/album/admin', name: 'album-admin', component: albumAdmin},
      {path: '/album/add', name: 'album-add', component: albumAdd},
      {path: '/album/edit', name: 'album-edit', component: albumEdit},
      {path: '/album/upload', name: 'album-upload', component: albumUpload},
      {path: '/album/datail', name: 'album-datail', component: albumDatail},

      {path: '/wechat', name: 'wechat', component: wechat},
      {path: '/info', name: 'info', component: info},
      {path: '/info/signature', name: 'signature', component: signature},
      {path: '/info/qrcode', name: 'qrcode', component: qrcode},
      {path: '/account', name: 'account', component: account},
      {path: '/payment', name: 'payment', component: payment},

      {path: '/ucskin', name: 'uc_skin', component: ucskin},
      {path: '/ucskin/detail', name: 'ucDetail', component: ucDetail},



      {path: '*', redirect: '/'}
   ],
   //mode: 'history',
   scrollBehavior(to, from, ition){
      //return {selector: '.btn'} 选择器定位到该地方
      if (ition) {  // 记忆上一个页面的离开时的位子(需要浏览器回退)
         return ition
      } else {
         return {x: 0, y: 0}
      }
   }
})
