//config
import config from '~/config';

//Pages

//Guest
import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Village from '~/pages/Village';
import Product from '~/pages/Product';
import ProductDetail from '~/pages/Product/ProductDetail';
import Introduce from '~/pages/Introduce';
import Contact from '~/pages/Contact';
import DetailVillage from '~/pages/Village/components/DetailVillage';
import DetailSmallHolder from '~/pages/DetailSmallHolder';

//Admin
import AdminMail from '~/pages/Admin/Mail';
import AdminOrders from '~/pages/Admin/Orders';
import AdminVillage from '~/pages/Admin/Village';
import AdminVillageCreate from '~/pages/Admin/Village/components/VillageCreate';
import AdminDetailVillageDetailEdit from '~/pages/Admin/Village/components/VillageDetailEdit';
import AdminVillageSmallHolder from '~/pages/Admin/Village/components/SmallHolder';
import AdminVillageSmallHolderProduct from '~/pages/Admin/Village/components/Product';
import AdminUser from '~/pages/Admin/User';
import AdminUserDetail from '~/pages/Admin/User/components/UserDetail';
import AdminUserCreate from '~/pages/Admin/User/components/UserCreate';
// import AdminVillageSmallHolderDetail from '~/pages/Admin/Village/components/SmallHolder';
// import AdminVillageSmallHolderProductDetail from '~/pages/Admin/Village/components/Product';

// AdminSmallHolder

import adminSmallHolderMainDetail from '~/pages/AdminSmallHolder/SmallHolder';
import adminSmallHolderProduct from '~/pages/AdminSmallHolder/Product';
import adminSmallHolderProductCreate from '~/pages/AdminSmallHolder/Product/components/ProductCreate';
import adminSmallHolderProductDetailEdit from '~/pages/AdminSmallHolder/Product/components/ProductDetailEdit';
import adminSmallHolderWorkers from '~/pages/AdminSmallHolder/Workers';
import adminSmallHolderWorkersCreate from '~/pages/AdminSmallHolder/Workers/components/WorkersCreate';
import adminSmallHolderWorkersDetailEdit from '~/pages/AdminSmallHolder/Workers/components/WorkersDetailEdit';
import adminSmallHolderUserDetail from '~/pages/AdminSmallHolder/User';
import adminSmallHolderMail from '~/pages/AdminSmallHolder/Mail';

const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.signin,
    component: SignIn,
  },
  {
    path: config.routes.signup,
    component: SignUp,
  },
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.villages,
    component: Village,
  },
  {
    path: config.routes.detailVillage,
    component: DetailVillage,
  },
  {
    path: config.routes.detailSmallHolder,
    component: DetailSmallHolder,
  },
  {
    path: config.routes.products,
    component: Product,
  },
  {
    path: config.routes.productDetail,
    component: ProductDetail,
  },
  {
    path: config.routes.introduce,
    component: Introduce,
  },
  {
    path: config.routes.contact,
    component: Contact,
  },
];

const privateRoutes = [
  {
    path: config.routesAdmin.adminMail,
    component: AdminMail,
    admin: true,
  },
  {
    path: config.routesAdmin.adminOrders,
    component: AdminOrders,
    admin: true,
  },
  {
    path: config.routesAdmin.adminVillage,
    component: AdminVillage,
    admin: true,
  },
  {
    path: config.routesAdmin.adminVillageCreate,
    component: AdminVillageCreate,
    admin: true,
  },
  {
    path: config.routesAdmin.adminVillageDetailEdit,
    component: AdminDetailVillageDetailEdit,
    admin: true,
  },
  {
    path: config.routesAdmin.adminVillageSmallHolder,
    component: AdminVillageSmallHolder,
    admin: true,
  },
  {
    path: config.routesAdmin.adminVillageSmallSmallHolderProduct,
    component: AdminVillageSmallHolderProduct,
    admin: true,
  },
  {
    path: config.routesAdmin.adminUser,
    component: AdminUser,
    admin: true,
  },
  {
    path: config.routesAdmin.adminUserDetail,
    component: AdminUserDetail,
    admin: true,
  },
  {
    path: config.routesAdmin.adminUserCreate,
    component: AdminUserCreate,
    admin: true,
  },
  ...publicRoutes.map((a) => ({ ...a, admin: false })),
];

const privateRoutesAdminSmallHolder = [
  {
    path: config.routesAdminSmallHolder.adminSmallHolderMainDetail,
    component: adminSmallHolderMainDetail,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderMail,
    component: adminSmallHolderMail,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderProduct,
    component: adminSmallHolderProduct,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderProductCreate,
    component: adminSmallHolderProductCreate,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderProductDetailEdit,
    component: adminSmallHolderProductDetailEdit,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderWorkers,
    component: adminSmallHolderWorkers,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderWorkersCreate,
    component: adminSmallHolderWorkersCreate,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderWorkersDetailEdit,
    component: adminSmallHolderWorkersDetailEdit,
    admin: true,
  },
  {
    path: config.routesAdminSmallHolder.adminSmallHolderUserDetail,
    component: adminSmallHolderUserDetail,
    admin: true,
  },
  ...publicRoutes.map((a) => ({ ...a, admin: false })),
];

export { publicRoutes, privateRoutes, privateRoutesAdminSmallHolder };
