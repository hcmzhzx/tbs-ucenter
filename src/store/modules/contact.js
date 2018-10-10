import axios from '../../assets/js/axios'

const state = { //属性
   allMsg:{arr:[],meta:{}},
   readMgs:{arr:[],meta:{}},
   unreadMgs:{arr:[],meta:{}}

};

const getters = { //获取属性 使用(getters)
   getAllMsg:state =>state.allMsg,
   getReadMgs:state =>state.readMgs,
   getUnreadMgs:state =>state.unreadMgs,

};

const mutations = { //改变属性 使用(commit)
   msgState(state,data){
      let arr = data.arr
      if(data.type == 'read'){
         for(let val of arr.data){
            state.readMgs.arr.push(val);
         }
         state.readMgs.meta = data.arr.meta.pagination
      } else if(data.type == 'unread'){
         for(let val of arr.data){
            state.unreadMgs.arr.push(val);
         }
         state.unreadMgs.meta = data.arr.meta.pagination
      } else {
         for(let val of arr.data){
            state.allMsg.arr.push(val);
         }
         state.allMsg.meta = data.arr.meta.pagination
      }
   }
};

const actions = { //应用 mutation 使用(dispath)
   //全部
   allmsgData({commit,state},type){
      if(state.allMsg.arr.length) return Promise.resolve(state.allMsg.arr)
      return new Promise((res,rej)=>{
         axios.get('contact').then(ret=>{
            res(ret.data);
            commit('msgState',{arr:ret, type:type});
         }).catch(err=>rej(err));
      })
   },
   //已读
   readMgsData({commit,state},type){
      if(state.readMgs.arr.length) return Promise.resolve(state.readMgs.arr)
      return new Promise((res,rej)=>{
         axios.get('contact?state=1').then(ret=>{
            res(ret.data);
            commit('msgState',{arr:ret, type:type});
         }).catch(err=>rej(err));
      })
   },
   //未读
   unreadMgsData({commit,state},type){
      if(state.unreadMgs.arr.length) return Promise.resolve(state.unreadMgs.arr)
      return new Promise((res,rej)=>{
         axios.get('contact?state=2').then(ret=>{
            res(ret.data);
            commit('msgState',{arr:ret, type:type});
         }).catch(err=>rej(err));
      })
   },
   //分页
   msgPage({commit},data){
      return new Promise((res,rej)=>{
         axios.get(data.URL).then(ret=>{
            commit("msgState",{arr:ret, type:data});
         }).catch(err=>rej(err));
      })
   }
};

export default {state, getters, mutations, actions};
