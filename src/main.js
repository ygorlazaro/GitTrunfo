import Buefy from 'buefy';
import 'buefy/dist/buefy.min.css';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';


Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
