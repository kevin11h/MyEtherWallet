import app from './app';
import ExtensionPopup from '@/layouts/ExtensionPopup';
// import ExtensionWeb3Layout from '@/layouts/ExtensionWeb3Layout';
import ExtensionBrowserAction from '@/layouts/ExtensionBrowserAction';
import ExtensionAddWalletContainer from '@/layouts/ExtensionBrowserAction/containers/ExtensionAddWalletContainer';
import ExtensionWalletContainer from '@/layouts/ExtensionBrowserAction/containers/ExtensionWalletContainer';

const cxRoutes = [
  // {
  //   path: '/extension-popups',
  //   name: 'Web3 Detected',
  //   component: ExtensionWeb3Layout,
  //   meta: { requiresAuth: false },
  //   children: [
  //     {
  //       path: '/web3-detected'
  //     },
  //     {
  //       path: '/account-access'
  //     },
  //     {
  //       path: '/sign-tx'
  //     },
  //     {
  //       path: '/sign-msg'
  //     }
  //   ]
  // },
  {
    path: '/popup',
    name: 'Popup',
    component: ExtensionPopup,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: ExtensionBrowserAction,
    children: [
      {
        path: '',
        name: 'View Wallets',
        component: ExtensionWalletContainer,
        meta: { requiresAuth: false }
      },
      {
        path: '/access-my-wallet',
        name: 'AccessWalletLayout',
        component: ExtensionAddWalletContainer,
        meta: { requiresAuth: false }
      }
    ]
  }
];
const configRoutes = routes => {
  return routes.concat(cxRoutes);
};
export { app, configRoutes };
