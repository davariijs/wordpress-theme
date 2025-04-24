
document.addEventListener('DOMContentLoaded', () => {

    // Register the GSAP MotionPathPlugin
    gsap.registerPlugin(MotionPathPlugin);

    // Select the elements needed for the animation
    const path = "#zigzag-path";    
    const shape = "#moving-shape";   

    // Create the GSAP timeline for the animation
    const tl = gsap.timeline({
        repeat: -1, 
        defaults: { 
            duration: 7,
            ease: "none" 
        }
    });

    // Add the motion path animation to the timeline
    tl.to(shape, {
        motionPath: {
            path: path,    
            align: path,
            alignOrigin: [0.5, 0.5], 
            autoRotate: true 
        }
    });
});