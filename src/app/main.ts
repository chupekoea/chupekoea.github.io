import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createYmaps } from "vue-yandex-maps";
//
// import { initializeApp } from 'firebase/app'
// import { getFunctions } from 'firebase/functions'


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(createYmaps({
    apikey: import.meta.env.VITE_API_KEY,
}))

app.mount('#app')
//
// const firebaseConfig = {
//     // Ваши параметры Firebase
// }
//
// const fireBaseApp = initializeApp(firebaseConfig)
// export const functions = getFunctions(fireBaseApp)