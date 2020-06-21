<template>
    <div class="menu__wrapper" :class="{ closed }" @transitionend="triggerMapResize">
        <div class="menu">
            <div class="menu__inner">
                <div class="menu__top">
                    <div class="menu__top--select">
                        <select v-model="currentCity">
                            <option v-for="city in cities" :key="city.CityName">{{ city.CityName }}</option>
                        </select>
                    </div>
                    <div class="menu__top--select">
                        <select v-model="currentArea">
                            <option v-for="area in areas" :key="area.AreaName">{{ area.AreaName }}</option>
                        </select>
                    </div>
                    <p class="menu__top--total">
                        有取得口罩數量的藥局有
                        <strong>{{ currentMasks.length }}</strong>
                        家
                    </p>
                </div>
                <div class="menu__list">
                    <a
                        href
                        v-for="mask in currentMasks"
                        :key="mask.properties.id"
                        @click.prevent="setCurrentLatLng(mask.geometry.coordinates)"
                    >
                        <p class="menu__list--name">{{ mask.properties.name }}</p>
                        <p class="menu__list--address">
                            <span class="material-icons">location_on</span>{{ mask.properties.address }}
                        </p>
                        <p class="menu__list--phone">
                            <span class="material-icons">phone</span>{{ mask.properties.phone }}
                        </p>
                        <p class="menu__list--stock">
                            <span :class="{ 'no-stock': !mask.properties.mask_adult }"
                                >成人：{{ maskStock(mask.properties.mask_adult) }}</span
                            >
                            <span :class="{ 'no-stock': !mask.properties.mask_child }"
                                >兒童：{{ maskStock(mask.properties.mask_child) }}</span
                            >
                        </p>
                    </a>
                </div>
            </div>
            <button class="menu__btn" @click="closed = !closed">
                <span class="material-icons">{{ iconName }}</span>
            </button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'Menu',
    data() {
        return {
            closed: false,
        };
    },
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
        iconName() {
            return this.closed ? 'keyboard_arrow_right' : 'keyboard_arrow_left';
        },
    },
    watch: {
        currentCity(value) {
            this.$store.commit('setCurrentArea', this.areas[0].AreaName);
        },
    },
    methods: {
        ...mapMutations(['setCurrentLatLng']),
        triggerMapResize() {
            let event = document.createEvent('HTMLEvents');
            event.initEvent('resize', true, false);
            document.querySelector('#map').dispatchEvent(event);
        },
        maskStock(value) {
            return value ? `${value} 個` : '已售完';
        },
    },
};
</script>

<style lang="scss" scoped>
.menu {
    flex: none;
    overflow: hidden;
    height: 100%;
    &__wrapper {
        position: relative;
        z-index: 1;
        width: 340px;
        height: 100%;
        transition: width .5s;
        &.closed {
            width: 0;
        }
    }
    &__inner {
        display: flex;
        flex-direction: column;
        width: 340px;
        height: 100%;
    }
    &__top {
        padding: 32px 24px 0;
        background-color: #10203033;
        &--select {
            position: relative;
            + .menu__top--select {
                margin-top: 8px;
            }
            &::before {
                position: absolute;
                top: 50%;
                right: 1em;
                width: 0;
                height: 0;
                border-width: 6px 4px 0 4px;
                border-style: solid;
                border-color: #333 transparent transparent transparent;
                content: '';
                transform: translateY(-50%);
            }
            > select {
                display: block;
                padding-left: 1em;
                width: 100%;
                height: 48px;
                outline: none;
                border: 1px solid #e2e2e2;
                font-size: 1rem;
                appearance: none;
            }
        }
        &--total {
            margin: 1em 0;
            > strong {
                color: #668afe;
                font-size: 24px;
            }
        }
    }
    &__list {
        flex: auto;
        overflow: auto;
        > a {
            display: block;
            padding: 24px;
            color: #000;
            + a {
                border-top: 1px solid #e2e2e2;
            }
        }
        &--name {
            margin-bottom: 8px;
            font-weight: 500;
            font-size: 18px;
            line-height: 27px;
        }
        &--address,
        &--phone {
            display: flex;
            color: #888;
            line-height: 24px;
            > span {
                margin-right: 5px;
                font-size: 20px;
                line-height: 24px;
            }
        }
        &--address {
            margin-bottom: 9px;
        }
        &--phone {
            margin-bottom: 14px;
        }
        &--stock {
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
    &__btn {
        position: absolute;
        top: 50%;
        left: 100%;
        display: flex;
        width: 18px;
        height: 48px;
        border-radius: 0 12px 12px 0;
        background-color: #668afe;
        transform: translateY(-50%);
        justify-content: center;
        align-items: center;
        > span {
            color: #fff;
            font-size: 18px;
        }
    }
}
</style>
