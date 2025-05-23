---
name: ww-slider
description: The ww-slider element creates customizable carousels/sliders with multiple slides, offering transition effects, navigation, pagination controls, and Swiper library integration.
keywords: carousel, slider, transition effects, autoplay, pagination controls, navigation arrows, swiper integration, mousewheel control, slide elements, loop functionality
---

#### ww-slider

***Purpose:***
Creates carousel/slider with multiple slides, providing effects, transitions, navigation and pagination controls.

***Properties:***
- slidesPerView: number - Number of slides to display (default: 1)
- spaceBetween: string - Space between slides (default: "")
- effect: 'slide'|'fade'|'coverflow'|'flip'|'cards' - Transition effect (default: "slide")
- transitionDuration: string - Transition duration in milliseconds (default: "0ms").
- navigation: boolean - Show navigation arrows (default: true)
- pagination: boolean - Show pagination bullets (default: false)
- loop: boolean - Loop slides infinitely (default: false)
- automatic: boolean - Autoplay slides (default: false)
- automaticTiming: string - Autoplay timing in seconds (default: "3s").
- linearTransition: boolean - Use linear transition (default: false)
- mousewheel: boolean - Enable mousewheel control (default: false)
- mousewheelForceToAxis: boolean - Force mousewheel to axis (default: false)
- mousewheelInvert: boolean - Invert mousewheel direction (default: false)
- mousewheelSensitivity: number - Mousewheel sensitivity (default: 1)

***Slots:***
- mainLayoutContent: any[] - Slide elements. Each element in this list is the root of a slide.
- navigationIcons: ww-icon[] - Array of 2 ww-icon that are the left and right icons. They are already centered verticaly in the slider. You can set them to absolute position and play with left or right to position them.
- bulletsIcons: ww-icon - Single ww-icon that will be used as a bullet at the bottom of the slider.

***Context data (only accessible to this element and its slots): ***
WARNING: Context data cannot be accessed outside of the slider: this is a context local to the slider.
DO NOT use this context outside of the slider and its slots.
- context.local.data?.['slider']?.['sliderIndex'] - Current slide index
- context.local.data?.['slider']?.['nbOfSlides'] - Total number of slides
- context.local.data?.['slider']?.['slidesPerView'] - Number of slides visible at once
- context.local.data?.['slider']?.['showLeftNav'] - Whether left navigation is visible
- context.local.data?.['slider']?.['showRightNav'] - Whether right navigation is visible
- context.local.data?.['slider']?.['numberOfBullets'] - Number of pagination bullets
- context.local.data?.['slider']?.['slideImageStates'] - Object containing image loading states per slide with structure: slideImageStates[slideIndex] = { images: { [imageIndex]: { isLoading, isLoaded, hasError } }, loadedCount, isLoaded, loadingCount, isLoading, errorCount, hasError }
- context.local.data?.['slider']?.['allImagesLoaded'] - Boolean indicating if all images across all slides have finished loading successfully
- context.local.data?.['bullet']?.['isCurrent'] - true if current bullet
- context.local.data?.['bullet']?.['currentBulletIndex'] - current bullet index

***Exposed Variables:***
- slideImageStates: ***READ ONLY*** Object containing image loading states per slide with slide-level aggregates. Structure: { [slideIndex]: { images: { [imageIndex]: { isLoading, isLoaded, hasError } }, loadedCount, isLoaded, loadingCount, isLoading, errorCount, hasError } }. (path: variables['current_element_uid-slideImageStates'])
- allImagesLoaded: ***READ ONLY*** Boolean indicating if all images across all slides have finished loading successfully. (path: variables['current_element_uid-allImagesLoaded'])

***Notes:***
**CRITICAL** If ww-slider is a (sub)children of a ww-div grid, set to the DIRECT CHILDREN OF THE GRID 'overflow hidden' style. Pattern to apply : ... > ww-div (grid) > ww-div (**set overflow hidden**) > ... > ww-slider

***Example:***
<elements>
{"uid":"slider","tag":"ww-slider","name":"Slider","props":{"default":{"loop":true,"effect":"coverflow","automatic":true,"mousewheel":true,"navigation":true,"pagination":true,"spaceBetween":"0px","slidesPerView":1,"automaticTiming":"5s","linearTransition":false,"mousewheelInvert":false,"transitionDuration":"800ms","mousewheelForceToAxis":false,"mousewheelSensitivity":1}},"styles":{"default":{"width":"100%","height":"600px"}},"slots":{"bulletsIcons":{"uid":"bullet_icon"},"navigationIcons":[{"uid":"previous_arrow"},{"uid":"next_arrow"}],"mainLayoutContent":[{"uid":"slide_1"},{"uid":"slide_2"},{"uid":"slide_3"}]}}
{"uid":"bullet_icon","tag":"ww-icon","name":"Bullet Icon","props":{"default":{"icon":"lucide/circle","color":"#ffffff"}},"styles":{"default":{"opacity":"0.5","transform":"scale(0.8)","transition":"all 0.3s ease","borderRadius":"100%","backgroundColor":{"js":"return context.local.data?.['bullet']?.['isCurrent']  ? 'white' : undefined"}}}}
{"uid":"previous_arrow","tag":"ww-icon","name":"Previous Arrow","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"icon":"lucide/chevron-left","color":"#ffffff"}},"styles":{"default":{"cursor":"pointer","borderRadius":"50%","backgroundColor":"rgba(0, 0, 0, 0.5)","position":"absolute","left":"10px"}}}
{"uid":"next_arrow","tag":"ww-icon","name":"Next Arrow","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"icon":"lucide/chevron-right","color":"#ffffff"}},"styles":{"default":{"cursor":"pointer","borderRadius":"50%","backgroundColor":"rgba(0, 0, 0, 0.5)","position":"absolute","right":"10px"}}}
{"uid":"slide_1","tag":"ww-flexbox","name":"Slide 1","styles":{"default":{"width":"100%","height":"100%","display":"block","overflow":"hidden","position":"relative"}},"children":{"children":[...]}}
{"uid":"slide_2","tag":"ww-flexbox","name":"Slide 2","styles":{"default":{"width":"100%","height":"100%","display":"block","overflow":"hidden","position":"relative"}},"children":{"children":[...]}}
{"uid":"slide_2","tag":"ww-flexbox","name":"Slide 3","styles":{"default":{"width":"100%","height":"100%","display":"block","overflow":"hidden","position":"relative"}},"children":{"children":[...]}}
</elements>
