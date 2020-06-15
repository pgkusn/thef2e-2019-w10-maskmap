export const state = () => ({
    cities: [],
    currentArea: '',
});

export const mutations = {
    setCities(state, payload) {
        state.cities = payload;
    },
    setArea(state, payload) {
        state.currentArea = payload;
    },
};

export const actions = {
    async getCity({ commit }) {
        try {
            let { data } = await this.$axios({
                method: 'get',
                url: 'https://wcc723.github.io/wheremask/cityName.json',
            });
            commit('setCities', data);
            commit('setArea', data[0].AreaList[0].AreaName);
        } catch (error) {
            console.error(error);
        }
    },
};
