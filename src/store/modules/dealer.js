import axios from '../../assets/js/axios'

const state = { //属性
   dayTotal:[],
   allTotal:[],

   dayPerson:{},
   allPerson:{}
};

const getters = { //获取属性 使用(getters)

};

const mutations = { //改变属性 使用(commit)
   dayState(state,payload){
      for(let[key,val] of Object.entries(payload)){
         state[key] = val;
      }
   },
   allState(state,payload){
      for(let[key,val] of Object.entries(payload)){
         state[key] = val;
      }
   },
   dayPersonstate(state,payload){
      for(let [key,val] of Object.entries(payload)){
         state[key] = val;
      }
   },
   allPersonstate(state,payload){
      for(let [key,val] of Object.entries(payload)){
         state[key] = val;
      }
   }
};

const actions = { //应用 mutation 使用(dispath)
   //今日佣金
   yjToday({commit,state}){
      if(state.dayTotal.length) return Promise.resolve(state.dayTotal);
      return new Promise((res,rej)=>{
         axios.get('extension/reward/dealer?type=today').then(ret=>{
            commit('dayState',{dayTotal:ret});
            res(ret);
         }).catch(err=>rej(err));
      })
   },
   //全部佣金
   yjAll({commit,state}){
      if(state.allTotal.length) return Promise.resolve(state.allTotal);
      return new Promise((res,rej)=>{
         axios.get('extension/reward/dealer?type=all').then(ret=>{
            commit('allState',{allTotal:ret});
            res(ret);
         }).catch(err=>rej(err));
      })
   },
   //今日推广人数
   expandDay({commit,state}){
      if(Object.keys(state.dayPerson).length) return Promise.resolve(state.dayPerson);
      return new Promise((res,rej)=>{
         axios.get('extension/users?type=today').then(ret=>{
            commit('dayPersonstate',{dayPerson:ret});
            res(ret);
         }).catch(err=>rej(err));
      })
   },
   //累计推广人数
   expandAll({commit,state}){
      if(Object.keys(state.allPerson).length) return Promise.resolve(state.allPerson);
      return new Promise((res,rej)=>{
         axios.get('extension/users?type=all').then(ret=>{
            commit('allPersonstate',{allPerson:ret});
            res(ret);
         }).catch(err=>rej(err));
      })
   },
};

export default {state, getters, mutations, actions};
