import "./tailwind.css"
import VInput from './components/VInput.vue'

export {
    VInput
}

export default {
    install(app: any, options: any) {
        app.component('VInput', VInput)
    }
}