/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/device-alert',
    component: () => import('@/views/device-alert/device-alert')
  },
  {
    path: '/device-register-info',
    component: () => import('@/views/device-register-info/device-register-info')
  },
  {
    path: '/add-select',
    component: () => import('@/views/add-select/add-select')
  },
  {
    path: '/add-code',
    component: () => import('@/views/add-code/add-code')
  },
  {
    path: '/fy-check',
    component: () => import('@/views/fy-check/fy-check')
  },
  {
    path: '/fy-check-search',
    component: () => import('@/views/fy-check-search/fy-check-search')
  },
  {
    path: '/fy-check-res',
    component: () => import('@/views/fy-check-res/fy-check-res')
  }, {
    path: '/check-table',
    component: () => import('@/views/check-table/check-table')
  }, {
    path: '/check-table-report',
    component: () => import('@/views/check-table-report/check-table-report')
  }, {
    path: '/refresh',
    component: () => import('@/views/refresh/refresh')
  },{
    path: '/signature',
    component: () => import('@/views/signature/signature')
  },
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false, requireAuth: true }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/index'),
        meta: { title: '我的', keepAlive: false }
      }
    ]
  }
]
