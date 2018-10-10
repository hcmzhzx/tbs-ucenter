import axios from 'axios'
import {API_URL} from './api'
import {Toast, Indicator} from 'mint-ui'
import router from '../../router'


//初始化axios
axios.defaults.baseURL=`${API_URL}`;

const instance = axios.create();
// 添加请求拦截器
instance.interceptors.request.use(config=>{
   //console.log(config);
   config.headers['Authorization'] = localStorage.getItem('access_token');

   return config;
});

// 添加响应拦截器
instance.interceptors.response.use(res=>{
   //console.log(res);
   if(typeof res.headers.authorization !== 'undefined'){
      localStorage.setItem('access_token',`Bearer ${res.data.meta.access_token}`);
   }
   return res.data;
},err=>{
   const errData = err.response;
   // console.log(err);
   //console.log(errData.data);
   if(errData.data.status_code == 401 ){ //"验证不通过"
      Indicator.close(); //结束动画
      Toast({ // 提示错误
         message:errData.data.message,
         iconClass: 'rd rd-guanbi',
         position:'center',
         className:'error',
         duration:900
      })
      setTimeout(()=>{router.push({name:'login'})},1000)
   }
   return Promise.reject(errData)
})

export default instance;
