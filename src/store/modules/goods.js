import axios from '../../assets/js/axios'

function swapItems(arr, index1, index2) {
   arr[index1] = arr.splice(index2, 1, arr[index1])[0];
}

const state = {
   goodsAll: {arr: [], meta: {}},
   goodsHot: {arr: [], meta: {}},
   goodsRecommend: {arr: [], meta: {}},
   goodsCancel: {arr: [], meta: {}},

};

const getters = { //获取属性  使用(getters)
   getgoodsAll: state => state.goodsAll,
   getgoodsHot: state => state.goodsHot,
   getgoodsRecommend: state => state.goodsRecommend,
   getgoodsCancel: state => state.goodsCancel

};

const mutations = { //改变属性的状态 使用(commit)
   goodsState(state, datas){
      let data = datas.arr;
      if (datas.type == 'all') {
         for (let val of data.data) {
            state.goodsAll.arr.push(val);
            state.goodsAll.meta = data.meta.pagination
         }
      } else if (datas.type == 'hot') {
         for (let val of data.data) {
            state.goodsHot.arr.push(val);
            state.goodsHot.meta = data.meta.pagination
         }
      } else if (datas.type == 'recommend') {
         for (let val of data.data) {
            state.goodsRecommend.arr.push(val);
            state.goodsRecommend.meta = data.meta.pagination
         }
      } else if (datas.type == 'cancel') {
         for (let val of data.data) {
            state.goodsCancel.arr.push(val);
            state.goodsCancel.meta = data.meta.pagination
         }
      }
   },
   // 上移
   upgoodsAll(state, index){
      swapItems(state.goodsAll.arr, index, index - 1)
   },
   upgoodsHot(state, index){
      swapItems(state.goodsHot.arr, index, index - 1)
   },
   upgoodsRec(state, index){
      swapItems(state.goodsRecommend.arr, index, index - 1)
   },
   //下移
   downgoodsAll(state, index){
      swapItems(state.goodsAll.arr, index, index + 1)
   },
   downgoodsHot(state, index){
      swapItems(state.goodsHot.arr, index, index + 1)
   },
   downgoodsRec(state, index){
      swapItems(state.goodsRecommend.arr, index, index + 1)
   },

   //设为推荐
   setRec(state, id){
      let bool = state.goodsRecommend.arr.some((item) => {
         return item.id == id
      });
      if (!bool) {
         let rec = state.goodsAll.arr.filter((item) => {
            return item.id == id
         });
         state.goodsRecommend.arr.unshift(...rec)
      }
   },
   //设为热门
   setHot(state, id){
      let bool = state.goodsHot.arr.some((item) => {
         return item.id == id
      });
      if (!bool) {
         let hot = state.goodsAll.arr.filter((item) => {
            return item.id == id
         });
         state.goodsHot.arr.unshift(...hot)
      }
   },
   //下架商品
   downGoods(state, id){
      let can = state.goodsAll.arr.filter((item) => {
         return item.id == id
      });
      state.goodsCancel.arr.unshift(...can);

      state.goodsAll.arr = state.goodsAll.arr.filter((item) => {
         return item.id != id
      });
      state.goodsHot.arr = state.goodsHot.arr.filter((item) => {
         return item.id != id
      });
      state.goodsRecommend.arr = state.goodsRecommend.arr.filter((item) => {
         return item.id != id
      })
   },
   //取消热门
   cancelHot(state, id){
      let hot = state.goodsHot.arr.filter((item) => {
         return item.id != id
      });
      state.goodsHot.arr = [] //先清空在添加需要的
      state.goodsHot.arr.unshift(...hot)
   },
   //取消推荐
   cancelRec(state, id){
      let rec = state.goodsRecommend.arr.filter((item) => {
         return item.id != id
      });
      state.goodsRecommend.arr = [] //先清空在添加需要的
      state.goodsRecommend.arr.unshift(...rec)
   },
   //上架
   upGoods(state, id){
      //先添加上架的商品
      let can = state.goodsCancel.arr.filter((item) => {
         return item.id == id
      });
      state.goodsAll.arr.unshift(...can);
      state.goodsHot.arr.unshift(...can);
      //再删除下架库里的该商品
      let canD = state.goodsCancel.arr.filter((item) => {
         return item.id != id
      });
      state.goodsCancel.arr = [];
      state.goodsCancel.arr.push(...canD)
   }
};

const actions = { //应用 mutations  使用(dispatch)
   // 请求商品数据
   goodsInfo({commit, state}, data){
      if (data.type == 'all') {
         if (state.goodsAll.arr.length) return Promise.resolve(state.goodsAll.arr)
      } else if (data.type == 'hot') {
         if (state.goodsHot.arr.length) return Promise.resolve(state.goodsHot.arr)
      } else if (data.type == 'recommend') {
         if (state.goodsRecommend.arr.length) return Promise.resolve(state.goodsRecommend.arr)
      } else if (data.type == 'cancel') {
         if (state.goodsCancel.arr.length) return Promise.resolve(state.goodsCancel.arr)
      }

      return axios.get(data.URL).then(ret => {
         commit("goodsState", {arr: ret, type: data.type});
         return ret;
      }).catch(err => err);
   },

   // 分页
   goodsPage({commit}, data){
      return axios.get(data.URL).then(ret => {
         commit("goodsState", {arr: ret, type: data.type});
         return ret;
      }).catch(err => err);
   }
};

export default {state, getters, mutations, actions};
