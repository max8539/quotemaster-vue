import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Router from './router/router.js';

const APP = createApp(App);
APP.use(Router);
APP.mount("#app");
