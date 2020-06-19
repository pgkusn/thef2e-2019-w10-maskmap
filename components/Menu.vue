<template>
    <div class="menu">
        <select v-model="currentCity">
            <option v-for="city in cities" :key="city.CityName">{{ city.CityName }}</option>
        </select>
        <select v-model="currentArea">
            <option v-for="area in areas" :key="area.AreaName">{{ area.AreaName }}</option>
        </select>
        <ul>
            <li v-for="mask in currentMasks" :key="mask.properties.id">
                <p>{{ mask.properties.name }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'Menu',
    computed: {
        ...mapState(['cities']),
        ...mapGetters(['currentMasks']),
        areas() {
            return this.cities.filter(city => city.CityName === this.currentCity)[0].AreaList;
        },
        currentCity: {
            get() {
                return this.$store.state.currentCity;
            },
            set(value) {
                this.$store.commit('setCurrentCity', value);
            },
        },
        currentArea: {
            get() {
                return this.$store.state.currentArea;
            },
            set(value) {
                this.$store.commit('setCurrentArea', value);
            },
        },
    },
    watch: {
        currentCity(value) {
            this.$store.commit('setCurrentArea', this.areas[0].AreaName);
        },
    },
};
</script>

<style lang="scss" scoped>
.menu {
    flex: none;
    width: 340px;
}
</style>
