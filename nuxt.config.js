const pkg = require('./package');

module.exports = {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap',
            },
        ],
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },

    /*
     ** Global CSS
     */
    css: ['@/assets/sass/reset.scss'],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [{ src: '~/plugins/leaflet.js', mode: 'client' }],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
    ],
    /*
     ** Axios module configuration
     */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
    },
    buildModules: [
        ['@nuxtjs/dotenv'], // 預設 .env 使用
        ['@nuxtjs/dotenv', { filename: '.env.' + process.env.NODE_ENV }],
    ],
};
