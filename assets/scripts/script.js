

document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for fade-in
    document.body.classList.add('loaded');

    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Set initial active section
    const initialHash = window.location.hash.substring(1) || 'home';
    setActiveSection(initialHash);
    
    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').startsWith('#') 
                ? this.getAttribute('href').substring(1) 
                : this.getAttribute('href');
            
            if (this.getAttribute('href').startsWith('#')) {
                setActiveSection(targetId);
                history.pushState(null, null, `#${targetId}`);
            } else {
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'home';
        setActiveSection(hash);
    });
    
    // Animate skills on section display
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(skillsSection);
    }
    
    // Function to set active section
    function setActiveSection(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Function to animate skills bars
    function animateSkills() {
        const skills = document.querySelectorAll('.skill');
        skills.forEach(skill => {
            const level = skill.getAttribute('data-level');
            const progress = skill.querySelector('.progress');
            if (progress) {
                progress.style.width = level;
            }
        });
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});

new TypeIt("#element", {
    strings: "This is my string!",
    speed: 75,
    loop: true,
  }).go();