import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Customer/HomeView.vue'
import ProductDetailPage from '../views/Customer/ProductDetail.vue'
import CartPage from '../views/Customer/CartPage.vue';
import OrderPage from '../views/Customer/Orders.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products/:productid',
    name: 'ProductDetail',
    component: ProductDetailPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage 
  },
  {
    path: '/orderpage',
    name: 'OrderPage',
    component: OrderPage 
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin/IndexView.vue'),
    children: [
      {
        path: 'product',
        component: () => import('../views/Admin/SanPham.vue'),
        props: true
      },
      {
        path: 'users',
        component: () => import('../views/Admin/UserView.vue'),
        props: true
      },
      {
        path: 'categories',
        component: () => import('../views/Admin/CategoriesView.vue'),
        props: true
      },
      {
        path: 'storechains',
        component: () => import('../views/Admin/StorechainsView.vue'),
        props: true
      },
      {
        path: 'staffs',
        component: () => import('../views/Admin/StaffsView.vue'),
        props: true
      },
      {
        path: 'orders',
        component: () => import('../views/Admin/OrdersView.vue'),
        props: true
      },
      {
        path: 'orderdetails',
        component: () => import('../views/Admin/OrderdetailsView.vue'),
        props: true
      },
    ]
  },
  {
    path: '/dangnhap',
    name: 'DangNhap',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin/DangNhap.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
