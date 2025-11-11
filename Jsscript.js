document.addEventListener("DOMContentLoaded", () => {
    // Dark Mode Toggle
    const darkModeButton = document.getElementById("darkModeButton");
    const body = document.body;
    const navbar = document.getElementById("navbar");

    if (darkModeButton) {
        darkModeButton.addEventListener("click", () => {
            // Toggle the dark mode class
            body.classList.toggle("dark-mode");
            navbar.classList.toggle("navbar-dark");
            navbar.classList.toggle("bg-dark");

            // Change the button text based on the dark mode state
            darkModeButton.innerHTML = body.classList.contains("dark-mode") ? "☀️ Toggle Light Mode" : "🌙 Toggle Dark Mode";
        });
    }

    // Open Modal for Images in Visuals Section
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));

    document.querySelectorAll('.clickable-img').forEach(image => {
        image.addEventListener('click', (e) => {
            const imgSrc = e.target.getAttribute('data-bs-img-src');
            const modalImage = document.getElementById("modalImage");
            modalImage.src = imgSrc;
            modal.show();
        });
    });

    // Close Modal When Clicked Outside
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                modal.hide();
            }
        });
    }

    // Form Submission & Validation (Contact Form)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation (checks if fields are not empty)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert("Thank you for your message! We'll get back to you shortly.");
                contactForm.reset(); // Optionally clear the form after submission
            } else {
                alert("Please fill in all fields before submitting.");
            }
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Loading Spinner (Show on Page Load)
    document.onreadystatechange = function () {
        const spinner = document.querySelector("#loading-spinner");
        if (document.readyState !== "complete") {
            spinner.style.display = "block";
        } else {
            spinner.style.display = "none";
        }
    };

    // Testimonials Carousel (if applicable)
    const testimonialsCarousel = new bootstrap.Carousel(document.getElementById('testimonialsCarousel'), {
        interval: 5000, // Change testimonial every 5 seconds
        ride: 'carousel'
    });

    // Open Modal for Testimonial
    const testimonialModal = new bootstrap.Modal(document.getElementById('testimonialModal'));

    document.querySelectorAll('#testimonials .card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-description');
            const modalTitle = document.getElementById('testimonialModalLabel');
            const modalBody = document.querySelector('#testimonialModal .modal-body');

            modalTitle.textContent = title;
            modalBody.textContent = description;

            testimonialModal.show();
        });
    });

    // Language Support (Example for English and Spanish)
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function () {
            const selectedLanguage = languageSwitcher.value;
            const heroTitle = document.querySelector('#hero h1');
            const heroDescription = document.querySelector('#hero p');
            if (selectedLanguage === 'en') {
                // Change text content to English
                heroTitle.textContent = 'Marquis Orchard';
                heroDescription.textContent = 'Web & UX Design Student | Creating User-Centered Digital Experiences';
            } else if (selectedLanguage === 'es') {
                // Change text content to Spanish
                heroTitle.textContent = 'Marquis Orchard';
                heroDescription.textContent = 'Estudiante de Diseño Web y UX | Creando Experiencias Digitales Centradas en el Usuario';
            }
        });
    }

    // Track Page Load Completion (with Greeting)
    window.onload = () => {
        console.log('Page fully loaded and all resources are available.');
        document.getElementById('loading-spinner').style.display = 'none';

        // Custom greeting based on the time of day
        const greetUser = () => {
            const currentHour = new Date().getHours();
            const greetingMessage = currentHour < 12 ? "Good Morning!" : currentHour < 18 ? "Good Afternoon!" : "Good Evening!";
            document.querySelector('#greeting').textContent = greetingMessage;
        };

        greetUser();  // Display greeting on page load
    };

    // Form validation improvements
    const formElements = document.querySelectorAll('form input, form textarea');
    formElements.forEach(element => {
        element.addEventListener('blur', () => {
            if (element.value.trim() === '') {
                element.classList.add('is-invalid');
            } else {
                element.classList.remove('is-invalid');
            }
        });
    });

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
      
        // You can adjust these numbers to tune how far it “drops”
        const maxDrop = 300; 
        const drop = Math.min(scrollY, maxDrop);
      
        const web = document.getElementById("spider-web");
        const spider = document.getElementById("spider");
      
        web.style.height = drop + "px";
        spider.style.transform = `translateY(${drop}px)`;
      });
      

    // Automatic form submission on Enter key press (optional feature)
    contactForm.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            contactForm.submit();
        }
    });
});
