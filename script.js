/**
 * Eternal Odyssey: Redemption Landing Page Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Optional: Add intersection observer for fade-in animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements you want to fade in
    // Example: document.querySelectorAll('.card, .feature-item').forEach(el => {
    //     el.classList.add('fade-in-element');
    //     observer.observe(el);
    // });

    // --- Tracking Setup ---
    window.dataLayer = window.dataLayer || [];

    // 1. Parse UTM parameters
    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get('utm_source') || 'organic';
    const utm_medium = urlParams.get('utm_medium') || '';
    const utm_campaign = urlParams.get('utm_campaign') || '';

    // 2. Track Page View
    window.dataLayer.push({
        event: 'page_view',
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign
    });

    // Helper placeholder for Google Ads Conversion Tracking
    // function trackGoogleAdsConversion() {
    //     if (typeof gtag !== 'undefined') {
    //         gtag('event', 'conversion', {
    //             'send_to': 'AW-XXXXXXXXX/YYYYYYYYYY'
    //         });
    //     }
    // }

    // 3. Track join_discord_click (The most important conversion event)
    const discordCtaIds = [
        'cta-hero-discord',
        'cta-teaser-discord',
        'cta-beta-discord',
        'cta-mobile-sticky-discord'
    ];

    discordCtaIds.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                window.dataLayer.push({
                    event: 'join_discord_click',
                    button_id: id,
                    utm_source: utm_source,
                    utm_medium: utm_medium,
                    utm_campaign: utm_campaign
                });

                // [GOOGLE ADS] - Insert Google Ads conversion tracking here
                // trackGoogleAdsConversion();
            });
        }
    });

    // 4. Track watch_teaser_click
    const watchTeaserBtn = document.getElementById('cta-watch-teaser');
    if (watchTeaserBtn) {
        watchTeaserBtn.addEventListener('click', () => {
            window.dataLayer.push({
                event: 'watch_teaser_click',
                utm_source: utm_source,
                utm_medium: utm_medium,
                utm_campaign: utm_campaign
            });
        });
    }

    // 5. Track social_link_click
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            window.dataLayer.push({
                event: 'social_link_click',
                platform: link.textContent.trim().toLowerCase(),
                url: link.href,
                utm_source: utm_source,
                utm_medium: utm_medium,
                utm_campaign: utm_campaign
            });
        });
    });
});
