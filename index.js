
// Language switching functionality
const languageSwitcher = document.getElementById('languageSwitcher');
const languageTexts = document.querySelectorAll('.language-text');
const languageFlags = document.querySelectorAll('.language-flag img');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

let currentLang = 'fr';

languageSwitcher.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    document.body.lang = currentLang;

    // Update all language-specific elements
    document.querySelectorAll('[data-lang]').forEach(element => {
        if (element.getAttribute('data-lang') === currentLang) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });

    // Update language switcher display
    languageTexts.forEach(text => {
        if (text.getAttribute('data-lang') === currentLang) {
            text.style.display = 'inline';
        } else {
            text.style.display = 'none';
        }
    });


    // Update flag display
    languageFlags.forEach(flag => {
        if (flag.getAttribute('data-lang') === currentLang) {
            flag.style.display = 'block';
        } else {
            flag.style.display = 'none';
        }
    });

    // Update theme toggle icon text
    const themeIcons = themeToggle.querySelectorAll('i');
    themeIcons.forEach(icon => {
        if (icon.getAttribute('data-lang') === currentLang) {
            icon.style.display = 'block';
        } else {
            icon.style.display = 'none';
        }
    });

    // Save preference to localStorage
    localStorage.setItem('preferredLang', currentLang);
});

// Theme switching functionality
const savedTheme = localStorage.getItem('theme') || 'light';
const savedLang = localStorage.getItem('preferredLang') || 'fr';

// Apply saved theme
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fas fa-sun';
}

// Apply saved language
if (savedLang === 'en') {
    currentLang = 'en';
    document.body.lang = 'en';

    document.querySelectorAll('[data-lang]').forEach(element => {
        if (element.getAttribute('data-lang') === 'en') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });

    languageTexts.forEach(text => {
        if (text.getAttribute('data-lang') === 'en') {
            text.style.display = 'inline';
        } else {
            text.style.display = 'none';
        }
    });

    languageFlags.forEach(flag => {
        if (flag.getAttribute('data-lang') === 'en') {
            flag.style.display = 'block';
        } else {
            flag.style.display = 'none';
        }
    });

    const themeIcons = themeToggle.querySelectorAll('i');
    themeIcons.forEach(icon => {
        if (icon.getAttribute('data-lang') === 'en') {
            icon.style.display = 'block';
        } else {
            icon.style.display = 'none';
        }
    });
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }

    // Update theme icon based on language
    const themeIcons = themeToggle.querySelectorAll('i');
    themeIcons.forEach(icon => {
        if (icon.getAttribute('data-lang') === currentLang) {
            icon.style.display = 'block';
        } else {
            icon.style.display = 'none';
        }
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.boxShadow = 'none';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Animated counters for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = Math.ceil(target / speed);
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;

                counter.textContent = current + (counter.textContent.includes('%') ? '%' : '') +
                    (counter.textContent.includes('+') ? '+' : '');

                setTimeout(updateCounter, 20);
            }
        };

        updateCounter();
    });
};

// Function to toggle service descriptions
function toggleServiceDescription(button) {
    const card = button.closest('.service-card');
    const shortDesc = card.querySelector('.service-short-description');
    const fullDesc = card.querySelector('.service-full-description');
    const icon = button.querySelector('i');

    if (fullDesc.style.display === 'none') {
        fullDesc.style.display = 'block';
        shortDesc.style.display = 'none';
        if (currentLang === 'fr') {
            button.innerHTML = '<span>Lire moins</span> <i class="fas fa-chevron-up"></i>';
        } else {
            button.innerHTML = '<span>Read Less</span> <i class="fas fa-chevron-up"></i>';
        }
        button.classList.add('active');

        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        fullDesc.style.display = 'none';
        shortDesc.style.display = 'block';
        if (currentLang === 'fr') {
            button.innerHTML = '<span>Lire plus</span> <i class="fas fa-chevron-down"></i>';
        } else {
            button.innerHTML = '<span>Read More</span> <i class="fas fa-chevron-down"></i>';
        }
        button.classList.remove('active');
    }
}

// Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats-container')) {
                animateCounters();
            }

            if (entry.target.classList.contains('feature-card') ||
                entry.target.classList.contains('team-card') ||
                entry.target.classList.contains('tutor-card') ||
                entry.target.classList.contains('service-card')) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.feature-card, .team-card, .tutor-card, .service-card, .stats-container').forEach(el => {
    observer.observe(el);
});

// Initialize stats to 0
document.querySelectorAll('.stat-number').forEach(stat => {
    if (!stat.textContent.includes('%') && !stat.textContent.includes('+')) {
        stat.textContent = '0';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Notification functionality
document.addEventListener('DOMContentLoaded', function () {
    const appDownloadBtn = document.getElementById('appStoreBtn');
    const appDownloadBtn1 = document.getElementById('playStoreBtn');
    const notificationOverlay = document.getElementById('notificationOverlay');
    const notificationCard = document.getElementById('notificationCard');
    const notificationClose = document.getElementById('notificationClose');
    const notifyMeBtn = document.getElementById('notifyMeBtn');
    const notificationEmail = document.getElementById('notificationEmail');

    function showNotification() {
        notificationOverlay.classList.add('active');
        notificationCard.classList.add('active');
        document.body.style.overflow = 'hidden';

        startCountdown();

        setTimeout(() => {
            const progressFill = document.querySelector('.progress-fill');
            progressFill.style.width = '100%';
        }, 100);
    }

    function hideNotification() {
        notificationCard.classList.add('closing');
        notificationOverlay.classList.remove('active');

        setTimeout(() => {
            notificationCard.classList.remove('active', 'closing');
            document.body.style.overflow = '';

            const progressFill = document.querySelector('.progress-fill');
            progressFill.style.width = '0%';
        }, 400);
    }

    if (appDownloadBtn) {
        appDownloadBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification();
        });
    }
    if (appDownloadBtn1) {
        appDownloadBtn1.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification();
        });
    }

    notificationOverlay.addEventListener('click', hideNotification);
    notificationClose.addEventListener('click', hideNotification);

    notifyMeBtn.addEventListener('click', function () {
        const email = notificationEmail.value.trim();

        if (!email || !validateEmail(email)) {
            notificationEmail.style.borderColor = '#ef4444';
            notificationEmail.focus();
            return;
        }

        showSuccessMessage(email);
    });

    notificationEmail.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            notifyMeBtn.click();
        }
    });

    function startCountdown() {
        const launchDate = new Date();
        launchDate.setDate(launchDate.getDate() + 90);

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = launchDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');

            if (distance < 0) {
                clearInterval(countdownInterval);
                const countdownElement = document.querySelector('.notification-countdown');
                if (countdownElement) {
                    if (currentLang === 'fr') {
                        countdownElement.innerHTML = '<div class="countdown-finished">L\'app est disponible !</div>';
                    } else {
                        countdownElement.innerHTML = '<div class="countdown-finished">The app is available!</div>';
                    }
                }
            }
        }

        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 60000);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showSuccessMessage(email) {
        const notificationBody = document.querySelector('.notification-body');

        let successHTML = '';
        if (currentLang === 'fr') {
            successHTML = `
                        <div class="notification-success" id="notificationSuccess">
                            <i class="fas fa-check-circle"></i>
                            <h3>Parfait !</h3>
                            <p>Nous vous enverrons un email à <strong>${email}</strong> dès que l'application sera disponible.</p>
                            <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">Merci pour votre intérêt ! 🚀</p>
                        </div>
                    `;
        } else {
            successHTML = `
                        <div class="notification-success" id="notificationSuccess">
                            <i class="fas fa-check-circle"></i>
                            <h3>Perfect!</h3>
                            <p>We will send you an email at <strong>${email}</strong> as soon as the application is available.</p>
                            <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">Thank you for your interest! 🚀</p>
                        </div>
                    `;
        }

        notificationBody.innerHTML = successHTML;

        setTimeout(() => {
            const successElement = document.getElementById('notificationSuccess');
            if (successElement) {
                successElement.style.display = 'block';
            }
        }, 100);

        setTimeout(() => {
            hideNotification();
            setTimeout(() => {
                location.reload();
            }, 500);
        }, 3000);
    }

    const style = document.createElement('style');
    style.textContent = `
                .shake {
                    animation: shake 0.5s ease-in-out;
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `;
    document.head.appendChild(style);
});
// Dans le fichier JavaScript existant, ajouter :

// Gestion du slider de témoignages
function initTestimonialSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const sliderItems = document.querySelectorAll('.screenshot-item');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (!sliderTrack || sliderItems.length === 0) return;

    let currentIndex = 0;
    const itemWidth = sliderItems[0].offsetWidth;
    const totalItems = sliderItems.length;

    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateSlider();
    }

    // Auto-slide toutes les 5 secondes
    let slideInterval = setInterval(nextSlide, 5000);

    // Boutons de navigation
    nextBtn?.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    prevBtn?.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Pause au survol
    sliderTrack.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Gestion de la vidéo
function initVideoPlayer() {
    const videoWrapper = document.querySelector('.video-wrapper');
    const videoPlaceholder = document.querySelector('.video-placeholder');

    if (!videoWrapper || !videoPlaceholder) return;

    videoPlaceholder.addEventListener('click', () => {
        videoWrapper.innerHTML = `
            <iframe 
                width="100%" 
                height="100%" 
                src="image/temoin_video.mp4" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;
    });
}

// Chargement dynamique des captures d'écran
function loadTestimonialScreenshots() {
    // Remplacer avec les vraies images du client
    const screenshots = [
        {
            src: 'image/temoin1.webp',
            quote: '« Excellente méthodologie »'
        },
        {
            src: 'image/img13.webp',
            quote: '« Progression remarquable »'
        },
        {
            src: 'image/temoin8.webp',
            quote: '« Progression remarquable »'
        },
        {
            src: 'image/temoin3.webp',
            quote: '« Professionnalisme exceptionnel »'
        },
        {
            src: 'image/temoin4.webp',
            quote: '« Résultats concrets »'
        },
        {
            src: 'image/temoin5.webp',
            quote: '« Satisfaction totale »'
        },
        {
            src: 'image/temoin6.webp',
            quote: '« Professionnalisme exceptionnel »'
        },
        {
            src: 'image/temoin9.webp',
            quote: '« Professionnalisme exceptionnel »'
        },
        {
            src: 'image/temoin2.webp',
            quote: '« Professionnalisme exceptionnel »'
        }

    ];

    const sliderTrack = document.querySelector('.slider-track');
    if (!sliderTrack) return;

    sliderTrack.innerHTML = '';

    screenshots.forEach((screenshot, index) => {
        const item = document.createElement('div');
        item.className = 'screenshot-item';
        item.innerHTML = `
            <img src="${screenshot.src}" alt="Témoignage ${index + 1}" style="object-fit: contain; width: 100%;" >
            <div class="screenshot-overlay">
                <i class="fas fa-quote-left"></i>
                <p>${screenshot.quote}</p>
            </div>
        `;
        sliderTrack.appendChild(item);
    });
}

// Animations des statistiques
function animateSuccessStats() {
    const stats = document.querySelectorAll('.success-stat');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    stats.forEach(stat => observer.observe(stat));
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    loadTestimonialScreenshots();
    initTestimonialSlider();
    initVideoPlayer();
    animateSuccessStats();
});