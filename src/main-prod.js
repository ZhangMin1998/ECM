import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
//import ElementUI from 'element-ui'
//import './plugins/element.js'
//import 'element-ui/lib/theme-chalk/index.css';

//导入字体图标
import './assets/fonts/iconfont.css'
//导入全局样式表
import './assets/css/global.css'

import TreeTable from 'vue-table-with-tree-grid'

//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'


//导入NProgress 包对应的js和css
import NProgress from 'nprogress'



import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
    //在request设置拦截器，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
        NProgress.start()
        console.log(config);
        //需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
        config.headers.Authorization = window.sessionStorage.getItem('token')
            //在最后必须return config
        return config
    })
    //在response拦截器中， 隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
    NProgress.done()
    return config
})

Vue.prototype.$http = axios


Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
    //将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor, /* { default global options } */ )

Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal) //根据给定的时间得到一个时间对象

    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0') //先变成字符串 再加0  （长度为2，不足补0）
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}-${ss}`
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')