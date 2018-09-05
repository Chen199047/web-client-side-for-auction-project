// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import register from './components/register';
import login from './components/login';
import logout from './components/logout';
import Home from './components/Home';
import auction from './components/Auction';
import selling from './components/selling';
import allAuctions from './components/allAuctions';
import myAccount from './components/myAccount';
//import router from './router'
import vueCookie from 'vue-cookie';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';



import './../node_modules/jquery/dist/jquery.min';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.bundle.min';


//Vue.config.productionTip = false;
//Vue.http.options.emulateJSON = true;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(vueCookie);


/* eslint-disable no-new */


const routes = [
  {
    path: "/",
    name:"Home",
    component:Home
  },
  {
    path: "/users/register",
    name:"Register",
    component:register
  },
  {
    path: "/users/login",
    name:"Login",
    component:login,



  },
  {
    path: "/users/logout",
    name:"Logout",
    component:logout
  },
  {
    path:"/auctions",
    name:'auctions',
    component:allAuctions
  },
  {
    path:"/auctions/:auctionId",
    name:'auction',
    component:auction
  },
  {
    path:"/sell",
    name:'sell',
    component:selling
  },
  {
    path:"/myaccount",
    name:'myaccount',
    component:myAccount
  }

];


const router = new VueRouter({
  routes: routes,
  mode: 'history'
});


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
