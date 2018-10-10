/**
 * 频率控制 返回函数连续调用时
 * @param method {function}  请求关联函数，实际应用需要调用的函数
 * @param duration  {number} 延迟时间，单位毫秒
 */
const _throttle = (method, duration) => {
   var begin = new Date();
   return function () {
      var current = new Date();
      if (current - begin >= duration) {
         method.apply(this, arguments);
         begin = current;
      }
   }
}

const HTMLDecode = (text) => {
   var temp = document.createElement("div");
   temp.innerHTML = text;
   var output = temp.innerText || temp.textContent;
   temp = null;
   return output;
}

export default {_throttle, HTMLDecode}
