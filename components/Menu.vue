<template>
    <div class="menu">
        <select v-model="currentCity">
            <option v-for="city in cities" :key="city.CityName">{{ city.CityName }}</option>
        </select>
        <select v-model="currentArea">
            <option v-for="area in areas" :key="area.AreaName">{{ area.AreaName }}</option>
        </select>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Menu',
    data() {
        return {
            currentCity: '台北市',
        };
    },
    computed: {
        ...mapState(['cities']),
        areas() {
            return this.cities.filter(city => city.CityName === this.currentCity)[0].AreaList;
        },
        currentArea: {
            get() {
                return this.$store.state.currentArea;
            },
            set(value) {
                this.$store.commit('setArea', value);
            },
        },
    },
    watch: {
        currentCity(value) {
            this.$store.commit('setArea', this.areas[0].AreaName);
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
