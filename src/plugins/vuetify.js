import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
    iconfont: 'md',
    theme: {
        primary: '#45ADA8',
        secondary: '#EFC958',
        accent: '#BDBDBD',
        danger: '#C62828',
        button: '#EFC958'
    }
})
