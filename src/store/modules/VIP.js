import axios from '../../assets/js/axios'

const state = { //属性
   paymentList:[]
};

const getters = { //获取属性 使用(getters)

};

const mutations = { //改变属性 使用(commit)
   paymentState(state,payload){
      state.paymentList = payload
   }
};

const actions = { //应用 mutation 使用(dispath)
   paymentlist({commit,state}){
      if(state.paymentList.length) return Promise.resolve(state.paymentList);
      return new Promise((res,rej)=>{
         axios.get('payment').then(ret=>{
            commit('paymentState',ret.data)
            res(ret.data)
         }).catch(err=>rej(err))
      })
   }
};

export default {state, getters, mutations, actions};
