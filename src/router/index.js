import Vue from 'vue'
import VueRouter from 'vue-router'

// router懒加载
const SignIn = () => import('../views/mainsignin/MainSignIn.vue')

const System = () => import('../views/system/System.vue')
// home
const Home = () => import('../views/system/children/home/Home.vue')
// datamanagement
const UserList = () => import('../views/system/children/datamanagement/UserList.vue')
const MerchantList = () => import('../views/system/children/datamanagement/MerchantList.vue')
const FoodList = () => import('../views/system/children/datamanagement/FoodList.vue')
const OrderList = () => import('../views/system/children/datamanagement/OrderList.vue')
const AdminList = () => import('../views/system/children/datamanagement/AdminList.vue')
// addshop
const AddShop = () => import('../views/system/children/adddata/AddShop.vue')
const AddingGoods = ()=>import('../views/system/children/adddata/AddingGoods.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/signin'
  },
  {
    path: '/signin',
    component: SignIn
  },
  {
    path: '/system',
    component: System,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      // home
      {
        path: '/home',
        component: Home,
        meta: []
      },
      // datamanagement
      {
        path: '/userlist',
        component: UserList,
        meta: ['数据管理', '用户列表']
      },
      {
        path: '/merchantlist',
        component: MerchantList,
        meta: ['数据管理', '商家列表']
      },
      {
        path: '/foodlist',
        component: FoodList,
        meta: ['数据管理', '食品列表']
      },
      {
        path: '/orderlist',
        component: OrderList,
        meta: ['数据管理', '订单列表']
      },
      {
        path: '/adminlist',
        component: AdminList,
        meta: ['数据管理', '管理员列表']
      },
      // addData
      {
        path: '/addshop',
        component: AddShop,
        meta: ['添加数据', '添加商铺']
      },
      {
        path: '/addinggoods',
        component: AddingGoods,
        meta: ['添加数据', '添加商品']
      }
    ]
  }
]

// 防止路由冗余
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
