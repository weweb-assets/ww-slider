import { ref, computed, nextTick, onBeforeUnmount } from 'vue';

export function useImageTracking(swiperRef, nbOfSlides) {
  const slideImageStates = ref({});
  const abortControllers = {};
  let mutationObserver = null;

  const initializeSlideImageState = (slideIndex, imageCount) => {
    slideImageStates.value[slideIndex] = {};
    for (let i = 0; i < imageCount; i++) {
      slideImageStates.value[slideIndex][i] = { 
        isLoading: true, 
        isLoaded: false, 
        hasError: false 
      };
    }
  };

  const updateImageState = (slideIndex, imageIndex, state) => {
    if (slideImageStates.value[slideIndex]?.[imageIndex]) {
      Object.assign(slideImageStates.value[slideIndex][imageIndex], state);
    }
  };

  const setupImageListeners = (slideIndex) => {
    const slideElement = swiperRef.value?.querySelector(`.swiper-slide:nth-child(${slideIndex + 1})`);
    if (!slideElement) return;
    
    const images = slideElement.querySelectorAll('img');
    
    // Cleanup existing controller
    if (abortControllers[slideIndex]) {
      abortControllers[slideIndex].abort();
    }
    
    // Create new controller for this slide
    const controller = new AbortController();
    abortControllers[slideIndex] = controller;
    
    // Initialize state for all images
    initializeSlideImageState(slideIndex, images.length);
    
    images.forEach((img, imageIndex) => {
      const handleLoad = () => {
        updateImageState(slideIndex, imageIndex, { 
          isLoading: false, 
          isLoaded: true, 
          hasError: false 
        });
      };
      
      const handleError = () => {
        updateImageState(slideIndex, imageIndex, { 
          isLoading: false, 
          isLoaded: false, 
          hasError: true 
        });
      };
      
      img.addEventListener('load', handleLoad, { signal: controller.signal });
      img.addEventListener('error', handleError, { signal: controller.signal });
      
      if (img.complete) {
        if (img.naturalWidth > 0) {
          handleLoad();
        } else {
          handleError();
        }
      }
    });
  };

  const setupMutationObserver = () => {
    if (!swiperRef.value) return;
    
    mutationObserver = new MutationObserver((mutations) => {
      const affectedSlides = new Set();
      
      mutations.forEach((mutation) => {
        // Check for added/removed img elements
        if (mutation.type === 'childList') {
          const hasImageChanges = Array.from(mutation.addedNodes).some(node => 
            node.nodeType === Node.ELEMENT_NODE && 
            (node.tagName === 'IMG' || node.querySelector?.('img'))
          ) || Array.from(mutation.removedNodes).some(node => 
            node.nodeType === Node.ELEMENT_NODE && 
            (node.tagName === 'IMG' || node.querySelector?.('img'))
          );
          
          if (hasImageChanges) {
            // Find which slide was affected - but only within THIS slider
            let slideElement = mutation.target;
            while (slideElement && slideElement !== swiperRef.value && !slideElement.classList.contains('swiper-slide')) {
              slideElement = slideElement.parentElement;
            }
            
            // Only proceed if we found a slide within this slider instance
            if (slideElement && slideElement.classList.contains('swiper-slide') && swiperRef.value.contains(slideElement)) {
              const slideIndex = Array.from(slideElement.parentElement.children).indexOf(slideElement);
              affectedSlides.add(slideIndex);
            }
          }
        }
        
        // Check for src attribute changes on img elements
        if (mutation.type === 'attributes' && mutation.attributeName === 'src' && mutation.target.tagName === 'IMG') {
          // Only proceed if the img is within this slider
          if (swiperRef.value.contains(mutation.target)) {
            let slideElement = mutation.target;
            while (slideElement && slideElement !== swiperRef.value && !slideElement.classList.contains('swiper-slide')) {
              slideElement = slideElement.parentElement;
            }
            
            if (slideElement && slideElement.classList.contains('swiper-slide')) {
              const slideIndex = Array.from(slideElement.parentElement.children).indexOf(slideElement);
              affectedSlides.add(slideIndex);
            }
          }
        }
      });
      
      // Re-setup listeners for affected slides
      affectedSlides.forEach(slideIndex => {
        setupImageListeners(slideIndex);
      });
    });
    
    // Observe only THIS slider's wrapper
    mutationObserver.observe(swiperRef.value, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src']
    });
  };

  const slideImageStatesWithAggregates = computed(() => {
    const states = slideImageStates.value;
    const result = {};
    
    for (const slideIndex in states) {
      const slideImages = states[slideIndex];
      let loadedCount = 0;
      let loadingCount = 0;
      let errorCount = 0;
      
      for (const imageIndex in slideImages) {
        const imageState = slideImages[imageIndex];
        if (imageState.isLoaded) loadedCount++;
        else if (imageState.isLoading) loadingCount++;
        else if (imageState.hasError) errorCount++;
      }
      
      result[slideIndex] = {
        images: slideImages,
        loadedCount,
        isLoaded: loadingCount === 0 && errorCount === 0 && loadedCount > 0,
        loadingCount,
        isLoading: loadingCount > 0,
        errorCount,
        hasError: errorCount > 0
      };
    }
    
    return result;
  });

  const allImagesLoaded = computed(() => {
    const states = slideImageStates.value;
    
    // Check if all slides have their images loaded
    for (const slideIndex in states) {
      const slideImages = states[slideIndex];
      for (const imageIndex in slideImages) {
        const imageState = slideImages[imageIndex];
        // If any image is still loading or has an error, not all are loaded
        if (imageState.isLoading || imageState.hasError) {
          return false;
        }
      }
    }
    
    return true;
  });

  const initImageTracking = () => {
    nextTick(() => {
      // Setup listeners for all current slides
      for (let i = 0; i < nbOfSlides.value; i++) {
        setupImageListeners(i);
      }
      
      // Setup mutation observer
      setupMutationObserver();
    });
  };

  const cleanup = () => {
    // Cleanup mutation observer
    if (mutationObserver) {
      mutationObserver.disconnect();
    }
    
    // Abort all controllers
    Object.values(abortControllers).forEach(controller => controller.abort());
  };

  // Cleanup on unmount
  onBeforeUnmount(cleanup);

  return {
    slideImageStates,
    slideImageStatesWithAggregates,
    allImagesLoaded,
    initImageTracking,
    cleanup
  };
}