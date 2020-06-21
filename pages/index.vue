<template>
    <div class="wrapper">
        <Menu></Menu>
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
        await store.dispatch('getData');
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    height: 100vh;
}
</style>
