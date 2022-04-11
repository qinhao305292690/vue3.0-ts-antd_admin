import {
    Button,
    Menu,
    message,
    Table,
    Layout,
    Breadcrumb,
    Card,
    Input,
    Radio,
    InputNumber,
    Spin,
    Dropdown,
    Form
} from 'ant-design-vue';

import type { App } from 'vue';

export default (app: App<Element>): void => {
    app
        .use(Button)
        .use(Menu)
        .use(Dropdown)
        .use(Radio)
        .use(Layout)
        .use(Input)
        .use(Breadcrumb)
        .use(Table)
        .use(InputNumber)
        .use(Card)
        .use(Spin)
        .use(Form)
    app.config.globalProperties.$message = message;
}
