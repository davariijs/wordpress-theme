
document.addEventListener('DOMContentLoaded', () => {

    // Register the GSAP MotionPathPlugin
    // This is crucial for path-based animations
    gsap.registerPlugin(MotionPathPlugin);

    // Select the elements needed for the animation
    const path = "#zigzag-path";        // Selector for the SVG path
    const shape = "#moving-shape";    // Selector for the shape to animate

    // Create the GSAP timeline for the animation
    const tl = gsap.timeline({
        repeat: -1, // Loop indefinitely (-1)
        defaults: { // Default settings for tweens in this timeline
            duration: 7, // Duration of one full loop (in seconds)
            ease: "none" // Constant speed along the path
        }
    });

    // Add the motion path animation to the timeline
    tl.to(shape, {
        motionPath: {
            path: path,         // The path element (or selector) to follow
            align: path,        // Align the shape's origin to the path
            alignOrigin: [0.5, 0.5], // Center the shape onto the path
            autoRotate: true // Optional: Rotates the shape to follow the path direction
        }
    });
}); // End of DOMContentLoaded listener