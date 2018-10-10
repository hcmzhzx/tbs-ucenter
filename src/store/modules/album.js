import axios from '../../assets/js/axios'

const state = {
   albumlist: [],
   allmetalist:{}
};

const getters = {  //获取属性的状态  使用(getters)
   getalbumlist:state => state.albumlist,
   getAlbumMeta:state => state.allmetalist
};

const mutations = {  //改变属性的状态 使用(commit)
   //获取列表
   aboutAlbumState(state,payload){
      for(let val of payload.data){
         state.albumlist.push(val);
      }
      state.allmetalist = payload.meta.pagination;
   },
   //添加
   addAlbumState(state,payload){
      for(let val of payload){
         state.albumlist.unshift(val);
      }
   },
   //修改
   albumAmend(state,data){
      for(let [key,val] of state.albumlist.entries()){
         if(val.id == data.id){
            state.albumlist.splice(key,1,data)
         }
      }
   },
   //删除
   albumDel(state,id){
      state.albumlist = state.albumlist.filter((item)=>{
         return item.id != id
      })
   }
};

const actions = {  //应用 mutations  使用(dispatch)
   //获取列表
   albumList({commit,state}){
      if(state.albumlist.length) return Promise.resolve(state.albumlist);
      return new Promise((res,rej)=>{
         axios.get('album').then(ret=>{
            commit('aboutAlbumState',ret);
         }).catch(err=>rej(err));
      })
   },
   //添加列表
   albumAdd_list({commit},data){
      return new Promise((res,rej)=>{
         axios.post('album',data).then(ret=>{
            console.log(ret);
            commit('addAlbumState',ret);
         }).catch(err=>rej(err));
      })
   },
   //分页
   albumPage({commit},URL){
      return new Promise((res,rej)=>{
         axios.get(URL).then(ret=>{
            commit("aboutAlbumState",ret);
         }).catch(err=>rej(err));
      })
   }
};

export default {state, getters, mutations, actions};
