<template>
  <div class="element-container">
    <!-- {{ content.slides.items.length }} -->
    <!-- Slider main container -->
    <div
      class="swiper-container"
      :class="'unique-swipper-container-' + uniqueID"
    >
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div
          class="swiper-slide"
          v-for="(slide, index) in content.slides.items"
          :key="index"
        >
          <wwLayout
            class="slide-layout"
            :path="`slidesLayout[${index}]`"
            direction="column"
          ></wwLayout>
        </div>
      </div>
    </div>

    <div class="bullets" v-show="content.pagination">
      <div
        class="bullet-container"
        v-for="index in Math.ceil(bullets)"
        @click="slideTo(index - 1)"
        :key="index"
      >
        <wwObject
          class="bulletIcon"
          v-bind="content.bulletsIcons"
          :states="index - 1 === sliderIndex ? ['active'] : []"
        ></wwObject>
      </div>
    </div>
    <div
      class="navigation-container"
      v-show="content.navigation"
      @click="slidePrev"
    >
      <wwObject
        class="layout-prev"
        v-bind="content.navigationIcons[0]"
      ></wwObject>
    </div>
    <div
      class="navigation-container"
      v-show="content.navigation"
      @click="slideNext"
    >
      <wwObject
        class="layout-next"
        v-bind="content.navigationIcons[1]"
      ></wwObject>
    </div>
  </div>
</template>

<script>
// import Swiper JS
import Swiper from "swiper/bundle";
// import Swiper styles
import "swiper/swiper-bundle.css";

export default {
  props: {
    content: { type: "Object", required: true },
    /* wwEditor:start */
    wwEditorState: Object,
    /* wwEditor:end */
  },
  wwDefaultContent: {
    slides: {
      items: [
        {
          checked: true,
          index: 0,
        },
        {
          checked: false,
          index: 1,
        },
        {
          checked: false,
          index: 2,
        },
      ],
      target: null,
    },
    slidesLayout: [],
    bulletsLayout: [],
    bulletsLayoutStates: [],
    slidesPerView: 1,
    effect: "slide",
    navigation: true,
    loop: false,
    pagination: true,
    spaceBetween: "0px",
    navigationIcons: [wwLib.element("ww-icon"), wwLib.element("ww-icon")],
    bulletsIcons: wwLib.element("ww-icon"),
  },
  data() {
    return {
      swiperInstance: null,
      slidesLength: 0,
      sliderIndex: 0,
      uniqueID: 0,
    };
  },
  computed: {
    isEditing() {
      /* wwEditor:start */
      return (
        this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION
      );
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    },
    bullets() {
      return this.content.slides.items.length / this.content.slidesPerView;
    },
  },
  watch: {
    isEditing() {
      this.$nextTick(() => {
        this.sliderIndex = this.swiperInstance.realIndex - 1;
      });
    },
    "content.direction"() {
      this.swiperInstance.destroy(true, true);
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
    "content.effect"() {
      this.swiperInstance.destroy(true, true);
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
    "content.slides"() {
      this.swiperInstance.destroy(true, true);
      this.$nextTick(() => {
        this.initSwiper();
        this.currentSlide = this.content.slides.items.findIndex(
          (item) => item.checked
        );

        this.swiperInstance.slideTo(this.currentSlide, 0, false);
      });
    },
    "content.slidesPerView"() {
      this.swiperInstance.destroy(true, true);
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
    "content.spaceBetween"() {
      this.swiperInstance.destroy(true, true);
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
    "content.loop"() {
      this.swiperInstance.destroy(true, true);
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
  },
  methods: {
    initSwiper() {
      this.swiperInstance = new Swiper(
        `.unique-swipper-container-${this.uniqueID}`,
        {
          // Optional parameters
          effect: this.content.effect,
          slidesPerView: this.content.slidesPerView,
          spaceBetween: parseInt(this.content.spaceBetween.slice(0, -2)),
          loop: this.content.loop,
        }
      );
      this.$nextTick(() => {
        this.sliderIndex = this.swiperInstance.realIndex;
        this.swiperInstance.on("activeIndexChange", () => {
          this.sliderIndex = this.swiperInstance.realIndex;
        });
      });
    },
    slideTo(index) {
      this.swiperInstance.slideTo(index, 400, false);
    },
    slideNext() {
      this.swiperInstance.slideNext(400);
    },
    slidePrev() {
      this.swiperInstance.slidePrev(400);
    },
  },
  mounted() {
    this.initSwiper();
  },
  created() {
    this.uniqueID = wwLib.wwUtils.getUniqueId();
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
    z-index: 1000;

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

.swiper-slide {
  position: relative;
  text-align: center;
  font-size: 18px;
  background: #fff;

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
  z-index: 1000;
}

.layout-next {
  width: 100px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 1000;
}
</style>
