// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const complaintForm = document.getElementById('complaintForm');
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('notificationModal');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.querySelector('.close');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeCounters();
    initializeFormValidation();
});

// Mobile Menu Toggle
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.anime-header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Form Validation and Submission
function initializeFormValidation() {
    // Complaint Form
    if (complaintForm) {
        complaintForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateComplaintForm()) {
                submitComplaint();
            }
        });
    }

    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                submitContact();
            }
        });
    }
}

function validateComplaintForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const category = document.getElementById('category').value;
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!name || !email || !phone || !category || !title || !description) {
        showModal('❌ Mohon lengkapi semua field yang wajib diisi!', 'error');
        return false;
    }

    if (!validateEmail(email)) {
        showModal('❌ Format email tidak valid!', 'error');
        return false;
    }

    if (!validatePhone(phone)) {
        showModal('❌ Format nomor telepon tidak valid!', 'error');
        return false;
    }

    if (description.length < 20) {
        showModal('❌ Deskripsi pengaduan minimal 20 karakter!', 'error');
        return false;
    }

    return true;
}

function validateContactForm() {
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
        showModal('❌ Mohon lengkapi semua field!', 'error');
        return false;
    }

    if (!validateEmail(email)) {
        showModal('❌ Format email tidak valid!', 'error');
        return false;
    }

    if (message.length < 10) {
        showModal('❌ Pesan minimal 10 karakter!', 'error');
        return false;
    }

    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function submitComplaint() {
    // Show loading state
    const submitBtn = complaintForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Mengirim...';
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(complaintForm);
    const complaintData = Object.fromEntries(formData);

    // Send to backend API
    fetch('api/complaint.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintData)
    })
    .then(response => response.json())
    .then(data => {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        if (data.success) {
            // Reset form
            complaintForm.reset();
            
            // Show success message
            showModal(`✅ ${data.message} Nomor tiket: ${data.data.ticketNumber}`, 'success');
            
            // Update stats if visible
            updateStats();
        } else {
            // Show error message
            showModal(`❌ ${data.message}`, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        
        // Fallback to localStorage if API fails
        const ticketNumber = generateTicketNumber();
        const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        complaints.push({
            ...complaintData,
            ticketNumber: ticketNumber,
            status: 'pending',
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('complaints', JSON.stringify(complaints));

        // Reset form
        complaintForm.reset();
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        showModal(`✅ Pengaduan berhasil dikirim! Nomor tiket: ${ticketNumber}`, 'success');
    });
}

function submitContact() {
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Mengirim...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        showModal('✅ Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
    }, 1500);
}

function generateTicketNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `TKT-${year}${month}${day}-${random}`;
}

// Track Complaint Function
function trackComplaint() {
    const ticketNumber = document.getElementById('ticketNumber').value.trim();
    const trackResult = document.getElementById('trackResult');

    if (!ticketNumber) {
        showModal('❌ Masukkan nomor tiket terlebih dahulu!', 'error');
        return;
    }

    // Show loading state
    trackResult.innerHTML = '<div style="text-align: center;"><span class="loading"></span> Mencari data...</div>';
    trackResult.style.display = 'block';

    // Call backend API
    fetch(`api/complaint.php?action=track&ticket=${encodeURIComponent(ticketNumber)}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const complaint = data.data;
            const statusColor = getStatusColor(complaint.status);
            const statusText = getStatusText(complaint.status);
            const createdDate = new Date(complaint.createdAt).toLocaleString('id-ID');

            trackResult.innerHTML = `
                <h3>📋 Detail Pengaduan</h3>
                <div style="margin-top: 1rem;">
                    <p><strong>Nomor Tiket:</strong> ${complaint.ticketNumber}</p>
                    <p><strong>Nama:</strong> ${complaint.name}</p>
                    <p><strong>Kategori:</strong> ${complaint.category}</p>
                    <p><strong>Judul:</strong> ${complaint.title}</p>
                    <p><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${statusText}</span></p>
                    <p><strong>Dibuat:</strong> ${createdDate}</p>
                </div>
                <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(255, 107, 157, 0.1); border-radius: 10px;">
                    <p><strong>Deskripsi:</strong></p>
                    <p>${complaint.description}</p>
                </div>
            `;
        } else {
            trackResult.innerHTML = `
                <div style="text-align: center; color: #ff6b6b;">
                    <h3>❌ Data Tidak Ditemukan</h3>
                    <p>${data.message}</p>
                </div>
            `;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        
        // Fallback to localStorage
        const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        const complaint = complaints.find(c => c.ticketNumber === ticketNumber);

        if (complaint) {
            const statusColor = getStatusColor(complaint.status);
            const statusText = getStatusText(complaint.status);
            const createdDate = new Date(complaint.createdAt).toLocaleString('id-ID');

            trackResult.innerHTML = `
                <h3>📋 Detail Pengaduan</h3>
                <div style="margin-top: 1rem;">
                    <p><strong>Nomor Tiket:</strong> ${complaint.ticketNumber}</p>
                    <p><strong>Nama:</strong> ${complaint.name}</p>
                    <p><strong>Kategori:</strong> ${complaint.category}</p>
                    <p><strong>Judul:</strong> ${complaint.title}</p>
                    <p><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${statusText}</span></p>
                    <p><strong>Dibuat:</strong> ${createdDate}</p>
                </div>
                <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(255, 107, 157, 0.1); border-radius: 10px;">
                    <p><strong>Deskripsi:</strong></p>
                    <p>${complaint.description}</p>
                </div>
            `;
        } else {
            trackResult.innerHTML = `
                <div style="text-align: center; color: #ff6b6b;">
                    <h3>❌ Data Tidak Ditemukan</h3>
                    <p>Nomor tiket tidak valid atau tidak ada dalam sistem kami.</p>
                </div>
            `;
        }
    });
}

function getStatusColor(status) {
    const colors = {
        pending: '#feca57',
        processing: '#48dbfb',
        resolved: '#1dd1a1',
        rejected: '#ff6b6b'
    };
    return colors[status] || '#636e72';
}

function getStatusText(status) {
    const texts = {
        pending: 'Menunggu Proses',
        processing: 'Sedang Diproses',
        resolved: 'Selesai',
        rejected: 'Ditolak'
    };
    return texts[status] || 'Tidak Diketahui';
}

// Modal Functions
function showModal(message, type = 'info') {
    modalMessage.innerHTML = message;
    modal.style.display = 'block';
    
    // Add animation class
    modalMessage.className = type === 'error' ? 'error-message' : 
                            type === 'success' ? 'success-message' : '';
}

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Scroll Animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });

    // Add scroll-animate class to elements
    const elementsToAnimate = [
        '.about-card',
        '.stat-card',
        '.contact-item',
        '.form-container',
        '.track-container'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('scroll-animate');
        });
    });
}

// Counter Animation
function initializeCounters() {
    updateStats();
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateStats();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }
}

// Update statistics from backend
function updateStats() {
    fetch('api/complaint.php?action=stats')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const stats = data.data;
            
            // Update stat numbers with animation
            animateCounter(0, stats.total, document.querySelector('.stat-number[data-target="1234"]'));
            animateCounter(0, stats.pending + stats.processing, document.querySelector('.stat-number[data-target="890"]'));
            animateCounter(0, stats.resolved, document.querySelector('.stat-number[data-target="756"]'));
            
            // Calculate satisfaction percentage (resolved vs total)
            const satisfaction = stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0;
            animateCounter(0, satisfaction, document.querySelector('.stat-number[data-target="98"]'));
        }
    })
    .catch(error => {
        console.error('Error fetching stats:', error);
        // Fallback to default animated numbers
        animateCounter(0, 1234, document.querySelector('.stat-number[data-target="1234"]'));
        animateCounter(0, 890, document.querySelector('.stat-number[data-target="890"]'));
        animateCounter(0, 756, document.querySelector('.stat-number[data-target="756"]'));
        animateCounter(0, 98, document.querySelector('.stat-number[data-target="98"]'));
    });
}

function animateCounter(start, end, element) {
    if (!element) return;
    
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.innerText = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize Animations
function initializeAnimations() {
    // Add entrance animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.sakura, .star');
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .submit-btn, .track-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form input focus effects
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Particle Effect (Optional Enhancement)
function createParticle() {
    const particle = document.createElement('div');
    particle.innerHTML = ['🌸', '⭐', '✨', '🎌'][Math.floor(Math.random() * 4)];
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-50px';
    particle.style.fontSize = Math.random() * 20 + 10 + 'px';
    particle.style.zIndex = '9999';
    particle.style.pointerEvents = 'none';
    particle.style.animation = 'fall 3s linear';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// Create particles periodically
setInterval(createParticle, 3000);

// Add falling animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Easter Egg: Konami Code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear';
    showModal('🎉 Easter Egg activated! You found the secret SUARA anime mode! 🌸', 'success');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
}

// Add rainbow animation for Easter Egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Export functions for global use
window.trackComplaint = trackComplaint;
window.showModal = showModal;
