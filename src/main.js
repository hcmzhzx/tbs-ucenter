import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
   el: '#app',
   router,
   store,
   components: {App},
   template: '<App/>'
})
