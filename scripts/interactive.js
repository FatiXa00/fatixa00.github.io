// Skill Progress Animation
function initSkillProgress() {
    const circles = document.querySelectorAll('.circular-progress circle');
    circles.forEach(circle => {
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
    });
}

// Project Filtering
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            
            projects.forEach(project => {
                const category = project.dataset.category;
                if (filter === 'all' || filter === category) {
                    project.style.display = 'block';
                    setTimeout(() => project.style.opacity = '1', 10);
                } else {
                    project.style.opacity = '0';
                    setTimeout(() => project.style.display = 'none', 300);
                }
            });
        });
    });
}

// Modal Handling
function initProjectModals() {
    const modal = document.querySelector('.project-modal');
    const modalContent = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.close-modal');

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with close button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Open modal when clicking project card
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectData = JSON.parse(card.dataset.project);
            modalContent.innerHTML = `
                <h2>${projectData.title}</h2>
                <p class="project-year">${projectData.year}</p>
                <p class="project-description">${projectData.description}</p>
                <div class="project-tech">
                    ${projectData.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
                <ul class="project-highlights">
                    ${projectData.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
            `;
            modal.style.display = 'block';
        });
    });
}

// Scroll Animation
function initScrollAnimation() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
}

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
    initSkillProgress();
    initProjectFilters();
    initProjectModals();
    initScrollAnimation();
    initMobileNav();
});
