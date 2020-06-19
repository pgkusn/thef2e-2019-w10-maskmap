<template>
    <div id="map"></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Map',
    data() {
        return {
            OSMmap: null,
        };
    },
    computed: {
        ...mapGetters(['currentMasks']),
    },
    watch: {
        currentMasks() {
            this.updateMap();
        },
    },
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
        updateMap(first) {
            // remove marker
            this.OSMmap.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    this.OSMmap.removeLayer(layer);
                }
            });

            // move view
            let [currentLng, currentLat] = this.currentMasks[0].geometry.coordinates;
            if (first) {
                this.OSMmap.panTo([currentLat, currentLng]);
            } else {
                this.OSMmap.flyTo([currentLat, currentLng]);
            }

            // add marker
            this.currentMasks.forEach(mask => {
                let [lng, lat] = mask.geometry.coordinates;
                let layer = this.$L
                    .marker([lat, lng])
                    .bindPopup(`<p>${mask.properties.name}</p>`)
                    .addTo(this.OSMmap);
                if (lat === currentLat && lng === currentLng) {
                    layer.openPopup();
                }
            });
        },
    },
    mounted() {
        this.initMap();
        this.updateMap(true);
    },
};
</script>

<style lang="scss" scoped>
#map {
    flex: auto;
    height: 100vh;
}
</style>
