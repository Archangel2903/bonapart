import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import Swiper from 'swiper';

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    b.removeClass('loaded');
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

    let mainSlider = document.querySelector('.main-slider');
    let slider = new Swiper(mainSlider, {
        // observer: true,
        // observeParents: true,
        direction: 'vertical',
        loop: true,
        effect: 'slide',
        // autoplay: true,
        height: 690,
        // centeredSlides: true,
        // slidesPerView: 1,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            clickable: true,
        },
        /*scrollbar: {
            el: '.swiper-scrollbar'
        }*/
    });
});