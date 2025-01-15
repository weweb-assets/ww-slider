---
name: ww-slider
description: The ww-slider component creates customizable carousels/sliders with multiple slides, offering transition effects, navigation, pagination controls, and Swiper library integration.
keywords:
  - carousel
  - slider
  - transition effects
  - autoplay
  - pagination controls
  - navigation arrows
  - swiper integration
  - mousewheel control
  - slide components
  - loop functionality
---

#### ww-slider

Component Purpose: Creates carousel/slider with multiple slides, providing effects, transitions, navigation and pagination controls.

Properties:
- mainLayoutContent: Array(object)|object - Array of slide components or data collection
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
- mainLayoutContent: Array(any) - Slide components
- navigationIcons: Array(Component(ww-icon)) - Previous/next navigation icons
- bulletsIcons: Component(ww-icon) - Pagination bullet icons

Example:
{"tag":"ww-slider","name":"Content Slider","props":{"default":{"loop":false,"effect":"slide"},"automatic":false,"navigation":true,"pagination":true,"spaceBetween":"0px","slidesPerView":1},"styles":{"default":{"width":"100%","height":"auto"}},"children":{"bulletsIcons":{"tag":"ww-icon","props":{"default":{"icon":"fas fa-circle"}}},"navigationIcons":[{"tag":"ww-icon","props":{"default":{"icon":"fas fa-chevron-left"}}},{"tag":"ww-icon","props":{"default":{"icon":"fas fa-chevron-right"}}}],"mainLayoutContent":[{"tag":"ww-flexbox","children":{"children":[{"tag":"ww-text","props":{"default":{"text":{"en":"<div>Slide 1</div>"}}}}]}}]}}

Events: none

Variables: none