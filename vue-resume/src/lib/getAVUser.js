/**
 * Created by zhangjiuyi on 2017/3/5.
 */

import AV from '../lib/leancloud'

console.log(90)


export default function(user){
  var {id, attributes:{username}} = user || AV.User.current() || { attributes:{} }
  return {id, username}
}
