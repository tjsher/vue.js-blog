import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: Home
    // },
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/home.vue")
    },
    {
      path: "/bilibili",
      name: "bilibili",
      component: () => import(/* webpackChunkName: "home" */ "./views/biliRank.vue")
    },
    {
      path: "/waterfall",
      name: "waterfall",
      component: () => import(/* webpackChunkName: "home" */ "./views/waterfall.vue")
    },
     {
      path: "/steam",
      name: "steam",
      component: () => import(/* webpackChunkName: "home" */ "./views/steamDiscount.vue")
    },
    // {
    //   path: "/home2",
    //   name: "home2",
    //   component: () => import(/* webpackChunkName: "home2" */ "./views/home2.vue")
    // },
    {
      path: "/articlesTest",
      name: "articlesTest",
      // route level code-splitting
      // this generates a separate chunk (articles.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "articles" */ "./views/articlesTest.vue")
    },


       {
      path: "/add_article",
      name: "add_article",
      component: () =>
        import(/* webpackChunkName: "add_article" */ "./views/add_article.vue")
    },

    {
      path: "/articleDetailTest",
      name: "articleDetailTest",
      component: () =>
        import(/* webpackChunkName: "articleDetail" */ "./views/articleDetailTest.vue")
    }
  ]
});
