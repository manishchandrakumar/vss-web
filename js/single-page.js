document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    document.querySelectorAll('.navigation a[data-section]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            navigateToSection(sectionId);
        });
    });

    // Handle direct URLs
    function handleInitialLoad() {
        const path = window.location.pathname;
        const sectionMap = {
            '/': 'home',
            '/index.html': 'home',
            '/whoweare.html': 'whoweare',
            '/services.html': 'services',
            '/security.html': 'security',
            '/facility.html': 'facility',
            '/training.html': 'training',
            '/it.html': 'it',
            '/homeService.html': 'homeService',
            '/contact.html': 'contact'
        };
        
        const section = sectionMap[path] || 'home';
        navigateToSection(section, false);
    }

    function navigateToSection(sectionId, pushState = true) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
        }

        if (pushState) {
            // Update URL without reload
            const url = sectionId === 'home' ? '/' : `/${sectionId}.html`;
            history.pushState({section: sectionId}, '', url);
        }
    }

    // Handle browser back/forward
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.section) {
            navigateToSection(e.state.section, false);
        }
    });

    handleInitialLoad();
});
