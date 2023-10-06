import Swiper from 'swiper/bundle';

const slider = () => {
    const swiper = new Swiper('.swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 186,
            depth: 110,
            modifier: 2.5,
            slideShadows: true,
        },
        
        autoplay: {
            delay: 20000,
            disableOnInteraction: false,
        },
        keyboard: {
            enabled: true,
        },
        mousewheel: {
            thresholdDelta: 70,
        },
        loop: true,

        breakpoints: {
            1200: {
                slidesPerView: 'auto',
            },
            979: {
                slidesPerView: '1.33',
            },
            900: {
                slidesPerView: '1.2',
            },
            768: {
                slidesPerView: '1',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 50,
                    depth: 110,
                    modifier: 2.5,
                    slideShadows: true,
                },
            },
            320: {
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    modifier: 1,
                    depth: 110,
                },
            },
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
    });
};

export default slider;
