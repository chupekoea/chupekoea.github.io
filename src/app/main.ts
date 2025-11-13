import { createApp } from 'vue'
import App from './App.vue'
import { createYmaps } from "vue-yandex-maps";
//
// import { initializeApp } from 'firebase/app'
// import { getFunctions } from 'firebase/functions'

const app = createApp(App)

app.use(createYmaps({
    apikey: '26a1004c-2b56-4ac6-97b3-456d59be934c',
}))

app.mount('#app')
//
// const firebaseConfig = {
//     // Ваши параметры Firebase
// }
//
// const fireBaseApp = initializeApp(firebaseConfig)
// export const functions = getFunctions(fireBaseApp)