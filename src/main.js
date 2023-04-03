import VInput from './components/VInput.vue'

export {
    VInput
}

export default {
    install(app, options) {
        app.component('VInput', VInput)
    }
}