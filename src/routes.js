import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import PageLayout from 'shared/components/Layout/Page';

const NotFound = loadable(() => import('pages/NotFound'));
const Login = loadable(() => import('pages/Login'));
const Signup = loadable(() => import('pages/Signup'));
const ForgotPassword = loadable(() => import('pages/ForgotPassword'));
const ResetPassword = loadable(() => import('pages/ResetPassword'));

const User = loadable(() => import('pages/Admin/User/containers/UserPage'));
const Dashboard = loadable(() => import('pages/Admin/Dashboard/containers/Dashboard'));
const AdminCategory = loadable(() => import('pages/Admin/Category/containers/Category'));
const adminRoutes = [
  {
    key: 'admin-dashboard',
    component: Dashboard,
    path: '/admin',
    exact: true,
    pageProps: {
      isAdmin: true,
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  {
    key: 'admin-user',
    component: User,
    path: '/admin/users',
    exact: true,
    pageProps: {
      isAdmin: true,
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  {
    key: 'admin-category',
    component: AdminCategory,
    path: '/admin/category',
    exact: true,
    pageProps: {
      isAdmin: true,
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
];


export default [
  {
    key: 'activate',
    component: ResetPassword,
    path: '/activate',
    exact: true,
    pageProps: {
      hasFooter: false,
      hasNavigation: false,
      requireAuth: 'optional',
    },
  },
  {
    key: 'resetpw',
    component: ResetPassword,
    path: '/reset-password',
    exact: true,
    pageProps: {
      hasFooter: false,
      hasNavigation: false,
      requireAuth: 'optional',
    },
  },
  {
    key: 'login',
    component: Login,
    path: '/login',
    exact: true,
    pageProps: {
      hasNavigation: false,
      hasFooter: false,
      requireAuth: false,
      pageTitle: 'Login',
      pageDescription: 'Login to CENVI',
    },
  },
  {
    key: 'forgotpw',
    component: ForgotPassword,
    path: '/forgot-password',
    exact: true,
    pageProps: {
      hasFooter: false,
      hasNavigation: false,
      requireAuth: false,
    },
  },
  {
    key: 'signup',
    component: Signup,
    path: '/register',
    exact: true,
    pageProps: {
      hasNavigation: false,
      hasFooter: false,
      requireAuth: false,
      pageTitle: 'Signup',
    },
  },
  ...adminRoutes,
  {
    key: 'not-found',
    path: '*',
    component: NotFound,
    exact: true,
    pageProps: {
      requireAuth: false,
    },
  },
];


export function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            const { pageProps = { }, key } = route;
            const {
              isAdmin,
              title, hasNavigation,
              hasFooter, requireAuth,
              pageId, pageDescription, requiredRoles,
            } = pageProps;
            return (
              <PageLayout
                key={key}
                pageId={pageId || key}
                title={title}
                hasNavigation={hasNavigation}
                isAdmin={isAdmin}
                hasFooter={hasFooter}
                requireAuth={requireAuth}
                pageDescription={pageDescription}
                requiredRoles={requiredRoles}
                {...props}
              >
                <route.component {...props} {...extraProps} route={route} />
              </PageLayout>
            );
          }}
        />
      ))}
    </Switch>
  ) : null;
}
