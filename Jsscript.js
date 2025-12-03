document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const navbar = document.getElementById("navbar");
    const darkModeButton = document.getElementById("darkModeButton");
    
    // --- 1. Dark Mode Toggle & Persistence ---
    
    // Function to set Dark Mode state and save preference
    const setDarkMode = (isDark) => {
        // Update Body/Navbar classes
        body.classList.toggle("dark-mode", isDark);
        navbar.classList.toggle("navbar-dark", isDark);
        // Toggle background classes for the navbar (Bootstrap 5)
        navbar.classList.toggle("navbar-light", !isDark); // Reset light if dark
        navbar.classList.toggle("bg-light", !isDark);     // Set light background if light mode
        navbar.classList.toggle("bg-dark", isDark);       // Set dark background if dark mode
        
        // Update Button Text
        darkModeButton.innerHTML = isDark ? "☀️ Toggle Light Mode" : "🌙 Toggle Dark Mode";

        // Save Preference
        localStorage.setItem("darkModeEnabled", isDark);
    };

    // Load saved preference or system preference on page load
    if (darkModeButton) {
        const savedDarkMode = localStorage.getItem("darkModeEnabled");
        
        // Check local storage, or fall back to system preference
        const initialIsDark = (savedDarkMode === "true" || 
                              (savedDarkMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches));

        setDarkMode(initialIsDark);

        // Click Listener
        darkModeButton.addEventListener("click", () => {
            const isDark = !body.classList.contains("dark-mode");
            setDarkMode(isDark);
        });
    }

    // --- 2. Open Modal for Images ---
    const modalElement = document.getElementById('imageModal');
    
    // Check if the modal HTML exists on the page
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        const modalImage = document.getElementById("modalImage");

        document.querySelectorAll('.clickable-img').forEach(image => {
            image.addEventListener('click', (e) => {
                e.preventDefault(); // Stop the parent <a> tag from opening a new window
                
                // Get the URL from the parent <a> tag's href attribute
                const anchor = image.closest('a');
                if (anchor) {
                    modalImage.src = anchor.href;
                    modal.show();
                }
            });
        });

        // Close Modal When Clicked Outside (Ensures clicking the backdrop works)
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                modal.hide();
            }
        });
    }


    // --- 3. Contact Form Submission & Validation (If you still have a contact form) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name.trim() && email.trim() && message.trim()) {
                alert("Thank you for your message! We'll get back to you shortly.");
                contactForm.reset();
            } else {
                alert("Please fill in all fields before submitting.");
            }
        });

        // Form validation on blur
        document.querySelectorAll('form input, form textarea').forEach(element => {
            element.addEventListener('blur', () => {
                if (element.value.trim() === '') element.classList.add('is-invalid');
                else element.classList.remove('is-invalid');
            });
        });
    }

    // --- 4. Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- 5. Loading Spinner ---
    const spinner = document.getElementById('loading-spinner');
    // Hide the spinner once the page content has loaded
    window.addEventListener('load', () => {
        if (spinner) spinner.style.display = 'none';
    });
});