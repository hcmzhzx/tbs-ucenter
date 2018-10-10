<template>
   <div id="register">
      <form action="" method="post" class="form" onsubmit="return false;" @submit.prevent="sendForm">
         <div class="flex centerv row">
            <i class="flex center rd rd-account"></i>
            <input type="text" name="name" placeholder="您的真实姓名" class="flexitem text" v-model="form.name" data-rule="cname" data-errmsg="姓名格式错误">
         </div>
         <div class="flex centerv row">
            <i class="flex center rd rd-phone"></i>
            <input type="tel" name="phone" placeholder="您常用的手机号码" class="flexitem text" maxlength="11" v-model="form.phone" data-rule="m" data-errmsg="手机号码格式错误">
         </div>
         <div class="flex centerv row">
            <i class="flex center rd rd-password"></i>
            <input type="password" name="pwd" placeholder="设置登录密码" class="flexitem text" v-model="form.password" data-rule="pwd" data-errmsg="请设置正确登录密码">
         </div>
         <div class="flex centerv row">
            <i class="flex center rd rd-weixin"></i>
            <input type="text" name="wechat" placeholder="常用微信号" class="flexitem text" v-model="form.wechat" data-rule="*" data-errmsg="请填写常用微信号">
         </div>
         <div class="flexv center row sub">
            <a href="javascript:;" class="flex center deal" @click="agreenment=true">用户注册协议</a>
            <button type="submit" class="flex submit">同意协议并注册</button>
            <a href="javascript:;" @click="$router.go(-1)" class="flex back">返回上一页</a>
         </div>
      </form>

      <div id="agreenment" :class="['frame',{frameshow:agreenment === true}]">
         <div class="flex header">
            <a href="javascript:;" class="flex center side closeit" @click="agreenment=false">关闭</a>
            <span class="flexitemv center title">注册协议</span>
            <a href="javascript:;" class="flex center side"></a>
         </div>
         <div class="bodys">
            <div class="context">
               <p>事业网站会员用户电子协议</p>
               <p>甲方：义乌市萌米商贸有限公司</p>
               <p>乙方：事业网站会员</p>
               <p>甲乙双方本着互惠互利、发展共赢的原则，按照《中华人民共和国合同法》相关要求，经双方友好协商，达成如下协议：</p>
               <p>第一条 特别提示</p>
               <p>1、义乌市萌米商贸有限公司（以下简称本公司）特别提醒：用户在注册之前，请认真阅读《用户注册服务协议》（以下简称本协议），确保您充分理解本协议的各条款后选择接受或不接受本协议。除非您接受本协议所有条款，否则您无权使用本公司及其旗下网站提供的任何服务。您的注册、登录、使用、推广等行为将视为您已经详细阅读了本协议的内容，同意遵守本协议的约束，甚至不会再以不了解本协议内容x`作为您的抗辨事由。</p>
               <p>2、本公司有权在必要时对本协议进行修改与更新，协议条款一旦发生变动，将会在相关服务页面上提示变更内容，如果用户不同意本协议条款的变更，应立即停止使用本公司提供的服务。如用户在本协议变更后继续使用本公司的服务，即视作用户已完全同意变更后的协议。</p>
               <p>第二条 服务内容</p>
               <p>1、当您阅读并同意本协议、成功完成注册并支付费用后，即成为本公司的用户，本公司为您开通个人网站，提供二级域名，用户享有个人网站的使用权、管理权，可进行独立访问、对外宣传。</p>
               <p>2、本公司在旗下网站——事业网站会员平台为用户开通并制作的专属基础版个人网站，网站色调及款式参照网站上已开通的该品牌会员的个人网站制作。</p>
               <p>3、在服务期限内，本公司下列服务视为受用户授权：为用户提供更新网站产品信息、促销信息、新闻资讯等服务，并由本公司专业团队进行研发、运营、推广，进一步提高网站的访问量、知名度和美誉度。</p>
               <p>第三条 服务期限与费用</p>
               <p>1、本公司的服务是以收费方式提供的，服务期限按本协议第三条第二款规定执行。</p>
               <p>2、本公司按照用户所选择的服务期限，收取相应的服务费用；目前收费标准，以网站即时公布的服务费用为准。</p>
               <p>3、服务期限届满前，用户应主动与本公司续签协议；若用户在服务期届满之日仍未与本公司续签协议并缴纳相关的费用，则本公司有权冻结用户所注册使用的账号，届时用户注册登记的网店、微店等均无法使用；冻结后一个月用户仍未申请续期并缴纳相关费用的，则本公司有权注销用户所注册使用的账号，包括但不限于直接注销用户注册登记的网店、微店等 (本公司友情提示：服务期限届满前，用户如不续签本协议，则请在期满前将所需留存的信息及账户金额等妥善处理好)。</p>
               <p>4、本公司根据市场需求开发增值服务，并有权根据用户选择的增值服务，收取相应的增值服务费用。</p>
               <p>第四条 使用规则及管理</p>
               <p>1、用户在申请使用网络服务时，必须向本公司提供真实、准确的个人身份资料信息；用户注册后取得的权利不可转让，如果个人身份资料信息有变动，应当及时更新；因用户提供个人身份资料不真实、不准确引发的后果由用户承担。</p>
               <p>2、用户应为每一位顾客提供优质的产品和服务，不得销售任何假冒伪劣产品，不得恶性价格竞争；因产品瑕疵造成本公司宣传与用户提供产品不符之后果由用户承担。</p>
               <p>3、用户违反本协议第四条第一款、第二款规定的，本公司有权关闭用户网站，且不予退还服务费用。</p>
               <p>4、由于本公司提供的是网络服务，为用户开通个人网站，本公司已付出大量的工作，提供了相应的服务，因此，若用户在协议期限内解约，本公司将不再退还用户缴纳的服务费。</p>
               <p>5、开通个人网站的商家与其所从事的行业品牌公司都签订了相关协议，商家作为用户为拓展业务，委托本公司不定时地为其发送产品经销、业务推广、图片展示等信息（如商家拒绝该委托服务的，应当书面通知本公司）；信息发布后，如用户对委托发送的信息有异议（包括但不限于信息来源的合法性、是否获得权利人授权、是否构成侵权等），应当立即联系本公司客服予以删除，否则，凡因此涉及侵权或不正当竞争行为等，由用户承担责任。</p>
               <p>6、用户注册后，即表明该用户已自愿将其在任何时段发表的任何形式的信息内容（包括但不限于客户评价、各类文章、图片等），全部且不可撤销地转让给本公司，本公司对于用户提供的网站资料及信息内容，享有使用、复制、修订、改写、发布、翻译和展示其资料或制作其衍生作品的权利。</p>
               <p>7、用户应积极完善网站资料，积极推广网站，及时回复客户留言，提高个人网站的访问量。</p>
               <p>8、用户在服务期限内，独享与顾客之间交易所带来的全部利润，本公司不得向用户收取或扣取任何费用。</p>
               <p>9、用户享受事业网站会员所带来的广阔顾客资源，而不用承担本公司的推广费用。</p>
               <p>10、当当地顾客咨询商品及事业信息时，本公司免费为用户提供顾客推介服务。</p>
               <p>11、用户应自觉维护公平的市场竞争环境，不得为了个人利益恶意诋毁公司以及其他加盟商家。</p>
               <p>12、用户应自觉遵守相关法律法规，不得散布或传播谣言、有悖社会公德、危害行业发展的不良信息。</p>
               <p>13、本公司拥有网站整体的管理权，有权按照国家相关法律要求，对用户发布的违法、违规以及有悖社会道德的信息进行删除。</p>
               <p>14、用户应为每一位顾客提供优质的产品和服务，不得销售任何假冒伪劣产品，不得恶性价格竞争；因产品瑕疵造成本公司宣传与用户提供产品不符之后果由用户承担。</p>
               <p>15、在服务期限内，对于因电信系统或网络故障、计算机病毒或故障以及不可抗力等非本公司原因产生的损失，用户明确该风险由其自己承担，本公司对用户不承担任何责任。</p>
               <p>16、用户违反本协议规定，损害第三方利益的，应当独立承担责任；给本公司遭受损失的，用户也应当予以赔偿。</p>
               <p>第五条 法律适用和管辖</p>
               <p>1、本协议之效力、解释、执行与争议解决均适用中华人民共和国大陆地区法律。</p>
               <p>2、本公司与用户之间发生任何纠纷或争议，应当友好协商解决；协商不成形成诉讼，则由本公司住所地的人民法院管辖。</p>
               <p>第六条 其他</p>
               <p>1、本协议所有条款之标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>
               <p>2、本协议最终解释权归本公司所有。</p>
               <p>再次提示：当您点同意并注册则表示您已完全知悉、理解、接受本协议的全部内容。</p>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   import {Toast, Indicator} from 'mint-ui'
   import {CheckForm} from '../../assets/js/checkForm'

   export default{
      name: 'register',
      data(){
         return {
            agreenment: false,
            form: {
               name: '小胡',
               phone: '18307209731',
               password: '111111',
               wechat: '147258369'
            }
         }
      },
      methods: {
         sendForm: function (e) {
            new CheckForm(e, err => {
               Toast({ // 提示错误
                  message: err,
                  iconClass: 'rd rd-guanbi',
                  position: 'center',
                  className: 'error',
                  duration: 800
               })
            }, posts => {
               //动画
               Indicator.open({
                  text: '正在注册',
                  spinnerType: 'snake'
               });
               this.$http.post('users', this.form).then(res => {
                  console.log(res);
                  localStorage.setItem('token', res.data.access_token);
                  Indicator.close(); //结束动画
                  Toast({
                     message: '注册成功',
                     iconClass: 'rd rd-selected',
                     duration: 800
                  });
                  this.$router.push({name: 'login'})
               }).catch(err => {
                  Indicator.close(); //结束动画
                  Toast({ // 提示错误
                     message: err.response.data.message,
                     iconClass: 'rd rd-guanbi',
                     position: 'center',
                     className: 'error',
                     duration: 800
                  })
               })
            })
         }
      }
   }
</script>

<style>
   /* 注册协议 */
   #agreenment .context{padding:10px}
   #agreenment .context p{line-height:24px;padding:5px 0;text-indent:20px}
   #agreenment.frame{position:fixed;top:0;left:0;width:100%;height:100%;transition:transform .2s linear;-webkit-transition:transform .2s linear;transform:translateX(100%);-webkit-transform:translateX(100%);background:#fff;z-index:9999}
   #agreenment.frameshow{transform:translateX(0);-webkit-transform:translateX(0)}
   #agreenment.frame .header{position:absolute;top:0;left:0;right:0;height:52px;border-bottom:1px solid #eee;line-height:52px;z-index:9}
   #agreenment.frame .header .side{position:absolute;top:0;left:0;color:#555;width:60px;padding:0 5px;text-align:center}
   #agreenment.frame .header .save{left:initial;right:0}
   #agreenment.frame .header .title{font-size:1.05em;text-align:center}
   #agreenment.frame .bodys{position:absolute;top:52px;left:0;right:0;bottom:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}
</style>
