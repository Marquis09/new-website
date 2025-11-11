document.addEventListener("DOMContentLoaded", () => {
    // Dark Mode Toggle
    const darkModeButton = document.getElementById("darkModeButton");
    const body = document.body;
    const navbar = document.getElementById("navbar");

    if (darkModeButton) {
        darkModeButton.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            navbar.classList.toggle("navbar-dark");
            navbar.classList.toggle("bg-dark");
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

    // Contact Form Submission & Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            if (name && email && message) {
                alert("Thank you for your message! We'll get back to you shortly.");
                contactForm.reset();
            } else {
                alert("Please fill in all fields before submitting.");
            }
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Loading Spinner
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.style.display = 'block';
    window.addEventListener('load', () => {
        if (spinner) spinner.style.display = 'none';
    });

    // Testimonials Carousel
    const testimonialsCarousel = new bootstrap.Carousel(document.getElementById('testimonialsCarousel'), { interval: 5000, ride: 'carousel' });

    // Testimonial Modal
    const testimonialModal = new bootstrap.Modal(document.getElementById('testimonialModal'));
    document.querySelectorAll('#testimonials .card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-description');
            document.getElementById('testimonialModalLabel').textContent = title;
            document.querySelector('#testimonialModal .modal-body').textContent = description;
            testimonialModal.show();
        });
    });

    // Language Support
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function () {
            const selectedLanguage = languageSwitcher.value;
            const heroTitle = document.querySelector('#hero h1');
            const heroDescription = document.querySelector('#hero p');
            if (selectedLanguage === 'en') {
                heroTitle.textContent = 'Marquis Orchard';
                heroDescription.textContent = 'Web & UX Design Student | Creating User-Centered Digital Experiences';
            } else if (selectedLanguage === 'es') {
                heroTitle.textContent = 'Marquis Orchard';
                heroDescription.textContent = 'Estudiante de Diseño Web y UX | Creando Experiencias Digitales Centradas en el Usuario';
            }
        });
    }

    // Page Load Greeting
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        const currentHour = new Date().getHours();
        const greetingMessage = currentHour < 12 ? "Good Morning!" : currentHour < 18 ? "Good Afternoon!" : "Good Evening!";
        greetingEl.textContent = greetingMessage;
    }

    // Form validation on blur
    document.querySelectorAll('form input, form textarea').forEach(element => {
        element.addEventListener('blur', () => {
            if (element.value.trim() === '') element.classList.add('is-invalid');
            else element.classList.remove('is-invalid');
        });
    });

    // Automatic form submission on Enter key
    if(contactForm){
        contactForm.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                contactForm.submit();
            }
        });
    }
});