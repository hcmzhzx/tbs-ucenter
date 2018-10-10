class CheckForm{
   constructor(obj,error,callback){
      this.defaultRule = {
         "*": /^[\w\W]+$/,
         "*6-16": /^[\w\W]{6,16}$/,
         "n": /^\d+$/,
         "m": /^1[3456789]\d{9}$/,
         "e": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
         "qq": /^\d[1-9][0-9]{4,14}/,
         "cname": /^[\u4e00-\u9fa5]{2,4}$/,
         "idcard": /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
         "card": /^\d{13,21}$/,
         "pwd": /^[^\s]{6,16}$/,
         "domain": /^[^\s]{3,6}$/,
         "code": /^\d{6}/
      };
      var inputs = obj.target.querySelectorAll('input[type=text],input[type=number],input[type=tel],input[type=password],textarea,select');
      var posts = {}
      for(var i = 0;i < inputs.length; i++){
         var ele = inputs[i]
         var value = ele.value,name = ele.getAttribute('name')
         var rule = ele.getAttribute('data-rule'),ruleReg = this.defaultRule[rule], errmsg = ele.getAttribute('data-errmsg');
         if(!ruleReg.test(value)){
            ele.focus();
            return error(errmsg)
         }else{
            posts[name] = value
         }
      }
      return callback(posts)
   }
}

//短信验证码定时器 data里面必须设置(文字为 code; class为 msg)
export default function smsTimer(the,txt,interval){
   let _this = the;
   _this.code = `${txt}(${interval}s)`;
   interval--;
   let time = setInterval(() => {
      if (interval === 0) {
         _this.contact = false;
         _this.code = txt;
         clearInterval(time);
      } else {
         _this.code = `${txt}(${interval--}s)`;
      }
   },1000);
}

export {CheckForm};
