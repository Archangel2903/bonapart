import '../scss/main.scss';

import 'intersection-observer';
import $ from 'jquery';
import 'jquery-ui-bundle'
import 'popper.js';
import 'bootstrap';
import Swiper from 'swiper/dist/js/swiper.min';
import 'jquery-form-styler';
import '@fancyapps/fancybox';
import IMask, {Masked} from 'imask';
import moment from 'moment';
import 'moment/locale/ru';
import 'bootstrap-daterangepicker';
import 'bootstrap-star-rating';
import L from 'leaflet';
import '../img/point.svg';

$(window).on('load', function () {
    let b = $('body');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    b.removeClass('loaded');

    //leaflet map
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: '../img/point.svg',
        iconUrl: 'img/point.svg',
        iconSize: 38,
        iconAnchor: [19, 37],
        shadowUrl: null,
    });
    const map = L.map('map');
    const defaultCenter = [46.123802, 32.286997];
    const basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}');
    let marker = L.marker([46.122359, 32.269908]).addTo(map).bindPopup('«BonApart” Апартаменты у моря. Железный Порт');
    basemap.addTo(map);
    if (map) {
        map.setView(defaultCenter, 14.5).scrollWheelZoom.disable();
    }
});

$(function () {
    // intersection Observer
    let imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio > 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }

    // Swiper
    if ($('.swiper-container').length) {
        let mainSlider = new Swiper(document.querySelector('.main-slider'), {
            direction: 'vertical',
            loop: true,
            autoplay: true,
            height: 690,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
                clickable: true,
                formatFractionCurrent: function (number) {
                    if (number < 10) {
                        return '0' + number;
                    } else {
                        return number;
                    }
                },
                renderFraction: function (currentClass, totalClass, index) {
                    if (index < 10) {
                        return '<span class="' + currentClass + '">' + '0' + index + '</span>';
                    } else {
                        return '<span class="' + currentClass + '">' + index + '</span>';
                    }
                },
            },
            breakpoints: {
                768: {
                    height: 768,
                }
            }
        });
        let attractionSlider = new Swiper(document.querySelector('.attractions'), {
            observer: true,
            observeParents: true,
            loop: true,
            autoplay: true,
            spaceBetween: 30,
            centeredSlides: true,
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                991: {
                    centeredSlides: false,
                },
                768: {
                    centeredSlides: true,
                }
            }
        });
        let instagramSlider = new Swiper(document.querySelector('.instagram-slider'), {
            observer: true,
            observeParents: true,
            loop: true,
            // autoplay: true,
            spaceBetween: 16,
            slidesPerView: 4,
            centeredSlides: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                1100: {
                    slidesPerView: 3,
                    centeredSlides: true,
                },
                860: {
                    slidesPerView: 2,
                },
                600: {
                    slidesPerView: 1
                }
            }
        });

        let mobSlider = document.querySelectorAll('.mobile-slider');
        mobSlider.forEach(function (slider) {
            var swiper = null;

            if (slider.classList.contains('photo-room')) {
                swiper = new Swiper(slider, {
                    observer: true,
                    observeParents: true,
                    spaceBetween: 0,
                    navigation: {
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    },
                    pagination: {
                        el: null,
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                        },
                        480: {
                            slidesPerView: 1,
                        },
                    }
                });
            } else if (slider.classList.contains('ways')) {
                swiper = new Swiper(slider, {
                    autoHeight: true,
                    observer: true,
                    observeParents: true,
                    spaceBetween: 0,
                    navigation: {
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    breakpoints: {
                        767: {
                            slidesPerView: 1
                        },
                    }
                });
            } else {
                swiper = new Swiper(slider, {
                    // observer: true,
                    // observeParents: true,
                    spaceBetween: 0,
                    navigation: {
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    breakpoints: {
                        1199: {
                            slidesPerView: 3,
                        },
                        576: {
                            slidesPerView: 2
                        },
                        375: {
                            slidesPerView: 1
                        }
                    }
                });
            }

            const mqlMD = matchMedia('(min-width: 768px)');
            mqlMD.addListener(() => {
                if (mqlMD.matches) swiper.destroy();
            });
            if (mqlMD.matches) swiper.destroy();
        });
    }

    // burger button
    $('.header-content__burger-btn').on('click', function () {
        $(this).toggleClass('active');
    });

    // apartments nav
    $('.main-section-content-nav__link').each(function () {
        $(this).data('width', $(this).css('width'));
    });
    $('.main-section-content-nav__link').hover(function () {
        let w = $(this).find('.main-section-content-nav__text').width() + 81;
        $(this).css('width', w);
    }, function () {
        $(this).css('width', $(this).data('width'));
    });

    // star rating
    let rateInput = document.querySelectorAll('.rating-input');
    rateInput.forEach(function (input) {
        if (input.classList.contains('rating-read')) {
            $(input).rating({
                showCaption: false,
                showClear: false,
                displayOnly: true,
                max: 5,
                size: 'xs',
                emptyStar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><path fill-rule="evenodd" clip-rule="evenodd" fill="#c1c1c1" d="M256 19l84.4 148.9L512 200 392.5 324.2 414.2 493 256 420.8 97.7 493l21.7-168.8L0 200l171.6-32.1L256 19"/></svg>',
                filledStar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><path fill-rule="evenodd" clip-rule="evenodd" fill="#f3bd00" d="M256 19l84.4 148.9L512 200 392.5 324.2 414.2 493 256 420.8 97.7 493l21.7-168.8L0 200l171.6-32.1L256 19"/></svg>',
            });
        } else {
            $(input).rating({
                showCaption: false,
                showClear: false,
                stars: 5,
                min: 0,
                max: 5,
                step: 1,
                size: 'xs',
                emptyStar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><path fill-rule="evenodd" clip-rule="evenodd" fill="#c1c1c1" d="M256 19l84.4 148.9L512 200 392.5 324.2 414.2 493 256 420.8 97.7 493l21.7-168.8L0 200l171.6-32.1L256 19"/></svg>',
                filledStar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><path fill-rule="evenodd" clip-rule="evenodd" fill="#f3bd00" d="M256 19l84.4 148.9L512 200 392.5 324.2 414.2 493 256 420.8 97.7 493l21.7-168.8L0 200l171.6-32.1L256 19"/></svg>',
            });
        }
    });

    // form styler
    $('.styled').styler();

    // input Mask
    let phoneInput = document.querySelectorAll('.phone-mask');
    let maskOpt = {
        mask: '{+38} (000) 00 00 000',
        // lazy: false,
        placeholderChar: '_'
    };
    phoneInput.forEach(function (input) {
        IMask(input, maskOpt);

        let placeholder = '+38 (';
        input.onfocus = function () {
            if (this.value === placeholder || this.value === '') {
                this.value = placeholder
            }
        };
        input.onblur = function () {
            if (this.value === placeholder) {
                this.value = ''
            }
        };
    });

    // datepicker input
    moment.updateLocale('ru');
    console.log(moment().format('LL'));

    let dateInputAll = document.querySelectorAll('input[name="datefilter"]');
    if (dateInputAll.length > 0) {
        dateInputAll.forEach(function (i) {
            $(i).daterangepicker({
                alwaysShowCalendars: true,
                autoApply: true,
                singleDatePicker: true,
                minDate: moment().format('DD MMMM YYYY'),
                startDate: moment().format('DD MMMM YYYY'),
                autoUpdateInput: false,
                locale: {
                    format: 'DD MMMM YYYY',
                    cancelLabel: 'Clear',
                    separator: ' '
                }
            });

            $(i).on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('DD MMMM YYYY'));
            });
        });
    }

    // reserved calendar
    $('.calendar-reserved__calendar').datepicker();
});