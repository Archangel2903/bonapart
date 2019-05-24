import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import Swiper from 'swiper/dist/js/swiper.min';
import 'jquery-form-styler';
import '@fancyapps/fancybox';
import IMask from 'imask';
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

    let mainSlider = new Swiper(document.querySelector('.main-slider'), {
        direction: 'vertical',
        loop: true,
        effect: 'slide',
        // autoplay: true,
        height: 690,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            clickable: true,
        },
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
    });
    let instagramSlider = new Swiper(document.querySelector('.instagram-slider'), {
        observer: true,
        observeParents: true,
        loop: true,
        // autoplay: true,
        spaceBetween: 16,
        slidesPerView: 4,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    $('.main-section-content-nav__link').hover(function () {
        let w = $(this).find('.main-section-content-nav__text').width() + 81;
        $(this).css('width', w);
    }, function () {
        $(this).css('width', 51);
    });

    $('.styled').styler();

    let phoneInput = document.querySelectorAll('.phone-mask');
    let maskOpt = {
        mask: '{+38} (000) 00 00 000'
    };

    phoneInput.forEach(function (input) {
        IMask(input, maskOpt);
    });
});