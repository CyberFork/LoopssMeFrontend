import axios from 'axios'

function request(options) {
  return axios(options)
    .then(res => {
      return res
    })
    .catch(err => {
      // 对象构解赋值
      const {
        response: { status, statusText }
      } = err
      console.error(err)
      // notification.error({
      //   // message: status,
      //   // jsx语法
      //   // eslint-disable-next-line
      //   message: h => (
      //     <div>
      //       <span style="color: red">请求错误: {status}</span>: {options.url}
      //     </div>
      //   ),
      //   description: statusText
      // })
      // 阻止进入then流程
      return Promise.reject(err)
    })
}

export default request
