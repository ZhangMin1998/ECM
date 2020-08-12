import Vue from 'vue';
import VueRouter from 'vue-router';
// import Login from '../components/Login.vue'
const Login = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ '../components/Login.vue')
    // import Home from '../components/Home.vue'
const Home = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ '../components/Home.vue')
    // import Welcome from '../components/Welcome.vue'
const Welcome = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ '../components/Welcome.vue')

// import Users from '../components/user/users.vue'
const Users = () =>
    import ( /* webpackChunkName: "Users_Rights_Roles" */ '../components/user/users.vue')
    // import Rights from '../components/power/Rights.vue'
const Rights = () =>
    import ( /* webpackChunkName: "Users_Rights_Roles" */ '../components/power/Rights.vue')
    // import Roles from '../components/power/Roles.vue'
const Roles = () =>
    import ( /* webpackChunkName: "Users_Rights_Roles" */ '../components/power/Roles.vue')

// import Cate from '../components/goods/Cate.vue'
const Cate = () =>
    import ( /* webpackChunkName: "Cate_Params" */ '../components/goods/Cate.vue')
    // import Params from '../components/goods/Params.vue'
const Params = () =>
    import ( /* webpackChunkName: "Cate_Params" */ '../components/goods/Params.vue')

// import GoodsList from '../components/goods/List.vue'
const GoodsList = () =>
    import ( /* webpackChunkName: "GoodsList_Add" */ '../components/goods/List.vue')
    // import Add from '../components/goods/Add.vue'
const Add = () =>
    import ( /* webpackChunkName: "GoodsList_Add" */ '../components/goods/Add.vue')

// import Order from '../components/order/Order.vue'
const Order = () =>
    import ( /* webpackChunkName: "Order_Report" */ '../components/order/Order.vue')
    // import Report from '../components/report/Report.vue'
const Report = () =>
    import ( /* webpackChunkName: "Order_Report" */ '../components/report/Report.vue')

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/users', component: Users },
            { path: '/rights', component: Rights },
            { path: '/roles', component: Roles },
            { path: '/categories', component: Cate },
            { path: '/params', component: Params },
            { path: '/goods', component: GoodsList },
            { path: '/goods/add', component: Add },
            { path: '/orders', component: Order },
            { path: '/reports', component: Report }
        ]
    }]
});

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    //to 将要访问的路径
    //from代表从哪个路径跳转过来
    //next 是一个函数，表示放行
    // next() 放行   next('/login') 强制跳转

    //如果有用户访问的登录页，直接放行
    if (to.path === '/login') return next();
    //获取token
    const tokenStr = window.sessionStorage.getItem('token');
    //如果没有token，强制跳转到登录页
    if (!tokenStr) return next('/login')
    next()
});

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


export default router