<template>
    <div id="map"></div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'Map',
    data() {
        return {
            OSMmap: null,
            firstEntry: true,
        };
    },
    computed: {
        ...mapState(['currentLatLng']),
        ...mapGetters(['currentMasks']),
        defaultCoordinates() {
            return this.currentMasks[0].geometry.coordinates;
        },
    },
    watch: {
        currentMasks() {
            this.setCurrentLatLng(this.defaultCoordinates);
        },
        currentLatLng() {
            this.updateMap();
        },
    },
    methods: {
        ...mapMutations(['setCurrentLatLng']),
        initMap() {
            // 初始化地圖
            this.OSMmap = this.$L.map('map', {
                center: [25.041956, 121.508791],
                zoom: 18,
            });

            // 將 OSM 圖資放置於地圖上
            // 圖資網址來源：https://leafletjs.com/reference-1.6.0.html#tilelayer-url-template 中的 Usage example
            this.$L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(this.OSMmap);

            this.setCurrentLatLng(this.defaultCoordinates);
        },
        updateMap(coordinates) {
            // remove marker
            this.OSMmap.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    this.OSMmap.removeLayer(layer);
                }
            });

            // move view
            if (this.firstEntry) {
                this.OSMmap.panTo(this.currentLatLng);
                this.firstEntry = false;
            } else {
                this.OSMmap.flyTo(this.currentLatLng);
            }

            // add marker
            let myIcon = new this.$L.divIcon({ html: '<span class="material-icons mark">add_location</span>' });
            this.currentMasks.forEach(mask => {
                let [lng, lat] = mask.geometry.coordinates;
                let layer = this.$L
                    .marker([lat, lng], { icon: myIcon })
                    .bindPopup(
                        `
                        <p class="popup-name">${mask.properties.name}</p>
                        <p class="popup-address"><span class="material-icons">location_on</span>
                            ${mask.properties.address}
                        </p>
                        <p class="popup-phone"><span class="material-icons">phone</span>${mask.properties.phone}</p>
                        <p class="popup-stock">
                            <span class="${!mask.properties.mask_adult ? 'no-stock' : ''}">
                                成人：${this.maskStock(mask.properties.mask_adult)}
                            </span>
                            <span class="${!mask.properties.mask_child ? 'no-stock' : ''}">
                                兒童：${this.maskStock(mask.properties.mask_child)}
                            </span>
                        </p>
                    `
                    )
                    .addTo(this.OSMmap);
                if (lat === this.currentLatLng[0] && lng === this.currentLatLng[1]) {
                    layer.openPopup();
                }
            });
        },
        maskStock(value) {
            return value ? `${value} 個` : '已售完';
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style lang="scss" scoped>
#map {
    z-index: 0;
    flex: auto;
    height: 100%;
}
/deep/ .leaflet-popup-content {
    margin: 24px;
    &-wrapper {
        border: 2px solid #668afe;
        box-shadow: 0 4px 16px #668afe33;
    }
    p {
        margin: 0;
    }
    .popup {
        &-name {
            margin-bottom: 8px;
            font-weight: 500;
            font-size: 18px;
            line-height: 27px;
        }
        &-address,
        &-phone {
            display: flex;
            color: #888;
            font-size: 16px;
            line-height: 24px;
            > span {
                margin-right: 5px;
                font-size: 20px;
                line-height: 24px;
            }
        }
        &-address {
            margin-bottom: 9px;
        }
        &-phone {
            margin-bottom: 14px;
        }
        &-stock {
            display: flex;
            > span {
                display: inline-block;
                width: 50%;
                border-right: 1px solid #fff;
                border-radius: 4px 0 0 4px;
                background-color: #668afe;
                color: #fff;
                text-align: center;
                font-size: 14px;
                line-height: 44px;
                &.no-stock {
                    background: #e2e2e2;
                    color: #9c9c9c;
                }
                + span {
                    border-radius: 0 4px 4px 0;
                }
            }
        }
    }
}
/deep/ .leaflet-popup-tip {
    border-width: 2px;
    border-style: solid;
    border-color: transparent #668afe #668afe transparent;
    box-shadow: none;
    &-container {
        overflow: visible;
    }
}
/deep/ .leaflet-popup-close-button {
    display: none;
}
/deep/ .leaflet-div-icon {
    border: none;
    background-color: transparent;
}
/deep/ .mark {
    position: absolute;
    left: 50%;
    color: #668afe;
    font-size: 3rem;
    transform: translateX(-50%);
}
</style>
