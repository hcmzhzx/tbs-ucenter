import axios from '../../assets/js/axios'

const state = { //属性
   cashList: {arr: [], meta: {}},

   cashBank:[],

};

const getters = { //获取属性 使用(getters)
   getCashList: state => state.cashList
};

const mutations = { //改变属性 使用(commit)
   cashlogState(state, payload){
      for (let val of payload.data) {
         state.cashList.arr.push(val);
      }
      state.cashList.meta = payload.meta.pagination;
   }
};

const actions = { //应用 mutation 使用(dispath)
   //提现记录
   cashlogList({commit, state}){
      if (state.cashList.arr.length) return Promise.resolve(state.cashList.arr)
      return new Promise((res, rej) => {
         axios.get('extension/cashes').then(ret => {
            commit('cashlogState', ret)
         }).catch(err => rej(err))
      })
   },

   //分页
   cashlogPage({commit}, url){
      axios.get(url).then(ret => {
         commit('cashlogState', ret)
      })
   }
};

export default {state, getters, mutations, actions};
