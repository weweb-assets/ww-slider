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

Context:
slider:
- context.local.data?.['slider']?.['sliderIndex'] - Current slide index
- context.local.data?.['slider']?.['nbOfSlides'] - Total number of slides
- context.local.data?.['slider']?.['slidesPerView'] - Number of slides visible at once
- context.local.data?.['slider']?.['showLeftNav'] - Whether left navigation is visible
- context.local.data?.['slider']?.['showRightNav'] - Whether right navigation is visible
- context.local.data?.['slider']?.['numberOfBullets'] - Number of pagination bullets
bullet only local context:
- context.local.data?.['bullet']?.['isCurrent'] - true if current bullet
- context.local.data?.['bullet']?.['currentBulletIndex'] - current bullet index

Example:
<elements>
{"uid":0,"tag":"ww-slider","name":"Main Slider","props":{"default":{"loop":true,"effect":"coverflow","automatic":true,"mousewheel":true,"navigation":true,"pagination":true,"spaceBetween":"0px","slidesPerView":1,"automaticTiming":"5000ms","linearTransition":false,"mousewheelInvert":false,"transitionDuration":"800ms","mousewheelForceToAxis":false,"mousewheelSensitivity":1}},"styles":{"default":{"width":"100%","height":"600px"}},"children":{"bulletsIcons":{"uid":1},"navigationIcons":[{"uid":2},{"uid":3}],"mainLayoutContent":[{"uid":4},{"uid":10},{"uid":16},{"uid":22}]}}
{"uid":1,"tag":"ww-icon","name":"Bullet Icon","props":{"default":{"icon":"lucide/circle","color":"#ffffff"}},"styles":{"default":{"opacity":"0.5","transform":"scale(0.8)","transition":"all 0.3s ease","borderRadius":"100%","backgroundColor":{"wwFormula":"context.local.data?.['bullet']?.['isCurrent']  ? 'white' : undefined"}}}}
{"uid":2,"tag":"ww-icon","name":"Previous Arrow","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"icon":"lucide/chevron-left","color":"#ffffff"}},"styles":{"default":{"cursor":"pointer","margin":"0 0 0 20px","opacity":"0.9","padding":"20px","transform":"translateX(20px)","transition":"all 0.4s cubic-bezier(0.4, 0, 0.2, 1)","borderRadius":"50%","backgroundColor":"rgba(0, 0, 0, 0.5)","backdropFilter":"blur(8px)"},"_wwHover_default":{"opacity":"1","transform":"translateX(0) scale(1.05)","backgroundColor":"rgba(0, 0, 0, 0.7)"}}}
{"uid":3,"tag":"ww-icon","name":"Next Arrow","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"icon":"lucide/chevron-right","color":"#ffffff"}},"styles":{"default":{"cursor":"pointer","margin":"0 20px 0 0","opacity":"0.9","padding":"20px","transform":"translateX(-20px)","transition":"all 0.4s cubic-bezier(0.4, 0, 0.2, 1)","borderRadius":"50%","backgroundColor":"rgba(0, 0, 0, 0.5)","backdropFilter":"blur(8px)"},"_wwHover_default":{"opacity":"1","transform":"translateX(0) scale(1.05)","backgroundColor":"rgba(0, 0, 0, 0.7)"}}}
{"uid":4,"tag":"ww-flexbox","name":"Slide 1","styles":{"default":{"width":"100%","height":"100%","display":"block","overflow":"hidden","position":"relative"}},"children":{"children":[{"uid":5},{"uid":6}]}}
{"uid":5,"tag":"ww-image","name":"Slide 1 Image","props":{"default":{"alt":{"en":"Modern Architecture"},"url":"https://images.unsplash.com/photo-1682687220742-aba13b6e50ba","loading":"lazy","objectFit":"cover"}},"styles":{"default":{"width":"100%","height":"100%","transform":"scale(1.1)","transition":"transform 8s ease"}}}
{"uid":6,"tag":"ww-flexbox","name":"Slide 1 Content","styles":{"default":{"left":"0","right":"0","bottom":"0","display":"flex","padding":"120px 60px 60px","position":"absolute","backgroundColor":"linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)","rowGap":"16px","columnGap":"16px","flexDirection":"column"}},"children":{"children":[{"uid":7},{"uid":8},{"uid":9}]}}
{"uid":7,"tag":"ww-text","name":"Slide 1 Subtitle","props":{"default":{"tag":"p","text":{"en":"ARCHITECTURAL INNOVATION"}}},"styles":{"default":{"opacity":"0","transform":"translateY(20px)","animationDelay":"0.2s","animationDuration":"0.8s","animationFillMode":"forwards","animationIterationCount":"1","animationTimingFunction":"cubic-bezier(0.4, 0, 0.2, 1)","color":"#94a3b8","fontSize":"14px","fontWeight":"600","letterSpacing":"2px"}}}
{"uid":8,"tag":"ww-text","name":"Slide 1 Title","props":{"default":{"tag":"h2","text":{"en":"Future of Urban Design"}}},"styles":{"default":{"opacity":"0","transform":"translateY(20px)","animationDelay":"0.4s","animationDuration":"0.8s","animationFillMode":"forwards","animationIterationCount":"1","animationTimingFunction":"cubic-bezier(0.4, 0, 0.2, 1)","color":"#ffffff","fontSize":"48px","fontWeight":"700","lineHeight":"1.2"}}}
{"uid":9,"tag":"ww-text","name":"Slide 1 Description","props":{"default":{"tag":"p","text":{"en":"Discover how modern architecture is reshaping our cities and creating sustainable spaces for tomorrow."}}},"styles":{"default":{"opacity":"0","maxWidth":"600px","transform":"translateY(20px)","animationDelay":"0.6s","animationDuration":"0.8s","animationFillMode":"forwards","animationIterationCount":"1","animationTimingFunction":"cubic-bezier(0.4, 0, 0.2, 1)","color":"#e2e8f0","fontSize":"18px","lineHeight":"1.6"}}}
{"uid":10,"tag":"ww-flexbox","name":"Slide 2","styles":{"default":{"width":"100%","height":"100%","display":"block","overflow":"hidden","position":"relative"}},"children":{"children":[{"uid":11},{"uid":12}]}}
{"uid":11,"tag":"ww-image","name":"Slide 2 Image","props":{"default":{"alt":{"en":"Sustainable Living"},"url":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c","loading":"lazy","objectFit":"cover"}},"styles":{"default":{"width":"100%","height":"100%","transform":"scale(1.1)","transition":"transform 8s ease"}}}
{"uid":12,"tag":"ww-flexbox","name":"Slide 2 Content","styles":{"default":{"left":"0","right":"0","bottom":"0","display":"flex","padding":"120px 60px 60px","position":"absolute","backgroundColor":"linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)","rowGap":"16px","columnGap":"16px","flexDirection":"column"}},"children":{"children":[{"uid":13},{"uid":14},{"uid":15}]}}
{"uid":13,"tag":"ww-text","name":"Slide 2 Subtitle","props":{"default":{"tag":"p","text":{"en":"SUSTAINABLE LIVING"}}},"styles":{"default":{"opacity":"0","transform":"translateY(20px)","animationDelay":"0.2s","animationDuration":"0.8s","animationFillMode":"forwards","animationIterationCount":"1","animationTimingFunction":"cubic-bezier(0.4, 0, 0.2, 1)","color":"#94a3b8","fontSize":"14px","fontWeight":"600","letterSpacing":"2px"}}}
{"uid":14,"tag":"ww-text","name":"Slide 2 Title","props":{"default":{"tag":"h2","text":{"en":"Eco-Friendly Spaces"}}},"styles":{"default":{"opacity":"0","transform":"translateY(20px)","animationDelay":"0.4s","animationDuration":"0.8s","animationFillMode":"forwards","animationIterationCount":"1","animationTimingFunction":"cubic-bezier(0.4, 0, 0.2, 1)","color":"#ffffff","fontSize":"48px","fontWeight":"700","lineHeight":"1.2"}}}
{"uid":15,"tag":"ww-text","name":"Slide 2 Description","props":{"default":{"tag":"p","text":{"en":"Experience the perfect blend of luxury and sustainability in our environmentally conscious developments."}}},"styles":{"default":{"opacity":"0","maxWidth":"600px","transform":"translateY(20px)","animationDelay":"0.6s","animationDuration":"0.8s","animationFillMode":"forwards","animationIterationCount":"1","animationTimingFunction":"cubic-bezier(0.4, 0, 0.2, 1)","color":"#e2e8f0","fontSize":"18px","lineHeight":"1.6"}}}
{"uid":16,"tag":"ww-flexbox","name":"Slide 3","styles":{"default":{"width":"100%","height":"100%","display":"block","overflow":"hidden","position":"relative"}},"children":{"children":[{"uid":17},{"uid":18}]}}
{"uid":17,"tag":"ww-image","name":"Slide 3 Image","props":{"default":{"alt":{"en":"Smart Living"},"url":"https://images.unsplash.com/photo-1682687220199-d0124f48f95b","loading":"lazy","objectFit":"cover"}},"styles":{"default":{"width":"100%","height":"100%","transform":"scale(1.1)","transition":"transform 8s ease"}}}
{"uid":18,"tag":"ww-flexbox","name":"Slide 3 Content","styles":{"default":{"left":"0","right":"0","bottom":"0","display":"flex","padding":"120px 60px 60px","position":"absolute","backgroundColor":"linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)","rowGap":"16px","columnGap":"16px","flexDirection":"column"}},"children":{"children":[{"uid":19},{"uid":20},{"uid":21}]}}
{"uid":19,"tag":"ww-text","name":"Slide 3 Subtitle","props":{"default":{"tag":"p","text":{"en":"SMART LIVING"}}},"styles":{"default":{"opacity":"0","transform":"translateY(20px)","animationDelay":"0.2s","animationDuration":"0.8s","animationFillMode":"forwards","animationIterationCount":"1","animationTimingFunction":"cubic-bezier(0.4, 0, 0.2, 1)","color":"#94a3b8","fontSize":"14px","fontWeight":"600","letterSpacing":"2px"}}}
{"uid":20,"tag":"ww-text","name":"Slide 3 Title","props":{"default":{"tag":"h2","text":{"en":"Connected Communities"}}},"styles":{"default":{"opacity":"0","transform":"translateY(20px)","animationDelay":"0.4s","animationDuration":"0.8s","animationFillMode":"forwards","animationIterationCount":"1","animationTimingFunction":"cubic-bezier(0.4, 0, 0.2, 1)","color":"#ffffff","fontSize":"48px","fontWeight":"700","lineHeight":"1.2"}}}
{"uid":21,"tag":"ww-text","name":"Slide 3 Description","props":{"default":{"tag":"p","text":{"en":"Embrace the future with smart home technology and connected community features."}}},"styles":{"default":{"opacity":"0","maxWidth":"600px","transform":"translateY(20px)","animationDelay":"0.6s","animationDuration":"0.8s","animationFillMode":"forwards","animationIterationCount":"1","animationTimingFunction":"cubic-bezier(0.4, 0, 0.2, 1)","color":"#e2e8f0","fontSize":"18px","lineHeight":"1.6"}}}
{"uid":22,"tag":"ww-flexbox","name":"Slide 4","styles":{"default":{"display":"block","width":"100%","height":"100%","overflow":"hidden","position":"relative"}},"children":{"children":[{"uid":23},{"uid":24}]}}
{"uid":23,"tag":"ww-image","name":"Slide 4 Image","props":{"default":{"alt":{"en":"Luxury Interior"},"url":"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c","loading":"lazy","objectFit":"cover"}},"styles":{"default":{"width":"100%","height":"100%","transition":"transform 8s ease","transform":"scale(1.1)"}}}
{"uid":24,"tag":"ww-flexbox","name":"Slide 4 Content","styles":{"default":{"display":"flex","padding":"120px 60px 60px","position":"absolute","left":"0","bottom":"0","right":"0","backgroundColor":"linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)","flexDirection":"column","rowGap":"16px","columnGap":"16px"}},"children":{"children":[{"uid":25},{"uid":26},{"uid":27}]}}
{"uid":25,"tag":"ww-text","name":"Slide 4 Subtitle","props":{"default":{"tag":"p","text":{"en":"LUXURY LIVING"}}},"styles":{"default":{"opacity":"0","transform":"translateY(20px)","animationDuration":"0.8s","animationIterationCount":"1","animationTimingFunction":"cubic-bezier(0.4, 0, 0.2, 1)","animationFillMode":"forwards","animationDelay":"0.2s","fontSize":"14px","fontWeight":"600","color":"#94a3b8","letterSpacing":"2px"}}}
{"uid":26,"tag":"ww-text","name":"Slide 4 Title","props":{"default":{"tag":"h2","text":{"en":"Premium Interiors"}}},"styles":{"default":{"opacity":"0","transform":"translateY(20px)","animationDuration":"0.8s","animationIterationCount":"1","animationTimingFunction":"cubic-bezier(0.4, 0, 0.2, 1)","animationFillMode":"forwards","animationDelay":"0.4s","fontSize":"48px","fontWeight":"700","lineHeight":"1.2","color":"#ffffff"}}}
{"uid":27,"tag":"ww-text","name":"Slide 4 Description","props":{"default":{"tag":"p","text":{"en":"Experience unparalleled luxury with our meticulously designed interior spaces."}}},"styles":{"default":{"opacity":"0","maxWidth":"600px","transform":"translateY(20px)","animationDuration":"0.8s","animationIterationCount":"1","animationTimingFunction":"cubic-bezier(0.4, 0, 0.2, 1)","animationFillMode":"forwards","animationDelay":"0.6s","fontSize":"18px","lineHeight":"1.6","color":"#e2e8f0"}}}
</elements>

**CRITICAL** If ww-slider is a (sub)children of a ww-div grid, set to the DIRECT CHILDREN OF THE GRID 'overflow hidden' style. Pattern to apply : ... > ww-div (grid) > ww-div (**set overflow hidden**) > ... > ww-slider
