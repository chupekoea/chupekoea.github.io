import { createApp } from 'vue'
import App from './App.vue'
import { createYmaps } from "vue-yandex-maps";
//
// import { initializeApp } from 'firebase/app'
// import { getFunctions } from 'firebase/functions'


const app = createApp(App)

app.use(createYmaps({
    apikey: import.meta.env.VITE_YANDEX_MAP_API_KEY,
}))

app.mount('#app')
//
// const firebaseConfig = {
//     // Ваши параметры Firebase
// }
//
// const fireBaseApp = initializeApp(firebaseConfig)
// export const functions = getFunctions(fireBaseApp)