<template>
  <div class="swiper-container">
    <swiper
      :key="componentKey"
      class="swiper"
      :class="sliderType"
      ref="swiper"
      :options="swiperOption"
      :auto-update="true"
    >
      <swiper-slide v-for="(slide, index) in content.slides" :key="index">
        Slide {{ index + 1 }}
      </swiper-slide>
      <div
        class="swiper-pagination"
        v-show="content.pagination"
        slot="pagination"
      ></div>
      <div
        class="swiper-button-prev"
        slot="button-prev"
        v-show="content.navigation"
      ></div>
      <div
        class="swiper-button-next"
        slot="button-next"
        v-show="content.navigation"
      ></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    content: { type: "Object", required: true },
  },
  wwDefaultContent: {
    slides: 3,
    slidesPerView: 1,
    slidesPerColumn: 1,
    direction: "horizontal",
    effect: "slide",
    navigation: true,
    loop: true,
    pagination: true,
  },
  data() {
    return {
      swiperOption: {
        effect: this.content.effect,
        slidesPerView: this.content.slidesPerView,
        slidesPerColumn: this.content.slidesPerColumn,
        direction: this.content.direction,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
      },
      componentKey: 0,
    };
  },
  computed: {
    swiper() {
      return this.$refs.swiper.$swiper;
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
    content() {
      console.log(this.swiper);
    },
    "content.direction"() {
      this.swiper.changeDirection(this.content.direction);
      this.forceRerender();
    },
    "content.slidesPerView"() {
      this.swiper.params.slidesPerView = this.content.slidesPerView;
      this.forceRerender();
    },
    "content.slidesPerColumn"() {
      this.swiper.params.slidesPerColumn = this.content.slidesPerColumn;
      this.forceRerender();
    },
    "content.effect"() {
      this.swiper.params.effect = this.content.effect;
      this.forceRerender();
    },
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
      console.log("rerendered : ", this.componentKey);
      console.log(this.swiper);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
// .swiper-container {
//   position: relative;
//   overflow: hidden;
//   padding: 5%;
// }

.swiper {
  height: 100%;
  width: 100%;

  // &.cube {
  //   width: 300px !important;
  //   height: 300px;
  //   position: absolute;
  //   left: 50%;
  //   top: 50%;
  //   margin-left: -150px;
  //   margin-top: -150px;

  //   .swiper-slide {
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     text-align: center;
  //     font-weight: bold;
  //     font-size: 12px;
  //     background-color: #2c8dfb;
  //     background-position: center;
  //     background-size: cover;
  //     color: white;
  //   }

  //   .swiper-pagination {
  //     /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
  //       background-color: white;
  //     }
  //   }
  // }
}
</style>
