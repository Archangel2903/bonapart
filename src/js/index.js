import '../scss/main.scss';

import 'intersection-observer';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import Swiper from 'swiper/dist/js/swiper.min';
import 'jquery-form-styler';
import 'lightgallery';
import IMask, {Masked} from 'imask';
import moment from 'moment';
import 'moment/locale/ru';
import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.ru.min';
import 'bootstrap-star-rating';
import 'readmore-js';
import L from 'leaflet';
import Packery from 'packery';
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

    // readmore js
    if ($('article').length) {
        if ($('article').hasClass('text-review')) {
            $('.text-review').readmore({
                collapsedHeight: 95,
                speed: 300,
                lessLink: '<a href="#" class="attractions__more d-block mt-3 mr-4 mb-2 text-right pt-md-3 m-md-0 mb-md-2">Свернуть текст</a>',
                moreLink: '<a href="#" class="attractions__more d-block mt-3 mr-4 mb-2 text-right pt-md-3 m-md-0 mb-md-2">Показать больше</a>'
            });
        } else {
            $('article').readmore({
                collapsedHeight: 220,
                speed: 300,
                lessLink: '<a href="#" class="attractions__more d-block mt-3 mr-4 mb-2 text-right pt-md-3 m-md-0 mb-md-2 text-md-left">Свернуть текст</a>',
                moreLink: '<a href="#" class="attractions__more d-block mt-3 mr-4 mb-2 text-right pt-md-3 m-md-0 mb-md-2 text-md-left">Показать больше</a>'
            });
        }
    }

    // packery
    let packeryElem = document.querySelectorAll('.packery-grid');
    if (window.innerWidth >= 768) {
        packeryElem.forEach(function (elem) {
            let packery_element = new Packery(elem, {
                itemSelector: '.grid-item',
                gutter: 30,
            });
        });
    }
});

$(window).on('scroll', function () {
    let yOffset = window.pageYOffset;
    let header = $('.header');
    let headerTop = $('.header-top');
    let toTop = $('#to_top');

    if (yOffset >= 40) {
        headerTop.slideUp(300);
        header.addClass('bg-secondary');
    } else {
        headerTop.slideDown(300);
        header.removeClass('bg-secondary');
    }

    (yOffset >= 600) ? toTop.addClass('show') : toTop.removeClass('show');
});

$(function () {
    // intersection Observer
    let imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
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

    // burger button
    $('.header-content__burger-btn').on('click', function () {
        $(this).toggleClass('active');

        /*if ($(this).hasClass('active')) {
            $('.mobile-menu').css('height', $('.content').find('.section').first().height());
        }*/

        $('.mobile-menu').toggleClass('active');
        $('body').toggleClass('overflow-hidden');
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

    // Swiper
    if ($('.swiper-container').length) {
        let mainSlider, attractionSlider, instagramSlider;
        let mainSlides = document.querySelectorAll('.main-slider .swiper-slide').length;
        let attractionSlides = document.querySelectorAll('.attractions .swiper-slide').length;
        let instagramSlides = document.querySelectorAll('.instagram-slider .swiper-slide').length;

        if (mainSlides > 1) {
            mainSlider = new Swiper(document.querySelector('.main-slider'), {
                direction: 'vertical',
                autoplay: true,
                height: 690,
                followFinger: false,
                allowTouchMove: false,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction',
                    clickable: true,
                    formatFractionCurrent: function formatFractionCurrent(number) {
                        if (number < 10) {
                            return '0' + number;
                        } else {
                            return number;
                        }
                    },
                    renderFraction: function renderFraction(currentClass, totalClass, index) {
                        if (index < 10) {
                            return '<span class="' + currentClass + '">' + '0' + index + '</span>';
                        } else {
                            return '<span class="' + currentClass + '">' + index + '</span>';
                        }
                    }
                },
                breakpoints: {
                    768: {
                        height: 768
                    }
                }
            });
        } else {
            mainSlider = new Swiper(document.querySelector('.main-slider'), {
                init: false
            });
        }

        if (attractionSlides > 3) {
            attractionSlider = new Swiper(document.querySelector('.attractions'), {
                observer: true,
                observeParents: true,
                // loop: true,
                autoplay: true,
                spaceBetween: 25,
                slidesPerView: 3,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    991: {
                        slidesPerView: 2,
                    },
                    480: {
                        centeredSlides: true,
                        slidesPerView: 1,
                    }
                }
            });
        } else {
            $('.attractions .swiper-wrapper').addClass('flex-wrap');

            attractionSlider = new Swiper(document.querySelector('.attractions'), {
                init: false,
            });
        }

        if (instagramSlides > 4) {
            instagramSlider = new Swiper(document.querySelector('.instagram-slider'), {
                observer: true,
                observeParents: true,
                spaceBetween: 20,
                slidesPerView: 4,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    1100: {
                        slidesPerView: 3,
                    },
                    860: {
                        centeredSlides: false,
                        slidesPerView: 2,
                    },
                    600: {
                        centeredSlides: true,
                        slidesPerView: 1,
                    }
                }
            });
        } else {
            instagramSlider = new Swiper(document.querySelector('.instagram-slider'), {
                init: false
            });
        }

        let mobSlider = document.querySelectorAll('.mobile-slider');
        mobSlider.forEach(function (slider) {
            let swiper = null;

            if (slider.classList.contains('photo-room')) {
                swiper = new Swiper(slider, {
                    observer: true,
                    observeParents: true,
                    spaceBetween: 0,
                    navigation: {
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next'
                    },
                    pagination: {
                        el: null
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 'auto',
                            centeredSlides: true,
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
                        nextEl: '.swiper-button-next'
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    breakpoints: {
                        767: {
                            slidesPerView: 1
                        }
                    }
                });
            } else {
                swiper = new Swiper(slider, {
                    observer: true,
                    observeParents: true,
                    spaceBetween: 0,
                    navigation: {
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next'
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    breakpoints: {
                        1199: {
                            slidesPerView: 3
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

            let mqlMD = matchMedia('(min-width: 768px)');
            mqlMD.addListener(function () {
                if (mqlMD.matches) swiper.destroy();
            });
            if (mqlMD.matches) swiper.destroy();
        });
    }

    // lightgallery
    $('.lightgallery').lightGallery({
        download: false,
        mode: 'lg-fade',
        easing: 'ease',
        getCaptionFromTitleOrAlt: false,
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
                emptyStar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><path fill-rule="evenodd" clip-rule="evenodd" fill="#936f62" d="M256 19l84.4 148.9L512 200 392.5 324.2 414.2 493 256 420.8 97.7 493l21.7-168.8L0 200l171.6-32.1L256 19"/></svg>',
                filledStar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><path fill-rule="evenodd" clip-rule="evenodd" fill="#317b0c" d="M256 19l84.4 148.9L512 200 392.5 324.2 414.2 493 256 420.8 97.7 493l21.7-168.8L0 200l171.6-32.1L256 19"/></svg>',
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
                emptyStar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><path fill-rule="evenodd" clip-rule="evenodd" fill="#936f62" d="M256 19l84.4 148.9L512 200 392.5 324.2 414.2 493 256 420.8 97.7 493l21.7-168.8L0 200l171.6-32.1L256 19"/></svg>',
                filledStar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><path fill-rule="evenodd" clip-rule="evenodd" fill="#317b0c" d="M256 19l84.4 148.9L512 200 392.5 324.2 414.2 493 256 420.8 97.7 493l21.7-168.8L0 200l171.6-32.1L256 19"/></svg>',
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

    // datepicker
    moment.updateLocale('ru');
    console.log(moment().format('LL'));

    /*$('.datepicker').datepicker({
        templates: {
            leftArrow: '<svg><use xlink:href="img/spritemap.svg#sprite-arrow_left"></use></svg>',
            rightArrow: '<svg><use xlink:href="img/spritemap.svg#sprite-arrow_right"></use></svg>'
        },
        format: "dd MM yyyy",
        startDate: '+1d',
        language: "ru",
        autoclose: true,
        toggleActive: true,
    });*/

    $('.calendar-reserved').datepicker({
        inputs: $(this).find('.datepicker-range'),
        keepEmptyValues: true,
        templates: {
            leftArrow: '<svg><use xlink:href="img/spritemap.svg#sprite-arrow_left"></use></svg>',
            rightArrow: '<svg><use xlink:href="img/spritemap.svg#sprite-arrow_right"></use></svg>'
        },
        format: "dd MM yyyy",
        startDate: '+1d',
        language: "ru",
        autoclose: true,
        datesDisabled: ['05/07/2019', '06/07/2019', '07/07/2019', '08/07/2019', '25/07/2019'],
        toggleActive: true,
    });
    $('.calendar-reserved').find('.datepicker-range').each(function () {
        $(this).datepicker().on('changeDate', function (e) {
            let input = $(this).parent().find('.result-val');
            input.val(moment(e.date).format('DD/MM/YYYY'));
        });
    });

    // to top
    $('#to_top').on('click', function (e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: 0,
        }, 800);
    });
});