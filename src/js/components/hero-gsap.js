document.addEventListener('DOMContentLoaded', () => {

    // --- Element References ---
    const heroSection = document.getElementById('hero-section');
    const shoe = document.getElementById('product-shoe');
    const navItems = document.querySelectorAll('.side-nav li');
    const backgroundTextElement = document.querySelector('.hero-background .background-text');

    // --- Basic Checks ---
    if (!heroSection) {
        console.error("Hero section not found!");
    }
     if (!shoe) {
         console.warn("Product shoe element not found, mouse follow disabled.");
     }
    if (!backgroundTextElement) {
        console.error("Background text element not found!");
        // return;
    }
    if (navItems.length === 0) {
        console.warn("Side navigation items not found.");
    }


    // --- 1. Shoe Mouse Follow Animation (Inverse) ---
    if (heroSection && shoe) {
        // Get center of the hero section - Recalculate on resize? For now, calculate once.
        // Consider recalculating if layout changes significantly without page reload.
        let centerX = heroSection.offsetWidth / 2;
        let centerY = heroSection.offsetHeight / 2;

        // Factors to control how much the shoe moves/rotates
        const moveFactor = 0.04; // Adjust for desired intensity
        const rotateFactor = 0.06; // Adjust for desired tilt intensity

        const handleMouseMove = (event) => {
            // Update center coordinates in case of resize between events (simple approach)
            centerX = heroSection.offsetWidth / 2;
            centerY = heroSection.offsetHeight / 2;

            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const offsetX = mouseX - centerX;
            const offsetY = mouseY - centerY;

            const targetX = -offsetX * moveFactor; // Inverted X movement
            const targetY = -offsetY * moveFactor; // Inverted Y movement
            const targetRotY = offsetX * rotateFactor;  // Tilt right when mouse is right
            const targetRotX = -offsetY * rotateFactor; // Tilt forward when mouse is up

            gsap.to(shoe, {
                x: targetX,
                y: targetY,
                rotationX: targetRotX,
                rotationY: targetRotY,
                duration: 0.8, // Slightly longer for smoother feel
                ease: "power2.out",
                overwrite: "auto" // Important for performance on rapid mousemove
            });
        };

        const handleMouseLeave = () => {
            gsap.to(shoe, {
                x: 0,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                duration: 0.7,
                ease: "power2.out",
                overwrite: "auto"
            });
        };

        heroSection.addEventListener('mousemove', handleMouseMove);
        heroSection.addEventListener('mouseleave', handleMouseLeave);

        // Optional: Consider adding a resize listener to update centerX/centerY if needed
        // window.addEventListener('resize', () => {
        //     centerX = heroSection.offsetWidth / 2;
        //     centerY = heroSection.offsetHeight / 2;
        // });
    }


    // --- 2. Side Nav Interaction ---
    if (navItems.length > 0 && backgroundTextElement) {

        // Function to update the hero content based on a nav item
                // Function to update the hero content based on a nav item
                function updateHeroContent(targetItem, isInitial = false) {
                    const newText = targetItem.dataset.text;
                    const newColor = targetItem.dataset.color;
        
                    // --- Update Active Class ---
                    if (!isInitial) {
                        navItems.forEach(item => item.classList.remove('active'));
                        targetItem.classList.add('active');
                    }
        
                    // --- Update Accent Color FIRST (so it's ready for the animation 'to') ---
                    // Set the CSS variable. This prepares the target color for the text animation.
                    if (newColor) {
                        document.documentElement.style.setProperty('--color-dynamic', newColor);
                    }
        
                    // --- Update Background Text ---
                    if (newText && backgroundTextElement) { // Check if text needs updating and element exists
                        // Use animation only for clicks, not initial load
                        if (!isInitial) {
                            // 1. Animate current text color TO black (to hide it against the black bg)
                            gsap.to(backgroundTextElement, {
                                color: '#000000', // Animate color to match the element's background
                                duration: 0.2,    // Duration of fade-out effect
                                ease: 'power1.in', // Ease for fade-out
                                onComplete: () => {
                                    // 2. Update text content *while* its color is black (invisible)
                                    backgroundTextElement.textContent = newText;
        
                                    // 3. Animate text color FROM black TO the NEW accent color
                                    //    The '--color-dynamic' variable was updated just before this animation started.
                                    gsap.to(backgroundTextElement, {
                                        // Animate to the *value* of the CSS variable we just set
                                        color: 'var(--color-dynamic)',
                                        duration: 0.3,      // Duration of fade-in effect
                                        delay: 0.05,        // Slight pause before fading in
                                        ease: 'power1.out'  // Ease for fade-in
                                    });
                                }
                            });
                        } else {
                            // --- Initial Load Setup ---
                            // Set text content directly
                            backgroundTextElement.textContent = newText;
                            // Set the initial color directly using the variable
                            // Ensure CSS also sets 'color: var(--color-dynamic)' for the element
                            backgroundTextElement.style.color = 'var(--color-dynamic)';
                        }
                    } else if (isInitial && newColor && backgroundTextElement) {
                         // Handle initial load if only color needs setting (and text might already be there via HTML)
                         backgroundTextElement.style.color = 'var(--color-dynamic)';
                    }
        
        
                    // --- Optional: Shoe Animation on Nav Change ---
                    if (!isInitial && shoe) {
                        gsap.fromTo(shoe,
                            { scale: 1, rotationY: gsap.getProperty(shoe, "rotationY") },
                            { scale: 1.05, rotationY: gsap.getProperty(shoe, "rotationY") + 5, duration: 0.3, yoyo: true, repeat: 1, ease: "power1.inOut" }
                        );
                    }
                }

        // Add click listeners to nav items
        navItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault(); // Stop link navigation

                if (item.classList.contains('active')) {
                    return; // Do nothing if already active
                }

                updateHeroContent(item); // Pass the clicked item
            });
        });

        // --- 3. Initial State Setup ---
        const initialActiveItem = document.querySelector('.side-nav li.active');
        if (initialActiveItem) {
            updateHeroContent(initialActiveItem, true); // Call update function in initial mode
        } else if (navItems.length > 0) {
             // Optionally activate the first item if none are marked active in HTML
             // navItems[0].classList.add('active');
             // updateHeroContent(navItems[0], true);
             console.warn("No initial active nav item found. Hero might not display initial text/color correctly.");
        }
    }

}); // End DOMContentLoaded