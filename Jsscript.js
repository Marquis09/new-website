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
    document.onreadystatechange = function () {
        const spinner = document.querySelector("#loading-spinner");
        if (document.readyState !== "complete") {
            spinner.style.display = "block";
        } else {
            spinner.style.display = "none";
        }
    };

    // Testimonials Carousel
    const testimonialsCarousel = new bootstrap.Carousel(document.getElementById('testimonialsCarousel'), { interval: 5000, ride: 'carousel' });

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
    window.onload = () => {
        document.getElementById('loading-spinner').style.display = 'none';
        const greetUser = () => {
            const currentHour = new Date().getHours();
            const greetingMessage = currentHour < 12 ? "Good Morning!" : currentHour < 18 ? "Good Afternoon!" : "Good Evening!";
            document.querySelector('#greeting').textContent = greetingMessage;
        };
        greetUser();
    };

    // Form Validation on Blur
    document.querySelectorAll('form input, form textarea').forEach(element => {
        element.addEventListener('blur', () => {
            if (element.value.trim() === '') {
                element.classList.add('is-invalid');
            } else {
                element.classList.remove('is-invalid');
            }
        });
    });

    // Automatic form submission on Enter
    if(contactForm){
        contactForm.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                contactForm.submit();
            }
        });
    }

    // === Spider and Web Drop Animation ===
    const spiderWrapper = document.createElement('div');
    spiderWrapper.classList.add('spider-wrapper');
    const spiderLine = document.createElement('div');
    spiderLine.classList.add('spider-line');
    const spider = document.createElement('div');
    spider.classList.add('spider');
    spider.innerHTML = `
      <svg viewBox="0 0 64 64" fill="currentColor">
        <circle cx="32" cy="32" r="10" />
        <line x1="32" y1="42" x2="32" y2="52" stroke="currentColor" stroke-width="2" />
      </svg>
    `;
    spiderWrapper.appendChild(spiderLine);
    spiderWrapper.appendChild(spider);
    document.body.appendChild(spiderWrapper);

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxDrop = window.innerHeight / 2;
        const drop = Math.min(scrollY, maxDrop);
        spider.style.transform = `translateY(${drop}px)`;
        spiderLine.style.height = `${drop + 16}px`;
    });
});
