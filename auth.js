document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabLinks = document.querySelectorAll('.tab-links a');
    
    tabLinks.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all tabs and forms
            tabLinks.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.form-section').forEach(form => {
                form.classList.remove('active');
                form.style.opacity = '0';
            });
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding form
            const formId = tab.dataset.tab + '-form';
            const targetForm = document.getElementById(formId);
            targetForm.classList.add('active');
            
            // Fade in animation
            setTimeout(() => {
                targetForm.style.opacity = '1';
            }, 50);
        });
    });

// Update the form submission handler
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                if (form.id === 'login-form') {
                    window.location.href = 'dashboard.php';
                } else {
                    alert('Registration successful! Please login.');
                    document.querySelector('[data-tab="signin"]').click();
                }
            } else {
                alert(result.message || 'An error occurred');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});


    // Social login handlers
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = btn.classList.contains('google') ? 'Google' : 'Facebook';
            const originalHtml = btn.innerHTML;
            
            btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connecting...`;
            btn.disabled = true;

            // Simulate social login
            setTimeout(() => {
                btn.innerHTML = originalHtml;
                btn.disabled = false;
            }, 2000);
        });
    });

    // Password toggle functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.parentElement.querySelector('input');
            const icon = toggle.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
});
