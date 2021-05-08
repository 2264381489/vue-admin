import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/edit',
    name: '商品信息',
    meta: { title: '商品信息', icon: 'el-icon-goods' },
    children: [{
      path: 'edit',
      name: 'GoodsEdit',
      component: () => import('@/views/Goods/goodsEdit'),
      meta: { title: '商品修改', icon: 'el-icon-goods' }
    }]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/edit',
    name: '账号管理',
    meta: { title: '账号管理', icon: 'el-icon-s-custom' },
    children: [{
      path: 'edit',
      name: 'accountEdit',
      component: () => import('@/views/Account'),
      meta: { title: '账号修改', icon: 'el-icon-s-custom' }
    }]
  },
  {
    path: '/swipper',
    component: Layout,
    redirect: '/swipper/edit',
    name: '轮播图管理',
    meta: { title: '轮播图管理', icon: 'el-icon-film' },
    children: [{
      path: 'edit',
      name: 'swipperEdit',
      component: () => import('@/views/Swipper/Swipper'),
      meta: { title: '账号修改', icon: 'el-icon-data-board' }
    }]
  },
  {
    path: '/hot',
    component: Layout,
    redirect: '/hot/edit',
    name: '热销商品配置',
    meta: { title: '热销商品配置', icon: 'el-icon-film' },
    children: [{
      path: 'edit',
      name: 'hot',
      component: () => import('@/views/index/IndexConfig'),
      meta: { title: '热销商品配置', icon: 'el-icon-sold-out' }
    }]
  },
  {
    path: '/new',
    component: Layout,
    redirect: '/new/edit',
    name: '新商品配置',
    meta: { title: '新商品配置', icon: 'el-icon-film' },
    children: [{
      path: 'edit',
      name: 'new',
      component: () => import('@/views/index/IndexConfig'),
      meta: { title: '新商品配置', icon: 'el-icon-sell' }
    }]
  },
  {
    path: '/recommend',
    component: Layout,
    redirect: '/recommend/edit',
    name: '推荐商品配置',
    meta: { title: '推荐商品配置', icon: 'el-icon-film' },
    children: [{
      path: 'edit',
      name: 'recommend',
      component: () => import('@/views/index/IndexConfig'),
      meta: { title: '推荐商品配置', icon: 'el-icon-shopping-bag-1' }
    }]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
