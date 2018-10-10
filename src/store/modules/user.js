import axios from '../../assets/js/axios'

const state = {
   userInfo:{},
   service:{}
}

const getters = {  //获取属性的状态  使用(getters)
   getuserInfo:state => state.userInfo
}

const mutations ={  //改变属性的状态 使用(commit)
   userState(state,info){
      state.userInfo = {...info}
   },

   partnerState(state,info){
      for(let[key,val] of Object.entries(info)){
         state[key] = val;
      }
   }
}

const actions = {  //应用 mutations  使用(dispatch)
   // 请求用户数据 (不能做缓存, 信息修改后不能立刻更新)
   userInfo({commit,state}){
      //if(Object.values(state.userInfo)[0]) return Promise.resolve(state.userInfo);
      return axios.get('user').then(user=>{
         //commit("userState", user);
         return user;
      })
   },
   // 请求站点信息
   partnerList({commit,state}){
      if(Object.keys(state.service).length) return Promise.resolve(state.service);
      return new Promise((res,rej)=>{
         axios.get('partner').then(partner=>{
            commit("partnerState",{service:partner});
            res(partner);
         }).catch(err=>rej(err));
      })
   }
}

export default {state,getters,mutations,actions}
