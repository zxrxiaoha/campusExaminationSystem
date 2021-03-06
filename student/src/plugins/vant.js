import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant';
import { NavBar } from 'vant';
import { Icon } from 'vant';
import { Tab, Tabs } from 'vant';
import { Form } from 'vant';
import { Field } from 'vant';
import { Button } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Uploader } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Popup } from 'vant';
import { Picker } from 'vant';
import { Image as VanImage } from 'vant';
import { DatetimePicker } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(DatetimePicker);
Vue.use(VanImage);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Uploader);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Icon);