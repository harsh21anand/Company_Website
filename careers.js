document.addEventListener('DOMContentLoaded', function() {
    // Sample job data - In real application, this would come from a backend
    const jobs = [
        {
            title: 'Software Engineer',
            type: 'experienced',
            location: 'Bhubaneswar',
            department: 'Engineering',
            experience: '3-5 years'
        },
        {
            title: 'Graduate Engineer Trainee',
            type: 'graduate',
            location: 'Bhubaneswar',
            department: 'Engineering',
            experience: 'Fresh Graduate'
        },
        {
            title: 'Summer Intern',
            type: 'internship',
            location: 'Remote',
            department: 'Technology',
            experience: 'Currently Studying'
        }
        // Add more job listings as needed
    ];

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter jobs
            const filter = button.getAttribute('data-filter');
            displayJobs(filter);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredJobs = jobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.location.toLowerCase().includes(searchTerm) ||
            job.department.toLowerCase().includes(searchTerm)
        );
        renderJobs(filteredJobs);
    });

    // Display jobs based on filter
    function displayJobs(filter) {
        const filteredJobs = filter === 'all' 
            ? jobs 
            : jobs.filter(job => job.type === filter);
        renderJobs(filteredJobs);
    }

    // Render jobs to the page
    function renderJobs(jobsToRender) {
        const jobsGrid = document.querySelector('.jobs-grid');
        jobsGrid.innerHTML = jobsToRender.map(job => `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                <p><i class="fas fa-briefcase"></i> ${job.department}</p>
                <p><i class="fas fa-clock"></i> ${job.experience}</p>
                <button class="apply-btn">Apply Now</button>
            </div>
        `).join('');
    }

    // Initialize with all jobs
    displayJobs('all');

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

    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.path-card, .benefit-card, .step').forEach(el => {
        observer.observe(el);
    });
});