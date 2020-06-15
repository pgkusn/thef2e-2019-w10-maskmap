<template>
    <div class="wrapper">
        <Menu :email="email"></Menu>
        <Map></Map>
    </div>
</template>

<script>
import Menu from '@/components/Menu.vue';
import Map from '@/components/Map.vue';

export default {
    name: 'Index',
    components: {
        Menu,
        Map,
    },
    async fetch({ store }) {
        await store.dispatch('getCity');
    },
    async asyncData({ $axios }) {
        let { data } = await $axios({
            method: 'get',
            url: 'https://randomuser.me/api/',
        });
        return { email: data.results[0].email };
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
}
</style>
