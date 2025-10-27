// Function to refresh page and scroll to top
function refreshAndScrollToTop() {
    // Refresh the page
    window.location.reload();
    
    // Alternative approach: scroll to top and then refresh
    // This ensures we go to the top even if the page doesn't fully reload
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
}

// Contact form handling with success detection and page reload
function handleContactForm() {
    // Check if page was loaded with success parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        // Immediately scroll to top first
        window.scrollTo(0, 0);
        
        // Show success message
        alert('Message sent successfully! Thank you for reaching out.');
        
        // Clear the form data
        const form = document.getElementById('contactForm');
        if (form) {
            form.reset();
        }
        
        // Remove success parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Force scroll to top again after cleanup
        window.scrollTo(0, 0);
        
        return;
    }
    
    // Handle browser back button from Formspree
    window.addEventListener('pageshow', function(event) {
        // This event fires when page is loaded from cache (back button)
        if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
            // Immediately scroll to top
            window.scrollTo(0, 0);
            
            // Clear form and ensure we're at top
            const form = document.getElementById('contactForm');
            if (form) {
                form.reset();
            }
            
            // Double-check scroll position
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 50);
        }
    });
    
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        // Let the form submit naturally to Formspree
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Note: Button will be reset when page reloads after Formspree redirect
    });
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form
    handleContactForm();
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add smooth scrolling to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});