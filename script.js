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

    // 3. Track join_discord_click
    const discordCtaIds = [
        'cta-hero-discord',
        'cta-reveal-discord',
        'cta-final-discord',
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

    // 5. Track otland_thread_click
    const otlandCtaIds = ['cta-hero-otland', 'cta-final-otland'];
    otlandCtaIds.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                window.dataLayer.push({
                    event: 'otland_thread_click',
                    button_id: id,
                    utm_source: utm_source,
                    utm_medium: utm_medium,
                    utm_campaign: utm_campaign
                });
            });
        }
    });

    // 6. Track passive_showoff_click
    const showoffBtn = document.getElementById('cta-reveal-showoff');
    if (showoffBtn) {
        showoffBtn.addEventListener('click', () => {
            window.dataLayer.push({
                event: 'passive_showoff_click',
                utm_source: utm_source,
                utm_medium: utm_medium,
                utm_campaign: utm_campaign
            });
        });
    }

    // 7. Track youtube_channel_click
    const youtubeBtn = document.getElementById('cta-final-youtube');
    if (youtubeBtn) {
        youtubeBtn.addEventListener('click', () => {
            window.dataLayer.push({
                event: 'youtube_channel_click',
                utm_source: utm_source,
                utm_medium: utm_medium,
                utm_campaign: utm_campaign
            });
        });
    }

    // 8. Track general social links in footer
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            const platform = link.textContent.trim().toLowerCase();
            let eventName = 'social_link_click';
            
            if (platform === 'discord') eventName = 'join_discord_click';
            if (platform === 'youtube') eventName = 'youtube_channel_click';
            if (platform === 'otland thread') eventName = 'otland_thread_click';

            window.dataLayer.push({
                event: eventName,
                platform: platform,
                url: link.href,
                utm_source: utm_source,
                utm_medium: utm_medium,
                utm_campaign: utm_campaign
            });
        });
    });
});
