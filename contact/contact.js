       // Hide header on scroll down, show on scroll up
        let lastScroll = 0;
        const header = document.getElementById("mainHeader");

        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > lastScroll && currentScroll > 100) {
                header.classList.add("hidden");
            } else {
                header.classList.remove("hidden");
            }

            if (currentScroll > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById("menuToggle");
        const nav = document.getElementById("mainNav");

        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            nav.classList.toggle("show");
            
            // Change menu icon when open/close
            if (nav.classList.contains("show")) {
                menuToggle.innerHTML = "✕";
            } else {
                menuToggle.innerHTML = "☰";
            }
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll("nav a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("show");
                menuToggle.innerHTML = "☰";
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!header.contains(e.target)) {
                nav.classList.remove("show");
                menuToggle.innerHTML = "☰";
            }
        });

        // Smooth scroll for CTA buttons
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Form validation functions
        function validateName(name) {
            const nameRegex = /^[a-zA-Z\s]{2,50}$/;
            return nameRegex.test(name.trim());
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email.trim());
        }

        function validatePhone(phone) {
            if (!phone) return true; // Phone is optional
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            return phoneRegex.test(phone.trim());
        }

        function validateSubject(subject) {
            return subject.trim().length >= 5 && subject.trim().length <= 100;
        }

        function validateMessage(message) {
            return message.trim().length >= 10 && message.trim().length <= 1000;
        }

        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
        }

        function clearError(elementId) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = '';
        }

        // Success message functions
        function showSuccessMessage() {
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('show');
            
            // Auto-hide after 8 seconds
            setTimeout(() => {
                hideSuccessMessage();
            }, 8000);
        }

        function hideSuccessMessage() {
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.remove('show');
        }

        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Validate form
            let isValid = true;

            if (!validateName(name)) {
                showError('nameError', 'Please enter a valid name (2-50 characters)');
                isValid = false;
            } else {
                clearError('nameError');
            }

            if (!validateEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('emailError');
            }

            if (!validatePhone(phone)) {
                showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            } else {
                clearError('phoneError');
            }

            if (!service) {
                showError('serviceError', 'Please select a service type');
                isValid = false;
            } else {
                clearError('serviceError');
            }

            if (!validateSubject(subject)) {
                showError('subjectError', 'Subject must be between 5 and 100 characters');
                isValid = false;
            } else {
                clearError('subjectError');
            }

            if (!validateMessage(message)) {
                showError('messageError', 'Message must be between 10 and 1000 characters');
                isValid = false;
            } else {
                clearError('messageError');
            }

            if (!isValid) {
                // Scroll to first error
                const firstError = document.querySelector('.error-message:not(:empty)');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual EmailJS code)
            setTimeout(() => {
                contactForm.reset();
                
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                
                // Show success message
                showSuccessMessage();
            }, 2000);
        });

        // Real-time validation
        document.getElementById('name').addEventListener('blur', function() {
            if (!validateName(this.value)) {
                showError('nameError', 'Please enter a valid name (2-50 characters)');
            } else {
                clearError('nameError');
            }
        });

        document.getElementById('email').addEventListener('blur', function() {
            if (!validateEmail(this.value)) {
                showError('emailError', 'Please enter a valid email address');
            } else {
                clearError('emailError');
            }
        });

        document.getElementById('phone').addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                showError('phoneError', 'Please enter a valid phone number');
            } else {
                clearError('phoneError');
            }
        });

        document.getElementById('subject').addEventListener('blur', function() {
            if (!validateSubject(this.value)) {
                showError('subjectError', 'Subject must be between 5 and 100 characters');
            } else {
                clearError('subjectError');
            }
        });

        document.getElementById('message').addEventListener('blur', function() {
            if (!validateMessage(this.value)) {
                showError('messageError', 'Message must be between 10 and 1000 characters');
            } else {
                clearError('messageError');
            }
        });

        // Add animation on scroll for stats
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.stat-card, .contact-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });