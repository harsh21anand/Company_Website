// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for service sections
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add specific animations for service content
                const serviceContent = entry.target.querySelector('.service-content');
                const serviceImage = entry.target.querySelector('.service-image');
                
                if (serviceContent) {
                    serviceContent.style.opacity = '1';
                    serviceContent.style.transform = 'translateY(0)';
                }
                
                if (serviceImage) {
                    serviceImage.style.opacity = '1';
                    serviceImage.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // Observe all service sections
    document.querySelectorAll('.service-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Image loading animation handler
    const images = document.querySelectorAll('.service-image img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.parentElement.classList.add('loaded');
        });

        if (img.complete) {
            img.parentElement.classList.add('loaded');
        }
    });

    // Add hover effects for service cards
    document.querySelectorAll('.service-content').forEach(content => {
        content.addEventListener('mouseenter', function() {
            const image = this.querySelector('.service-image');
            if (image) {
                image.style.transform = 'translateY(-10px)';
            }
        });

        content.addEventListener('mouseleave', function() {
            const image = this.querySelector('.service-image');
            if (image) {
                image.style.transform = 'translateY(0)';
            }
        });
    });

    // Active navigation state
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });

    // Add parallax effect to service images
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.service-image').forEach(image => {
            const speed = 0.5;
            const rect = image.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                image.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
            }
        });
    });

    // Add hover effects for service info sections
    document.querySelectorAll('.service-info').forEach(info => {
        info.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'rotate(360deg) scale(1.2)';
            this.querySelector('h2').style.color = '#1877f2';
        });

        info.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = 'rotate(0) scale(1)';
            this.querySelector('h2').style.color = '';
        });
    });

    // Animate list items sequentially
    document.querySelectorAll('.service-info ul').forEach(ul => {
        const listItems = ul.querySelectorAll('li');
        listItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 200 * index);
        });
    });

    // Add ripple effect to CTA buttons
    document.querySelectorAll('.service-cta').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });
});