import Vue from "vue";
import Router from "vue-router";
import paths from "./paths";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
Vue.use(Router);
const router = new Router({
  base: "/",
  mode: "hash",
  linkActiveClass: "active",
  routes: paths
});
//var self=this;
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start();
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const hastoken = localStorage.getItem("user");
  //const loggedIn  = self.axios
  console.log(authRequired + "--" + hastoken);
  if (authRequired) {
    if (hastoken == null || hastoken == {} || hastoken == undefined) {
      console.log("in if 1");
      return next("/login");
    } else {
      var token = "JWT " + JSON.parse(hastoken).access_token;
      console.log("in Else");
      console.log(token+"--" + hastoken);
      axios
        .get("/api/v1/user/profile", {
          headers: {
            "authorization": token
          }
        })
        .then(function(response) {
          console.log(response);
          if (response.status != 200) {
            localStorage.user = {};
            return next("/login");
          } else {
            console.log("in Else2");
            next();
          }
        })
        .catch(function(error) {
          localStorage.user = {};
          console.log(JSON.stringify(error));
          return next("/login");
        });
    }
  }
  next();
});

router.afterEach((to, from) => {
  // ...
  NProgress.done();
});

export default router;
