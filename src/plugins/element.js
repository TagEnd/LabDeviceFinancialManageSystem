import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'

import {
    Container, Header,Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem,Message,Checkbox,CheckboxGroup,Pagination,
    Dialog, Button
} from 'element-ui'

Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Button);
Vue.prototype.$message = Message;