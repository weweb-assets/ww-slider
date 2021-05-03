<template>
  <div class="element-container">
    <!-- Slider main container -->
    <div class="swiper-container">
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
          <!-- slide {{ index + 1 }} of {{ content.slides.items.length }} -->
        </div>
      </div>

      <div class="bullets" v-show="content.pagination">
        <div
          class="bullet-container"
          @click="slideTo(index)"
          v-for="(slide, index) in content.slides.items"
          :key="index"
        >
          <wwObject class="bulletIcon" v-bind="content.bulletsIcons"></wwObject>
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
  </div>
</template>

<script>
// import Swiper JS
import Swiper from "swiper/bundle";
// import Swiper styles
import "swiper/swiper-bundle.css";
import { nextTick } from "vue/types/umd";

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
    direction: "horizontal",
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
    sliderType() {
      switch (this.content.effect) {
        case "cube":
          return "cube";
        case "coverflow":
          return "coverflow";

        default:
          return "fade";
      }
    },
  },
  watch: {
    "content.direction"() {
      this.swiperInstance.destroy();
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
    "content.effect"() {
      this.swiperInstance.destroy();
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
    "content.slides"() {
      this.swiperInstance.destroy();
      this.$nextTick(() => {
        this.initSwiper();
        this.currentSlide = this.content.slides.items.findIndex(
          (item) => item.checked
        );
        this.swiperInstance.slideTo(this.currentSlide + 1, 0, false);
      });
    },
    "content.slidesPerView"() {
      this.swiperInstance.destroy();
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
    "content.spaceBetween"() {
      this.swiperInstance.destroy();
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
    "content.loop"() {
      this.swiperInstance.destroy();
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
  },
  methods: {
    initSwiper() {
      this.swiperInstance = new Swiper(".swiper-container", {
        // Optional parameters
        effect: this.content.effect,
        slidesPerView: this.content.slidesPerView,
        spaceBetween: parseInt(this.content.spaceBetween.slice(0, -2)),
        direction: this.content.direction,
        loop: this.content.loop,

        // If we need pagination
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        // And if we need scrollbar
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });

      this.swiperInstance.on("slideChange", () => {
        console.log("changed");
        // let slides = _.cloneDeep(this.content.slides);
        // for (let item of slides.items) {
        //   item.checked = false;
        // }
        // console.log(slides);
        // slides.items[this.swiperInstance.realIndex].checked = true;
        // console.log(slides);
        // this.$emit("update", { slides });
        // const bulletsLayoutStates = [];
        // for (let bullet in this.content.slides.items) {
        //   bulletsLayoutStates.push([""]);
        // }
        // bulletsLayoutStates[this.swiperInstance.realIndex] = ["currentSlide"];
        // this.$emit("update", { bulletsLayoutStates });
      });
    },
    slideTo(index) {
      this.swiperInstance.slideTo(index + 1, 400, false);
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
};
</script>

<style lang="scss" scoped>
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

.bullets {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  display: flex;
  flex-direction: row;

  .bullet-container {
    height: 20px;
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

.swiper-pagination-bullet {
  width: 20px;
  height: 20px !important;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #000;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}

.swiper-pagination-bullet-active {
  color: #fff;
  background: #007aff;
}
</style>
