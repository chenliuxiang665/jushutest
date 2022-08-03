import Vue from 'vue'
import App from './App.vue'
import { Button, Input, Select, Option } from 'element-ui';
Vue.config.productionTip = false
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
new Vue({
    render: h => h(App),
}).$mount('#app')