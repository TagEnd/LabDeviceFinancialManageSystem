import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'

import {
    Container, Header,Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem,Message,Checkbox,CheckboxGroup,Pagination,
    Dialog, Button, MessageBox, Radio, Select, Option, DatePicker, Form, FormItem, InputNumber, Tooltip
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
Vue.use(Radio);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(InputNumber);
Vue.use(Tooltip);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;