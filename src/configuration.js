const options = (content) => {
  return {
    slides: {
      path: "slides",
      label: { en: "Slides", fr: "Slides" },
      type: "Tabs",
      itemsLabel: "Slide",
    },
    slidesPerView: {
      type: "Number",
      label: {
        en: "Slides per view",
        fr: "Slides per view",
      },
      options: {
        min: 1,
        max: 6,
        step: 1,
      },
    },
    spaceBetween: {
      type: "Length",
      label: {
        en: "Space between",
        fr: "Space between",
      },
      options: {
        unitChoices: [{ value: "px", label: "px", min: 1, max: 1000 }],
      },
    },
    effect: {
      label: {
        en: "Effect",
        fr: "Effect",
      },
      type: "TextSelect",
      options: {
        options: [
          { value: "slide", label: { en: "slide" } },
          { value: "fade", label: { en: "fade" } },
        ],
      },
    },
    transitionDuration: {
      type: "Length",
      label: {
        en: "Transition duration",
        fr: "Transition duration",
      },
      options: {
        unitChoices: [{ value: "ms", label: "ms", min: 1, max: 5000 }],
      },
    },
    navigation: {
      type: "OnOff",
      label: {
        en: "Navigation",
        fr: "Navigation",
      },
    },
    pagination: {
      type: "OnOff",
      label: {
        en: "Pagination",
        fr: "Pagination",
      },
    },
    loop: {
      type: "OnOff",
      label: {
        en: "Loop",
        fr: "Loop",
      },
    },
    automatic: {
      type: "OnOff",
      label: {
        en: "Automatic",
        fr: "Automatic",
      },
    },
    ...(function() {
      return content.automatic
        ? {
            automaticTiming: {
              type: "Length",
              label: {
                en: "Timing",
                fr: "Timing",
              },
              options: {
                unitChoices: [{ value: "s", label: "s", min: 1, max: 20 }],
              },
            },
          }
        : {};
    })(),
  };
};

export const getSettingsConfigurations = (content) => {
  return { settingsOptions: { ...options(content) } };
};
