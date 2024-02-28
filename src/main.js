import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import DraggableResizableVue from 'draggable-resizable-vue3';
import './assets/scss/global.scss';
import './index.css';

// Base components
import BaseBtn from './components/Base/BaseBtn.vue';
import BaseCard from './components/Base/BaseCard.vue';

// Widgets
import TodoListWidget from './components/widgets/TodoListWidget.vue';
import WeatherWidget from './components/widgets/WeatherWidget.vue';
import CalendarWidget from './components/widgets/CalendarWidget.vue';
import NewsWidget from './components/widgets/NewsWidget.vue';
import GmailWidget from './components/widgets/GmailWidget.vue';

// Create Vue application
const app = createApp(App);

// Global registration of widgets
app.component('TodoListWidget', TodoListWidget);
app.component('WeatherWidget', WeatherWidget);
app.component('CalendarWidget', CalendarWidget);
app.component('NewsWidget', NewsWidget);
app.component('GmailWidget', GmailWidget);

// Global registration of base components
app.component('BaseBtn', BaseBtn);
app.component('BaseCard', BaseCard);

// Use plugins
app.use(DraggableResizableVue);
app.use(router);
app.use(store);

// Mount the Vue application
app.mount('#app');
