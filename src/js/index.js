import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import Swiper from 'swiper/dist/js/swiper.min';
import 'jquery-form-styler';
import L from 'leaflet';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';

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
        iconRetinaUrl: 'img/marker-icon-2x.png',
        iconUrl: 'img/marker-icon.png',
        shadowUrl: 'img/marker-shadow.png',
    });

    const map = L.map('map');
    const defaultCenter = function () {
        if (window.innerWidth < 768) {
            return [43.262990, 76.931635];
        } else {
            return [43.244010, 76.967512];
        }
    };
    const basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}');

    let clinic1 = L.marker([43.23931, 76.94392]).addTo(map).bindPopup('');

    basemap.addTo(map);

    if (map) {
        map.setView(
            defaultCenter(),
            13,
            {
                scrollWheelZoom: false
            })
            .scrollWheelZoom.disable();
    }
});

$(function () {
    const imagesAll = document.querySelectorAll('img[data-src]');
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


});