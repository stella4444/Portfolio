// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Portfolio filtering (only on portfolio page)
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioGrid = document.querySelector('.portfolio-grid');

if (filterBtns.length > 0 && portfolioGrid) {
    // Sample portfolio data (replace with your actual images SUB PHOTOS)
    const portfolioItems = [
        { category: 'graduation', img: 'images/gradduo.jpg' },
        { category: 'graduation', img: 'images/gradsolo.jpg' },
        { category: 'headshots', img: 'images/careerHeadshot.jpg' },
        { category: 'headshots', img: 'images/headshotSolo.jpg' },
        { category: 'events', img: 'images/eventField.jpg' },
        { category: 'events', img: 'images/eventChapel.jpg' },
    ];
    
    // Display portfolio items
    function displayPortfolioItems(category = 'all') {
        if (!portfolioGrid) return;
        
        portfolioGrid.innerHTML = '';
        const filtered = category === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === category);
        
        filtered.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.innerHTML = `<img src="${item.img}" alt="Portfolio image">`;
            portfolioGrid.appendChild(portfolioItem);
        });
    }
    
    displayPortfolioItems();
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            displayPortfolioItems(filter);
        });
    });
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your inquiry! I will get back to you within 24 hours.');
        this.reset();
    });
}

// Package selection
const packageCards = document.querySelectorAll('.package-card');
if (packageCards.length > 0) {
    packageCards.forEach(card => {
        card.addEventListener('click', function() {
            packageCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Update payment button price
            const price = this.querySelector('.package-price').textContent;
            const payButton = document.getElementById('payButton');
            if (payButton) {
                payButton.innerHTML = `<i class="fas fa-lock"></i> Secure Payment ${price}`;
            }
        });
    });
}

// Payment method selection
const paymentOptions = document.querySelectorAll('.payment-option');
if (paymentOptions.length > 0) {
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// Payment button
const payButton = document.getElementById('payButton');
if (payButton) {
    payButton.addEventListener('click', function() {
        const selectedPackage = document.querySelector('.package-card.selected .package-name');
        const selectedPrice = document.querySelector('.package-card.selected .package-price');
        const selectedMethod = document.querySelector('.payment-option.selected div:last-child');
        
        if (selectedPackage && selectedPrice && selectedMethod) {
            alert(`Redirecting to ${selectedMethod.textContent} payment for ${selectedPackage.textContent} (${selectedPrice.textContent}). In a real website, this would connect to a payment processor like PayPal or Stripe.`);
        } else {
            alert('Please select a package and payment method.');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Active navigation link highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});s