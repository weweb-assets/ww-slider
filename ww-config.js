import { getContent } from './src/getContent.js';

export default {
    editor: {
        label: {
            en: 'Slider',
        },
        icon: 'slider',
        bubble: {
            icon: 'slider',
        },
        customSettingsPropertiesOrder: [
            ['mainLayoutContent', 'slideIndex'],
            ['slidesPerView', 'spaceBetween', 'effect', 'transitionDuration'],
            'navigation',
            'pagination',
            'loop',
            'automatic',
            ['automaticTiming', 'linearTransition'],
            'mousewheel',
            ['mousewheelForceToAxis', 'mousewheelInvert', 'mousewheelSensitivity'],
        ],
    },
    properties: {
        mainLayoutContent: {
            label: {
                en: 'Bind slides',
            },
            bindable: 'repeatable',
            type: 'Info',
            options: {
                text: ' ',
            },
            section: 'settings',
            defaultValue: [
                { isWwObject: true, type: 'ww-flexbox' },
                { isWwObject: true, type: 'ww-flexbox' },
                { isWwObject: true, type: 'ww-flexbox' },
            ],
            navigator: {
                group: 'Slides',
            },
            /* wwEditor:start */
            bindingValidation: {
                validations: [
                    {
                        type: 'array',
                    },
                    {
                        type: 'object',
                    },
                ],
                tooltip:
                    'A collection or an array of data: \n\n`myCollection` or `[{}, {}, ...] || ["string1", "string2", ...] || [1, 2, ...]`',
            },
            /* wwEditor:end */
        },
        slideIndex: {
            label: { en: 'Slides', fr: 'Slides' },
            type: 'Tabs',
            editorOnly: true,
            options: (content, _, boundProps) => {
                const isBound = !!boundProps.mainLayoutContent;
                const _content = getContent(content.mainLayoutContent);

                return {
                    labels: _content.map((_, index) => ({
                        label: `slide ${index + 1}`,
                    })),
                    prefixLabel: 'Slide',
                    nbTabs: _content.length,
                    add: 'addSlide',
                    remove: 'removeSlide',
                    fixed: isBound,
                };
            },
            section: 'settings',
            defaultValue: 0,
        },
        slidesPerView: {
            type: 'Number',
            label: {
                en: 'Slides per view',
                fr: 'Slides per view',
            },
            options: content => ({
                min: 1,
                max: getContent(content.mainLayoutContent).length,
                step: 1,
            }),
            responsive: true,
            states: true,
            bindable: true,
            classes: true,
            defaultValue: 1,
            section: 'settings',
        },
        spaceBetween: {
            type: 'Length',
            label: {
                en: 'Space between',
                fr: 'Space between',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px' }],
            },
            responsive: true,
            states: true,
            bindable: true,
            classes: true,
            section: 'settings',
        },
        effect: {
            label: {
                en: 'Effect',
                fr: 'Effect',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'slide', label: { en: 'slide' } },
                    { value: 'fade', label: { en: 'fade' } },
                    { value: 'coverflow', label: { en: 'coverflow' } },
                    { value: 'flip', label: { en: 'flip' } },
                    { value: 'cards', label: { en: 'cards' } },
                ],
            },
            responsive: true,
            states: true,
            bindable: true,
            classes: true,
            section: 'settings',
        },
        transitionDuration: {
            type: 'Length',
            label: {
                en: 'Transition duration',
                fr: 'Transition duration',
            },
            options: {
                unitChoices: [{ value: 'ms', label: 'ms', min: 1, max: 20000 }],
            },
            section: 'settings',
            responsive: true,
            states: true,
            bindable: true,
            classes: true,
        },
        navigation: {
            type: 'OnOff',
            label: {
                en: 'Navigation',
                fr: 'Navigation',
            },
            defaultValue: true,
            section: 'settings',
        },
        pagination: {
            type: 'OnOff',
            label: {
                en: 'Pagination',
                fr: 'Pagination',
            },
            defaultValue: false,
            section: 'settings',
        },
        loop: {
            type: 'OnOff',
            label: {
                en: 'Loop',
                fr: 'Loop',
            },
            defaultValue: false,
            section: 'settings',
        },
        automatic: {
            type: 'OnOff',
            label: {
                en: 'Autoplay',
                fr: 'Autoplay',
            },
            defaultValue: false,
            section: 'settings',
        },
        automaticTiming: {
            hidden: content => !content.automatic,
            type: 'Length',
            label: {
                en: 'Timing',
                fr: 'Timing',
            },
            options: {
                unitChoices: [{ value: 's', label: 's', min: 0, max: 20 }],
            },
            defaultValue: '3s',
            section: 'settings',
        },
        linearTransition: {
            hidden: content => !content.automatic,
            type: 'OnOff',
            label: {
                en: 'Linear transition',
                fr: 'Linear transition',
            },
            defaultValue: false,
            section: 'settings',
        },
        mousewheel: {
            type: 'OnOff',
            label: {
                en: 'Mousewheel control',
                fr: 'Mousewheel control',
            },
            defaultValue: false,
            section: 'settings',
        },
        mousewheelForceToAxis: {
            hidden: content => !content.mousewheel,
            type: 'OnOff',
            label: {
                en: 'Force to axis',
                fr: 'Force to axis',
            },
            defaultValue: false,
            section: 'settings',
        },
        mousewheelInvert: {
            hidden: content => !content.mousewheel,
            type: 'OnOff',
            label: {
                en: 'Invert direction',
                fr: 'Invert direction',
            },
            defaultValue: false,
            section: 'settings',
        },
        mousewheelSensitivity: {
            hidden: content => !content.mousewheel,
            type: 'Number',
            label: {
                en: 'Sensitivity',
                fr: 'Sensitivity',
            },
            defaultValue: 1,
            section: 'settings',
        },
        slidesContainer: {
            hidden: true,
            defaultValue: [],
        },
        navigationIcons: {
            hidden: true,
            defaultValue: [
                { isWwObject: true, type: 'ww-icon' },
                { isWwObject: true, type: 'ww-icon' },
            ],
        },
        bulletsIcons: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-icon' },
        },
    },
};
