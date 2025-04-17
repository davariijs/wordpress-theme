document.addEventListener('DOMContentLoaded', function() {
    const dropdownItems = document.querySelectorAll('.main-nav .dropdown-nav-item');
    const menuToggleButton = document.querySelector('.menu-toggle');
    const siteHeader = document.querySelector('.site-header');
    const mainNav = document.getElementById('main-nav');


    dropdownItems.forEach(item => {
        const link = item.querySelector(':scope > a');
        const icon = item.querySelector(':scope > .icon-header');
        const submenu = item.querySelector(':scope > .submenu');


        if (submenu && link) {
            link.setAttribute('aria-haspopup', 'true');
        }
    });

    // --- Mobile Menu Toggle Logic (Mostly unchanged) ---
    if (menuToggleButton && siteHeader && mainNav) {
        menuToggleButton.addEventListener('click', function() {
            const currentlyActive = siteHeader.classList.contains('mobile-nav-active');

             // Toggle ARIA on button and class on header
            this.setAttribute('aria-expanded', !currentlyActive);
            siteHeader.classList.toggle('mobile-nav-active');
            mainNav.setAttribute('aria-hidden', String(currentlyActive));

        });

         // Set initial ARIA hidden state for main nav on mobile load
         const isMobileViewInitially = window.innerWidth <= 700;
         mainNav.setAttribute('aria-hidden', String(isMobileViewInitially));
    }


});