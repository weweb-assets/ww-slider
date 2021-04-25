<template>
  <!-- Slider main container -->
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div
        class="swiper-slide"
        v-for="(slide, index) in content.slides"
        :key="index"
      >
        {{ "Slide " + (index + 1) }}
      </div>
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev" @click="prevSlide"></div>
    <div class="swiper-button-next" @click="nextSlide"></div>

    <!-- If we need scrollbar -->
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
// import Swiper JS
import Swiper from "swiper";
// import Swiper styles
import "swiper/swiper-bundle.css";

export default {
  props: {
    content: { type: "Object", required: true },
  },
  wwDefaultContent: {
    slides: 3,
    slidesPerView: 1,
    direction: "horizontal",
    loop: true,
  },
  data() {
    return {
      swiper: null,
      swiperInstance: null,
    };
  },
  watch: {
    content() {
      this.resetSlider();
      this.initSlider();
    },
  },
  methods: {
    prevSlide() {
      this.swiperInstance.slidePrev();
    },
    nextSlide() {
      this.swiperInstance.slideNext();
    },
    initSlider() {
      this.$nextTick(() => {
        this.swiper = new Swiper(".swiper-container", {
          // Optional parameters
          slidesPerView: this.content.slidesPerView,
          spaceBetween: 30,
          direction: this.content.direction,
          loop: this.content.loop,

          pagination: {
            el: ".swiper-pagination",
            type: "bullets",
          },

          // Navigation arrows
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });

        this.swiperInstance = wwLib
          .getFrontDocument()
          .querySelector(".swiper-container").swiper;

        console.log(this.swiperInstance);
      });
    },
    resetSlider() {
      this.swiper = null;
    },
  },
  mounted() {
    this.initSlider();
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
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
}
</style>
