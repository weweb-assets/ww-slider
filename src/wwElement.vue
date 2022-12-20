<template>
    <div class="element-container" :style="cssVariables" :class="{ editing: isEditing, selected: isSelected }">
        <div ref="swiper" :key="componentKey" class="swiper" ww-responsive="swiper">
            <wwLayout
                :disable-drag-drop="true"
                path="mainLayoutContent"
                class="swiper-wrapper"
                ww-responsive="swiper-wrapper"
            >
                <template #default="{ item, index }">
                    <wwLayoutItem v-if="item !== undefined" class="swiper-slide" ww-responsive="swiper-slide">
                        <wwElement
                            class="slide-container"
                            v-bind="item"
                            :states="index !== sliderIndex ? ['Not Current Slide'] : []"
                        />
                    </wwLayoutItem>
                </template>
            </wwLayout>
        </div>

        <div v-show="content.pagination" class="bullets">
            <div
                v-for="index in numberOfBullets"
                :key="index"
                class="bullet-container"
                @click="onBulletClick(index - 1)"
            >
                <wwElement
                    class="bulletIcon"
                    v-bind="content.bulletsIcons"
                    :states="index - 1 === sliderIndex ? ['active', 'Current Slide'] : []"
                />
            </div>
        </div>

        <div v-show="showLeftNav" class="navigation-container prev" @click="slidePrev">
            <wwElement class="layout-prev" v-bind="content.navigationIcons[0]" />
        </div>
        <div v-show="showRightNav" class="navigation-container next" @click="slideNext">
            <wwElement class="layout-next" v-bind="content.navigationIcons[1]" />
        </div>

        <!-- wwEditor:start -->
        <div class="element-container__status label-xs">Slide {{ sliderIndex + 1 }}</div>
        <!-- wwEditor:end -->
    </div>
</template>

<script>
import { nextTick } from 'vue';

import Swiper, { EffectFlip, EffectFade, EffectCoverflow, EffectCube, EffectCards, Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/effect-fade/effect-fade.min.css';
import 'swiper/modules/effect-coverflow/effect-coverflow.min.css';
import 'swiper/modules/effect-cards/effect-cards.min.css';
import 'swiper/modules/effect-flip/effect-flip.min.css';
import 'swiper/modules/effect-cube/effect-cube.min.css';

import { getContent } from './getContent.js';

export default {
    props: {
        content: { type: Object, required: true },
        wwFrontState: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['update:content', 'update:sidepanel-content'],
    setup() {
        return {
            swiperInstance: null,
        };
    },
    data() {
        return {
            sliderIndex: 0,
            componentKey: 0,
            isInit: false,
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        isSelected() {
            /* wwEditor:start */
            return this.wwEditorState.isSelected;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        nbOfSlides() {
            const content = getContent(this.content.mainLayoutContent);
            return content.length;
        },
        showLeftNav() {
            const hasPrevious = this.sliderIndex > 0 || this.content.loop;
            return this.content.navigation && hasPrevious;
        },
        showRightNav() {
            const hasNext = this.sliderIndex < this.nbOfSlides - 1 || this.content.loop;
            return this.content.navigation && hasNext;
        },
        numberOfBullets() {
            return Math.ceil(this.nbOfSlides - this.slidesPerView + 1);
        },
        transitionDuration() {
            let value = this.content.transitionDuration;
            value = value.substring(0, value.length - 2);
            return parseInt(value);
        },
        automaticTiming() {
            let value = this.content.automaticTiming;
            value = value.substring(0, value.length - 1);
            return parseInt(value);
        },
        slidesPerView() {
            if (this.content.slidesPerView > this.nbOfSlides) {
                return this.nbOfSlides;
            } else if (this.content.slidesPerView < 1) {
                return 1;
            } else {
                return this.content.slidesPerView;
            }
        },
        swiperOptions() {
            const autoplay = {
                autoplay: {
                    delay: this.automaticTiming * 1000,
                    disableOnInteraction: false,
                },
            };

            const options = {
                modules: [EffectFlip, EffectFade, EffectCoverflow, EffectCube, EffectCards, Autoplay],
                effect: this.content.effect,
                cardsEffect: { slideShadows: false },
                coverflowEffect: { slideShadows: false },
                slidesPerView: this.slidesPerView,
                speed: this.transitionDuration,
                spaceBetween: parseInt(this.content.spaceBetween.slice(0, -2)),
                loop: this.content.loop,
                freeMode: this.content.linearTransition,
                allowTouchMove: !this.isEditing,

                on: {
                    realIndexChange: e => {
                        this.sliderIndex = e.realIndex;
                    },
                },
            };

            return this.content.automatic ? { ...options, ...autoplay } : { ...options };
        },
        cssVariables() {
            return {
                '--timing-function': this.content.linearTransition ? 'linear' : 'auto',
            };
        },
    },
    watch: {
        /* wwEditor:start */
        isEditing() {
            this.initSwiper();
        },
        'wwEditorState.sidepanelContent.slideIndex'(index) {
            if (!this.isEditing) return;
            if (this.sliderIndex !== index) {
                this.slideTo(index);
            }
        },
        sliderIndex(index) {
            if (!this.isEditing) return;
            if (this.wwEditorState.sidepanelContent.slideIndex !== index) {
                this.$emit('update:sidepanel-content', {
                    path: 'slideIndex',
                    value: index,
                });
            }
        },
        swiperOptions() {
            this.initSwiper();
        },
        /* wwEditor:end */
        'content.mainLayoutContent'() {
            this.initSwiper(true);
        },
    },
    mounted() {
        this.initSwiper(false);
    },
    beforeUnmount() {
        if (this.swiperInstance) this.swiperInstance.destroy(true, true);
    },
    methods: {
        async initSwiper(resetIndex = true) {
            // Prevents multiple initializations that can lead to autoplay or loop bugs
            if (this.isInit) return;
            this.isInit = true;
            try {
                if (this.swiperInstance && this.swiperInstance.destroy) this.swiperInstance.destroy(true, true);

                // Necessary to clean the possible persistent style in the element before a new initialization
                this.componentKey += 1;

                // Necessary to make the loop mode work properly with wwElements
                await nextTick();
                await nextTick();

                this.swiperInstance = new Swiper(this.$refs.swiper, this.swiperOptions);
                this.sliderIndex = this.swiperInstance.realIndex;

                if (resetIndex) this.slideTo(0);

                // Ensures that autoplay does not continue when editing
                this.handleAutoplay();
            } catch (error) {
                wwLib.wwLog.warn('WW-SLIDER SWIPER INIT ERROR', error);
            } finally {
                this.isInit = false;
            }
        },
        /* wwEditor:start */
        async addSlide() {
            const mainLayoutContent = [...this.content.mainLayoutContent];

            if (mainLayoutContent.length === 0) {
                const slide = await wwLib.createElement('ww-flexbox', {}, {}, this.wwFrontState.sectionId);
                mainLayoutContent.push(slide);
            } else {
                const slide = await wwLib.wwObjectHelper.cloneElement(
                    mainLayoutContent[mainLayoutContent.length - 1].uid,
                    this.wwFrontState.sectionId
                );
                mainLayoutContent.push(slide);
            }
            this.$emit('update:content', { mainLayoutContent });
        },
        removeSlide(index) {
            const mainLayoutContent = [...this.content.mainLayoutContent];
            mainLayoutContent.splice(index, 1);

            this.$emit('update:content', { mainLayoutContent });
        },
        /* wwEditor:end */
        slideTo(index) {
            /* slideToLoop instead of slideTo allows to always rely on the realIndex,
            and thus to keep the right index even when the loop mode is activated */
            if (this.swiperInstance) this.swiperInstance.slideToLoop(index, this.transitionDuration);
        },
        onBulletClick(index) {
            if (this.isEditing) return;
            this.slideTo(index);
        },
        slideNext() {
            if (this.isEditing) return;
            if (this.swiperInstance) this.swiperInstance.slideNext(this.transitionDuration);
        },
        slidePrev() {
            if (this.isEditing) return;
            if (this.swiperInstance) this.swiperInstance.slidePrev(this.transitionDuration);
        },
        handleAutoplay() {
            if (
                this.isEditing &&
                this.content.automatic &&
                this.swiperInstance &&
                this.swiperInstance.autoplay &&
                this.swiperInstance.autoplay.running
            ) {
                this.swiperInstance.autoplay.stop();
            } else if (
                !this.isEditing &&
                this.content.automatic &&
                this.swiperInstance &&
                this.swiperInstance.autoplay &&
                this.swiperInstance.autoplay.running
            ) {
                this.swiperInstance.autoplay.start();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.element-container {
    position: relative;

    .bullets {
        pointer-events: all;
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        display: flex;
        flex-direction: row;
        .bullet-container {
            height: 20px;
        }
    }

    /* wwEditor:start */
    &__status {
        position: absolute;
        top: -1px;
        color: var(--ww-color-white);
        padding: var(--ww-spacing-00) var(--ww-spacing-01);
        border-radius: var(--ww-spacing-00);
        background-color: var(--ww-color-blue-500);
        z-index: 10;
        opacity: 0;
        pointer-events: none;
        right: -1px;
    }
    &.selected {
        > .element-container__status {
            opacity: 1;
            pointer-events: all;
        }
    }
    &.editing:hover {
        & > .border {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 1px solid var(--ww-editor-color);
            pointer-events: none;
            z-index: 10;
        }
    }
    /* wwEditor:end */
}
.swiper {
    width: 100%;
    height: 100%;
}
.swiper-wrapper {
    position: relative;
    transition-timing-function: var(--timing-function);

    .slide-container {
        width: 100%;
    }
}

.swiper-slide {
    z-index: 1;
    position: relative;
    text-align: center;
    font-size: 18px;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    max-width: 100%;
    .slide-layout {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
    }
}

.navigation-container {
    width: 100px;
    position: absolute;
    top: 50%;

    transform: translateY(-50%);
    z-index: 2;

    &.prev {
        left: 0;
    }
    &.next {
        right: 0;
    }
}
</style>
