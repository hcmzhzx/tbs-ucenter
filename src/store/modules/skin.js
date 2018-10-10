import axios from '../../assets/js/axios'

const state = { //属性
   skinList:[]
};

const getters = { //获取属性 使用(getters)

};

const mutations = { //改变属性 使用(commit)
   skinState(state,payload){
      state.skinList = payload.data
   }
};

const actions = { //应用 mutation 使用(dispath)
   //获取主题列表
   skinList({commit,state}){
      if(state.skinList.length) return Promise.resolve((state.skinList))
      return axios.get('theme').then(res=>{
         commit('skinState',res);
         return res.data;
      })
   }
};

export default {state, getters, mutations, actions};
