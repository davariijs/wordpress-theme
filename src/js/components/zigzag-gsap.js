
document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(MotionPathPlugin);

    const path = "#zigzag-path";    
    const shape = "#moving-shape";   

    const tl = gsap.timeline({
        repeat: -1, 
        defaults: { 
            duration: 7,
            ease: "none" 
        }
    });
    tl.to(shape, {
        motionPath: {
            path: path,    
            align: path,
            alignOrigin: [0.5, 0.5], 
            autoRotate: true 
        }
    });

    const runningSwiperElement = document.querySelector('.running-swiper');

    if (runningSwiperElement) {
        const runningSwiper = new Swiper(runningSwiperElement, {
            loop: true,         
            grabCursor: true,   
            simulateTouch: true,

            slidesPerView: 1,    
            spaceBetween: 15,   

            breakpoints: {
                691: {
                    slidesPerView: 3,
                    spaceBetween: 20 
                },
                901: {
                    slidesPerView: 4, 
                    spaceBetween: 20 
                }
            },

        });
    } else {
        console.warn("Swiper container '.running-swiper' not found.");
    }
});