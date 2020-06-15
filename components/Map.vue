<template>
    <div id="map"></div>
</template>

<script>
export default {
    name: 'Map',
    methods: {
        initMap() {
            // 初始化地圖
            this.OSMmap = this.$L.map('map', {
                center: [25.041956, 121.508791],
                zoom: 18,
            });
            // 將 OSM 圖資放置於地圖上
            // 圖資網址來源：https://leafletjs.com/reference-1.6.0.html#tilelayer-url-template 中的 Usage example
            this.$L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(this.OSMmap);
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style lang="scss" scoped>
#map {
    flex: auto;
    height: 100vh;
}
</style>
