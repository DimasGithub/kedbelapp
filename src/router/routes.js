import Halamanutama from 'layouts/MainLayout.vue'
import Index from 'pages/Index.vue'
import Produk from 'pages/Produk.vue'
import Detailproduk from 'pages/detailproduk.vue'
import Tentang from 'pages/Tentang.vue'
import Panduan from 'pages/Panduan.vue'
import Login  from 'pages/login.vue'
import Indexadmin from 'pages/Indexadmin.vue'
import AdminDetailProduk from 'pages/Admindetailproduk.vue'
import Addproduct from 'pages/AddProduct.vue'
import Editproduct from 'pages/Editpage.vue'
import Contoh from 'pages/contoh.vue'
import Editcontoh from 'pages/editcontoh.vue'
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
     },
     {
       path : "/login",
       component : Login
     },
     {
       path : "/indexadmin",
       component : Indexadmin
     },
     {
       path: "/indexadmin/produk/:id",
       props:true,
       component: AdminDetailProduk,
     },
     {
       path:"/indexadmin/tambah/",
       component : Addproduct,
     },
     {
       path:"/indexadmin/edit/:id",
       props:true,
       component: Editproduct,
     },
     {
      path: "/contoh",
      component: Contoh,
     },
     {
      path: "/editcontoh/:id",
      props: true,
      component: Editcontoh,
     }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
