import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const Http = {
    init() {
        Vue.use(VueAxios, axios)
        Vue.axios.defaults.baseURL = process.env.URL | 'http://localhost:3000'
    },

    get(url) {
        return Vue.axios
            .get(`${url}`)
            .catch((error) => {
                throw new Error(`[Error] Http ${error}`)
            })
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}`, params)
    }
}

export default Http;