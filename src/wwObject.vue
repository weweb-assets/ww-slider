<template>
  <!-- Slider main container -->
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
      ...
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

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
    slidesPerView: 1,
    direction: "horizontal",
    loop: false,
  },
  data() {
    return {
      swiper: null,
    };
  },
  watch: {
    content() {
      this.resetSlider();
      this.initSlider();
    },
  },
  methods: {
    initSlider() {
      this.$nextTick(() => {
        this.swiper = new Swiper(".swiper-container", {
          // Optional parameters
          slidesPerView: this.content.slidesPerView,
          spaceBetween: 30,
          direction: this.content.direction,
          loop: this.content.loop,

          // Navigation arrows
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
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
