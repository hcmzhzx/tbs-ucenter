import axios from '../../assets/js/axios'

const state = { //属性
   recordOpen: {arr: [], meta: {}},
   recordUn_open: {arr: [], meta: {}},

};

const getters = { //获取属性 使用(getters)
   getrecordOpen:state => state.recordOpen,
   getrecordUn_open:state => state.recordUn_open
};

const mutations = { //改变属性 使用(commit)
   openState(state, data){  //开通
      for (let val of data.data) {
         state.recordOpen.arr.push(val)
      }
      state.recordOpen.meta = data.meta.pagination;
   },
   un_openState(state, data){  //未开通
      for (let val of data.data) {
         state.recordUn_open.arr.push(val)
      }
      state.recordUn_open.meta = data.meta.pagination;
   }
};

const actions = { //应用 mutation 使用(dispath)
   //开通
   recordOpen({commit, state}, type){
      if (state.recordOpen.arr.length) return Promise.resolve(state.recordOpen.arr);
      return new Promise((res, rej) => {
         axios.get(`extension/user_list?member=1&type=${type}`).then(ret => {
            commit('openState', ret);
         }).catch(err => rej(err));
      })
   },
   //未开通
   recordUn_open({commit, state}, type){
      if (state.recordUn_open.arr.length) return Promise.resolve(state.recordUn_open.arr);
      return new Promise((res, rej) => {
         axios.get(`extension/user_list?member=0&type=${type}`).then(ret => {
            commit('un_openState', ret);
         }).catch(err => rej(err));
      })
   },
   //分页
   recordPage({commit},data){
      axios.get(data.URL).then(ret=>{
         if(data.member == 1){
            commit('openState', ret);
         } else {
            commit('un_openState', ret);
         }
      })
   }
};

export default {state, getters, mutations, actions};
