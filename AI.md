---
name: ww-slider
description: The ww-slider element creates customizable carousels/sliders with multiple slides, offering transition effects, navigation, pagination controls, and Swiper library integration.
keywords:
  - carousel
  - slider
  - transition effects
  - autoplay
  - pagination controls
  - navigation arrows
  - swiper integration
  - mousewheel control
  - slide elements
  - loop functionality
---

#### ww-slider

Element Purpose: Creates carousel/slider with multiple slides, providing effects, transitions, navigation and pagination controls.

Properties:
- slidesPerView: number - Number of slides to display (default: 1)
- spaceBetween: string - Space between slides (default: "")
- effect: 'slide'|'fade'|'coverflow'|'flip'|'cards' - Transition effect (default: "slide")
- transitionDuration: string - Transition duration (default: "0ms")
- navigation: boolean - Show navigation arrows (default: true)
- pagination: boolean - Show pagination bullets (default: false)
- loop: boolean - Loop slides infinitely (default: false)
- automatic: boolean - Autoplay slides (default: false)
- automaticTiming: string - Autoplay timing (default: "3s")
- linearTransition: boolean - Use linear transition (default: false)
- mousewheel: boolean - Enable mousewheel control (default: false)
- mousewheelForceToAxis: boolean - Force mousewheel to axis (default: false)
- mousewheelInvert: boolean - Invert mousewheel direction (default: false)
- mousewheelSensitivity: number - Mousewheel sensitivity (default: 1)

Children:
- mainLayoutContent: any[] - Slide elements
- navigationIcons: ww-icon[] - Previous/next navigation icons
- bulletsIcons: ww-icon - Pagination bullet icons

Example:
<elements>
{"uid":0,"tag":"ww-slider","name":"Main Slider","props":{"default":{"effect":"slide","transitionDuration":"300ms","navigation":true,"pagination":true,"loop":true,"automatic":true,"automaticTiming":"5000ms","spaceBetween":"24px","slidesPerView":1,"linearTransition":false,"mousewheel":false,"mousewheelForceToAxis":false,"mousewheelInvert":false,"mousewheelSensitivity":1},"tablet":{"slidesPerView":1},"mobile":{"slidesPerView":1}},"styles":{"default":{"width":"100%","height":"500px","borderRadius":"16px","boxShadow":"0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)"}},"children":{"navigationIcons":[{"uid":1},{"uid":2}],"bulletsIcons":{"uid":3},"mainLayoutContent":[{"uid":4},{"uid":9},{"uid":14}]}}
{"uid":1,"tag":"ww-icon","name":"Previous Arrow","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"icon":"fas fa-chevron-left","color":"#ffffff","fontSize":"20"}},"styles":{"default":{"padding":"16px","opacity":"0.9","transition":"all 0.3s ease","borderRadius":"50%","cursor":"pointer","backgroundColor":"#3b82f6","margin":"0 0 0 10px"},"_wwHover_default":{"opacity":"1","transform":"scale(1.05)"}}}
{"uid":2,"tag":"ww-icon","name":"Next Arrow","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"icon":"fas fa-chevron-right","color":"#ffffff","fontSize":"20"}},"styles":{"default":{"padding":"16px","opacity":"0.9","transition":"all 0.3s ease","borderRadius":"50%","cursor":"pointer","backgroundColor":"#3b82f6","margin":"0 10px 0 0"},"_wwHover_default":{"opacity":"1","transform":"scale(1.05)"}}}
{"uid":3,"tag":"ww-icon","name":"Bullet Icon","props":{"default":{"icon":"fas fa-circle","color":"#3b82f6","fontSize":"8"}},"styles":{"default":{"opacity":"0.5","transition":"all 0.3s ease"}}}
{"uid":4,"tag":"ww-flexbox","name":"Slide 1","styles":{"default":{"display":"block","width":"100%","height":"100%","overflow":"hidden","position":"relative"}},"children":{"children":[{"uid":5},{"uid":6}]}}
{"uid":5,"tag":"ww-image","name":"Slide 1 Image","props":{"default":{"url":"https://images.unsplash.com/photo-1441974231531-c6227db76b6e","alt":{"en":"Nature landscape"},"objectFit":"cover","loading":"lazy"}},"styles":{"default":{"width":"100%","height":"100%"}}}
{"uid":6,"tag":"ww-flexbox","name":"Slide 1 Content","styles":{"default":{"display":"block","zIndex":1,"padding":"32px","position":"absolute","left":"0","bottom":"0","right":"0","backgroundColor":"linear-gradient(to top, rgba(0,0,0,0.8), transparent)"}},"children":{"children":[{"uid":7},{"uid":8}]}}
{"uid":7,"tag":"ww-text","name":"Slide 1 Title","props":{"default":{"tag":"h2","text":{"en":"Discover Nature's Beauty"}}},"styles":{"default":{"margin":"0 0 16px 0","fontSize":"28px","fontWeight":"600","color":"#ffffff"}}}
{"uid":8,"tag":"ww-text","name":"Slide 1 Description","props":{"default":{"text":{"en":"Explore the breathtaking landscapes and natural wonders"},"tag":"p"}},"styles":{"default":{"opacity":"0.9","fontSize":"16px","color":"#ffffff"}}}
{"uid":9,"tag":"ww-flexbox","name":"Slide 2","styles":{"default":{"display":"block","width":"100%","height":"100%","overflow":"hidden","position":"relative"}},"children":{"children":[{"uid":10},{"uid":11}]}}
{"uid":10,"tag":"ww-image","name":"Slide 2 Image","props":{"default":{"url":"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05","alt":{"en":"Mountain view"},"objectFit":"cover","loading":"lazy"}},"styles":{"default":{"width":"100%","height":"100%"}}}
{"uid":11,"tag":"ww-flexbox","name":"Slide 2 Content","styles":{"default":{"display":"block","zIndex":1,"padding":"32px","position":"absolute","left":"0","bottom":"0","right":"0","backgroundColor":"linear-gradient(to top, rgba(0,0,0,0.8), transparent)"}},"children":{"children":[{"uid":12},{"uid":13}]}}
{"uid":12,"tag":"ww-text","name":"Slide 2 Title","props":{"default":{"tag":"h2","text":{"en":"Mountain Adventures"}}},"styles":{"default":{"margin":"0 0 16px 0","fontSize":"28px","fontWeight":"600","color":"#ffffff"}}}
{"uid":13,"tag":"ww-text","name":"Slide 2 Description","props":{"default":{"text":{"en":"Experience the thrill of mountain exploration"},"tag":"p"}},"styles":{"default":{"opacity":"0.9","fontSize":"16px","color":"#ffffff"}}}
{"uid":14,"tag":"ww-flexbox","name":"Slide 3","styles":{"default":{"display":"block","width":"100%","height":"100%","overflow":"hidden","position":"relative"}},"children":{"children":[{"uid":15},{"uid":16}]}}
{"uid":15,"tag":"ww-image","name":"Slide 3 Image","props":{"default":{"url":"https://images.unsplash.com/photo-1426604966848-d7adac402bff","alt":{"en":"Forest view"},"objectFit":"cover","loading":"lazy"}},"styles":{"default":{"width":"100%","height":"100%"}}}
{"uid":16,"tag":"ww-flexbox","name":"Slide 3 Content","styles":{"default":{"display":"block","zIndex":1,"padding":"32px","position":"absolute","left":"0","bottom":"0","right":"0","backgroundColor":"linear-gradient(to top, rgba(0,0,0,0.8), transparent)"}},"children":{"children":[{"uid":17},{"uid":18}]}}
{"uid":17,"tag":"ww-text","name":"Slide 3 Title","props":{"default":{"tag":"h2","text":{"en":"Forest Serenity"}}},"styles":{"default":{"margin":"0 0 16px 0","fontSize":"28px","fontWeight":"600","color":"#ffffff"}}}
{"uid":18,"tag":"ww-text","name":"Slide 3 Description","props":{"default":{"text":{"en":"Find peace in the tranquility of ancient forests"},"tag":"p"}},"styles":{"default":{"opacity":"0.9","fontSize":"16px","color":"#ffffff"}}}
</elements>

Events: none

Variables: none

**CRITICAL** If ww-slider is a (sub)children of a ww-div grid, set to the DIRECT CHILDREN OF THE GRID 'overflow hidden' style. Pattern to apply : ... > ww-div (grid) > ww-div (**set overflow hidden**) > ... > ww-slider
