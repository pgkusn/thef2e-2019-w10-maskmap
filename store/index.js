import API from '~/api.js';

export const state = () => ({
    cities: [],
    currentCity: '',
    currentArea: '',
    masks: [],
});

export const mutations = {
    setCities(state, payload) {
        state.cities = payload;
    },
    setCurrentCity(state, payload) {
        state.currentCity = payload;
    },
    setCurrentArea(state, payload) {
        state.currentArea = payload;
    },
    setMasks(state, payload) {
        state.masks = payload;
    },
};

export const getters = {
    currentMasks: state =>
        state.masks.filter(item => {
            let currentCity = state.currentCity === '台北市' ? '臺北市' : state.currentCity;
            return item.properties.county === currentCity && item.properties.town === state.currentArea;
        }),
};

export const actions = {
    async getData({ commit }) {
        try {
            let getCities = this.$axios({
                method: API.city.method,
                url: API.city.url,
                baseURL: process.env.city_url,
            });
            let getMasks = this.$axios({
                method: API.mask.method,
                url: API.mask.url,
                baseURL: process.env.mask_url,
            });

            let result = await Promise.all([getCities, getMasks]);

            commit('setCities', result[0].data);
            commit('setCurrentCity', result[0].data[0].CityName);
            commit('setCurrentArea', result[0].data[0].AreaList[0].AreaName);
            commit('setMasks', result[1].data.features);
        } catch (error) {
            console.error(error);
        }
    },
};
