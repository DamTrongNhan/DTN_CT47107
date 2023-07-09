import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/src/sweetalert2.scss';
import {
  publicRoutes,
  privateRoutes,
  privateRoutesAdminSmallHolder,
} from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import AdminLayout from '~/layouts/AdminLayout';
import { useAppSelector } from '~/app/hooks';

function App() {
  const { user } = useAppSelector((state) => state.auth);

  const isAdmin = user?.isAdmin;
  const isAdminWebsite = user?.isAdminWebsite;
  return (
    <>
      <div className="App">
        <Routes>
          {isAdmin
            ? isAdminWebsite
              ? privateRoutes.map((route, index) => {
                  let Page = route.component;
                  let Layout = AdminLayout;
                  if (!route.admin) {
                    Layout = DefaultLayout;
                  }
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })
              : privateRoutesAdminSmallHolder.map((route, index) => {
                  let Page = route.component;
                  let Layout = AdminLayout;
                  if (!route.admin) {
                    Layout = DefaultLayout;
                  }
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })
            : publicRoutes.map((route, index) => {
                let Page = route.component;
                let Layout = DefaultLayout;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
}

export default App;
