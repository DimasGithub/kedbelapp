import Halamanutama from 'layouts/MainLayout.vue'
import Index from 'pages/Index.vue'
import Produk from 'pages/Produk.vue'
import Detailproduk from 'pages/detailproduk.vue'
import Tentang from 'pages/Tentang.vue'
import Panduan from 'pages/Panduan.vue'
const routes = [
  {
    path: '/',
    component: Halamanutama,
    children: [
      { path: '', 
      component: Index,
      },
     {
       path: '/produk',
       component: Produk
     },
     {
       path: "/produk/:id", 
       props:true,
       component : Detailproduk
     },
     {
       path : "/tentang",
       component : Tentang
     },
     {
       path : "/panduan",
       component : Panduan
     }
    ]
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
