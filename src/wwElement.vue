<template>
    <div class="element-container" :style="cssVariables">
        <!-- Slider main container -->
        <div class="swiper-container" :class="'swiper-free-mode ' + 'unique-swipper-container-' + uniqueID">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <!-- Slides -->
                <div v-for="index in nbOfSlides" :key="index" class="swiper-slide">
                    <wwLayout class="slide-layout" :path="`slidesLayout[${index}]`" direction="column"></wwLayout>
                </div>
            </div>
        </div>
        <div v-show="content.pagination" class="bullets">
            <div v-for="index in Math.ceil(bullets)" :key="index" class="bullet-container" @click="slideTo(index - 1)">
                <wwElement
                    class="bulletIcon"
                    v-bind="content.bulletsIcons"
                    :states="index - 1 === sliderIndex ? ['active'] : []"
                />
            </div>
        </div>
        <div v-show="showLeftNav" class="navigation-container" @click="slidePrev">
            <wwElement class="layout-prev" v-bind="content.navigationIcons[0]" />
        </div>
        <div v-show="showRightNav" class="navigation-container" @click="slideNext">
            <wwElement class="layout-next" v-bind="content.navigationIcons[1]" />
        </div>
    </div>
</template>

<script>
// import Swiper JS
import Swiper from 'swiper/bundle';
// import Swiper styles
import 'swiper/swiper-bundle.css';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['update:content'],
    data() {
        return {
            swiperInstance: null,
            slidesLength: 0,
            sliderIndex: 0,
            uniqueID: 0,
            intervalHolder: null,
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
        nbOfSlides() {
            return this.content.slidesLayout.length;
        },
        showLeftNav() {
            const isFirst = this.sliderIndex > 0 || this.content.loop;

            return this.content.navigation && isFirst;
        },
        showRightNav() {
            const isLast = this.sliderIndex < this.nbOfSlides - 1 || this.content.loop;

            return this.content.navigation && isLast;
        },
        bullets() {
            return this.nbOfSlides - this.content.slidesPerView + 1;
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
        cssVariables() {
            return {
                '--timing-function': this.content.linearTransition ? 'linear' : 'auto',
            };
        },
    },
    watch: {
        isEditing() {
            // if (this.swiperInstance) this.swiperInstance.destroy(true, true);
            // this.initSwiper();
        },
        'content.direction'() {
            this.swiperInstance.destroy(true, true);
            this.$nextTick(() => {
                this.initSwiper();
            });
        },
        'content.effect'() {
            this.swiperInstance.destroy(true, true);
            this.initSwiper();
        },
        'wwEditorState.sidepanelContent.slideIndex'(index) {
            if (this.swiperInstance) this.slideTo(index);
        },
        'content.slidesPerView'() {
            this.swiperInstance.destroy(true, true);
            this.initSwiper();
        },
        'content.spaceBetween'() {
            this.swiperInstance.destroy(true, true);
            this.initSwiper();
        },
        'content.loop'() {
            this.swiperInstance.destroy(true, true);
            if (!this.content.loop) {
                this.$emit('update:content', { automatic: false });
            }
            this.initSwiper();
        },
        'content.automaticTiming'() {
            this.swiperInstance.destroy(true, true);
            if (this.content.automatic) {
                this.$emit('update:content', { loop: true });
                this.automate();
            } else {
                this.$emit('update:content', { loop: false });
                clearInterval(this.intervalHolder);
            }
            this.initSwiper();
        },
        'content.automatic'() {
            this.swiperInstance.destroy(true, true);
            if (this.content.automatic) {
                this.$emit('update:content', { loop: true });
                this.automate();
            } else {
                this.$emit('update:content', { loop: false });
                clearInterval(this.intervalHolder);
            }
            this.initSwiper();
        },
    },
    mounted() {
        this.initSwiper();
        if (this.content.automatic) {
            this.automate();
        }
    },
    created() {
        this.uniqueID = wwLib.wwUtils.getUniqueId();
    },
    methods: {
        initSwiper() {
            this.swiperInstance = new Swiper(`.unique-swipper-container-${this.uniqueID}`, {
                effect: this.content.effect,
                fadeEffect:
                    this.content.effect === 'fade'
                        ? {
                              crossFade: true,
                          }
                        : null,
                slidesPerView: this.content.slidesPerView,
                spaceBetween: parseInt(this.content.spaceBetween.slice(0, -2)),
                loop: this.content.loop,
                allowTouchMove: true,
                /* wwEditor:start */
                allowTouchMove: false,
                /* wwEditor:end */
                freeMode: this.content.linearTransition ? true : false,
            });
            try {
                this.$nextTick(() => {
                    this.sliderIndex = this.swiperInstance.realIndex;
                    this.swiperInstance.on('activeIndexChange', () => {
                        this.sliderIndex = this.swiperInstance.realIndex;
                    });
                });
            } catch (error) {
                wwLib.wwLog.error('Slider instance not found:', error);
            }
        },
        /* wwEditor:start */
        async addSlide() {
            const slidesLayout = [...this.content.slidesLayout];
            if (slidesLayout.length === 0) {
                slidesLayout.push([]);
            } else {
                const slide = slidesLayout[slidesLayout.length - 1];
                slidesLayout.push(slide);
            }
            this.$emit('update:content', { slidesLayout });
            this.initSwiper();
        },
        removeSlide(index) {
            const slidesLayout = [...this.content.slidesLayout];
            slidesLayout.splice(index, 1);

            this.$emit('update:content', { slidesLayout });
            this.initSwiper();
        },
        /* wwEditor:end */
        slideTo(index) {
            this.swiperInstance.slideTo(index, this.transitionDuration, false);
        },
        slideNext() {
            if (this.isEditing) return;
            this.swiperInstance.slideNext(this.transitionDuration);
        },
        slidePrev() {
            if (this.isEditing) return;
            this.swiperInstance.slidePrev(this.transitionDuration);
        },
        automate() {
            this.intervalHolder = setInterval(() => {
                this.slideNext();
            }, this.automaticTiming * 1000);
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
}
.swiper-container {
    width: 100%;
    height: 100%;
}
.swiper-wrapper {
    position: relative;
}
.swiper-free-mode > .swiper-wrapper {
    transition-timing-function: var(--timing-function);
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
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    .slide-layout {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
    }
}
.layout-prev {
    width: 100px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 2;
}
.layout-next {
    width: 100px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    z-index: 2;
}
</style>
