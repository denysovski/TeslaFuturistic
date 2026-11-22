// Homepage only: the scroll-driven hero, the interior gallery, the model showcase, the demo-drive slots,
// the FAQ and the hero stat tooltips. Shared behaviour (header, cart, reveals, images) is in shared.js.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BASE } from './shared.js';
import './home.css';
import './widgets.js';

const specButtons = document.querySelectorAll('.spec-toggle-button');
const driveSlotButtons = document.querySelectorAll('.drive-slot-card');
const specValues = document.getElementById('spec-values');
const zipInput = document.getElementById('zip-code-input');
const zipTooltip = document.getElementById('zip-tooltip');
const energySwapCard = document.getElementById('energy-swap-card');
const interiorCarousel = document.getElementById('interior-carousel');
const heroLanding = document.getElementById('hero-landing');

const specSets = {
    'model-3': [
        ['Range (EPA est.)', '363 mi'],
        ['Acceleration', '4.2 s 0-60 mph'],
        ['Top Speed', '125 mph'],
        ['Drive', 'All-Wheel Drive'],
        ['Charging', '250 kW'],
        ['Cargo', '24 cu ft']
    ],
    'model-y': [
        ['Range (EPA est.)', '311 mi'],
        ['Acceleration', '4.6 s 0-60 mph'],
        ['Top Speed', '135 mph'],
        ['Drive', 'Dual Motor All-Wheel Drive'],
        ['Charging', '250 kW'],
        ['Cargo', '76 cu ft']
    ],
    'model-s': [
        ['Range (EPA est.)', '402 mi'],
        ['Acceleration', '3.1 s 0-60 mph'],
        ['Top Speed', '149 mph'],
        ['Drive', 'Dual Motor All-Wheel Drive'],
        ['Charging', '250 kW'],
        ['Cargo', '28 cu ft']
    ],
    'model-x': [
        ['Range (EPA est.)', '335 mi'],
        ['Acceleration', '3.8 s 0-60 mph'],
        ['Top Speed', '149 mph'],
        ['Drive', 'Dual Motor All-Wheel Drive'],
        ['Charging', '250 kW'],
        ['Cargo', '92 cu ft']
    ]
};

let specSwapTimer = null;

// --- Spec image swap utility with stacked card effect ---
const specImages = document.querySelectorAll('.spec-image-stack');

const renderSpecDeck = (key) => {
    const images = Array.from(specImages);
    const activeIndex = images.findIndex((img) => img.dataset.model === key);

    images.forEach((img, index) => {
        img.classList.remove('is-active', 'spec-deck-center', 'spec-deck-left', 'spec-deck-right', 'spec-deck-hidden');
        if (index === activeIndex) {
            img.classList.add('is-active');
            img.classList.add('spec-deck-center');
        } else if (index === activeIndex - 1) {
            img.classList.add('spec-deck-left');
        } else if (index === activeIndex + 1) {
            img.classList.add('spec-deck-right');
        } else {
            img.classList.add('spec-deck-hidden');
        }
        img.style.zIndex = index === activeIndex ? '40' : index === activeIndex - 1 || index === activeIndex + 1 ? '30' : '10';
    });
};


const renderSpecs = (specKey) => {
    if (!specValues || !specSets[specKey]) {
        return;
    }

    if (specSwapTimer) {
        window.clearTimeout(specSwapTimer);
    }

    specValues.classList.remove('is-swap-in');
    specValues.classList.add('is-swap-out');

    specSwapTimer = window.setTimeout(() => {
        specValues.innerHTML = specSets[specKey].map(([label, value]) => `
            <div>
                <div class="w-8 h-0.5 bg-white mb-4"></div>
                <p class="text-sm text-neutral-400 mb-1">${label}</p>
                <p class="text-xl font-medium">${value}</p>
            </div>
        `).join('');
        specValues.classList.remove('is-swap-out');
        specValues.classList.add('is-swap-in');
        window.requestAnimationFrame(() => {
            specValues.classList.remove('is-swap-in');
        });
    }, 220);

    specButtons.forEach((button) => {
        const isActive = button.dataset.spec === specKey;
        button.classList.add('border');
        button.classList.toggle('is-active', isActive);
        button.classList.toggle('bg-white', isActive);
        button.classList.toggle('text-black', isActive);
        button.classList.toggle('border-white', isActive);
        button.classList.toggle('bg-transparent', !isActive);
        button.classList.toggle('text-white', !isActive);
        button.classList.toggle('border-white/30', !isActive);
    });
};

// Initialize first model as active
if (specImages.length > 0) {
    renderSpecDeck('model-3');
}

// Wire spec image swapping so buttons change the showcase image too
specButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const key = button.dataset.spec;
        renderSpecs(key);
        renderSpecDeck(key);
    });
});

const syncDriveSlotStyles = (selectedButton) => {
    driveSlotButtons.forEach((slotButton) => {
        const isActive = slotButton === selectedButton;
        slotButton.classList.toggle('is-active', isActive);
        slotButton.style.setProperty('background', isActive ? '#dc2626' : 'transparent', 'important');
        slotButton.style.setProperty('background-color', isActive ? '#dc2626' : 'transparent', 'important');
        slotButton.style.setProperty('border-color', isActive ? '#dc2626' : '#d4d4d8', 'important');
        slotButton.style.setProperty('color', isActive ? '#ffffff' : '#111827', 'important');
    });
};

driveSlotButtons.forEach((button) => {
    button.addEventListener('click', () => {
        syncDriveSlotStyles(button);
    });
});

syncDriveSlotStyles(document.querySelector('.drive-slot-card.is-active'));

// Initialize the spec image to model-3's visual (model1 as requested)
renderSpecDeck('model-3');

if (heroLanding) {
    const heroItems = Array.from(heroLanding.querySelectorAll('.hero-landing-item'));
    const heroSequenceCanvas = document.getElementById('hero-sequence');
    const heroSequenceContext = heroSequenceCanvas ? heroSequenceCanvas.getContext('2d') : null;
    const heroSequenceFrameCount = 61;
    const heroSequenceFrames = Array.from({ length: heroSequenceFrameCount }, (_, index) => {
        const frame = new Image();
        frame.src = `${BASE}img/hero-sequence/${window.innerWidth < 900 ? 960 : 1600}/frame-${String(index + 1).padStart(3, '0')}.webp`;
        return frame;
    });
    const heroSequenceState = { frame: 0 };
    let heroSequenceTargetFrame = 0;
    let heroSequenceCurrentFrame = 0;
    let heroSequenceLastFrame = -1;
    let heroSequenceFrameRaf = null;
    let heroSequenceReadyCount = 0;

    gsap.registerPlugin(ScrollTrigger);

    const drawHeroSequenceFrame = (frameIndex) => {
        if (!heroSequenceCanvas || !heroSequenceContext) {
            return;
        }

        const frame = heroSequenceFrames[frameIndex];
        if (!frame || !frame.complete || !frame.naturalWidth) {
            return;
        }

        const width = heroSequenceCanvas.clientWidth || heroLanding.clientWidth;
        const height = heroSequenceCanvas.clientHeight || heroLanding.clientHeight;
        const dpr = window.devicePixelRatio || 1;

        heroSequenceCanvas.width = Math.round(width * dpr);
        heroSequenceCanvas.height = Math.round(height * dpr);
        heroSequenceContext.setTransform(dpr, 0, 0, dpr, 0, 0);
        heroSequenceContext.clearRect(0, 0, width, height);

        const scale = Math.max(width / frame.naturalWidth, height / frame.naturalHeight);
        const drawWidth = frame.naturalWidth * scale;
        const drawHeight = frame.naturalHeight * scale;
        const offsetX = (width - drawWidth) / 2;
        const offsetY = (height - drawHeight) / 2;

        heroSequenceContext.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
    };

    const resizeHeroSequenceCanvas = () => {
        if (!heroSequenceCanvas || !heroSequenceContext) {
            return;
        }

        const width = heroSequenceCanvas.clientWidth || heroLanding.clientWidth;
        const height = heroSequenceCanvas.clientHeight || heroLanding.clientHeight;
        const dpr = window.devicePixelRatio || 1;

        heroSequenceCanvas.width = Math.round(width * dpr);
        heroSequenceCanvas.height = Math.round(height * dpr);
        heroSequenceContext.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawHeroSequenceFrame(Math.round(heroSequenceCurrentFrame));
    };

    const renderHeroSequence = () => {
        heroSequenceFrameRaf = null;

        heroSequenceCurrentFrame += (heroSequenceTargetFrame - heroSequenceCurrentFrame) * 0.12;
        if (Math.abs(heroSequenceTargetFrame - heroSequenceCurrentFrame) < 0.01) {
            heroSequenceCurrentFrame = heroSequenceTargetFrame;
        }

        const frameIndex = Math.max(0, Math.min(heroSequenceFrameCount - 1, Math.round(heroSequenceCurrentFrame)));
        if (frameIndex !== heroSequenceLastFrame) {
            heroSequenceLastFrame = frameIndex;
            drawHeroSequenceFrame(frameIndex);
        }

        if (heroSequenceCurrentFrame !== heroSequenceTargetFrame) {
            heroSequenceFrameRaf = window.requestAnimationFrame(renderHeroSequence);
        }
    };

    const queueHeroSequenceRender = () => {
        if (!heroSequenceFrameRaf) {
            heroSequenceFrameRaf = window.requestAnimationFrame(renderHeroSequence);
        }
    };

    const updateHeroSequenceTarget = () => {

        const trigger = ScrollTrigger.getById('hero-sequence');
        if (!trigger) {
            heroSequenceTargetFrame = 0;
            return;
        }

        heroSequenceTargetFrame = trigger.progress * (heroSequenceFrameCount - 1);
        queueHeroSequenceRender();
    };

    heroSequenceFrames.forEach((frame, index) => {
        frame.addEventListener('load', () => {
            heroSequenceReadyCount += 1;
            if (index === 0) {
                resizeHeroSequenceCanvas();
            }
            if (heroSequenceReadyCount === heroSequenceFrameCount ) {
                ScrollTrigger.refresh();
            }
        });
    });

    resizeHeroSequenceCanvas();
    window.addEventListener('resize', resizeHeroSequenceCanvas);

    gsap.to(heroSequenceState, {
        frame: heroSequenceFrameCount - 1,
        ease: 'none',
        scrollTrigger: {
            id: 'hero-sequence',
            trigger: heroLanding,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
            invalidateOnRefresh: true,
            onUpdate: updateHeroSequenceTarget,
            onRefresh: updateHeroSequenceTarget,
        },
    });

    heroItems.forEach((item, index) => {
        const randomX = -36 + Math.round(Math.random() * 72);
        const randomY = 8 + Math.round(Math.random() * 22);
        const randomR = (-2 + Math.random() * 4).toFixed(2);
        const randomDelay = 220 + (index * 110) + Math.round(Math.random() * 220);

        item.classList.add('landing-item');
        item.style.setProperty('--start-x', `${randomX}px`);
        item.style.setProperty('--start-y', `${randomY}px`);
        item.style.setProperty('--start-r', `${randomR}deg`);
        item.style.transitionDelay = `${randomDelay}ms`;

        window.setTimeout(() => {
            item.classList.add('is-in');
        }, randomDelay);
    });

    updateHeroSequenceTarget();
    queueHeroSequenceRender();
}

renderSpecs('model-3');

if (energySwapCard) {
    energySwapCard.addEventListener('mouseenter', () => energySwapCard.classList.add('is-hovering'));
    energySwapCard.addEventListener('mouseleave', () => energySwapCard.classList.remove('is-hovering'));
}

if (interiorCarousel) {
    const interiorSlides = Array.from(interiorCarousel.querySelectorAll('[data-interior-slide]'));
    const interiorDots = Array.from(interiorCarousel.querySelectorAll('[data-interior-dot]'));
    const interiorTitle = document.getElementById('interior-slide-title');
    const interiorDescription = document.getElementById('interior-slide-description');
    const statValueEls = [
        document.getElementById('interior-stat-1-value'),
        document.getElementById('interior-stat-2-value'),
        document.getElementById('interior-stat-3-value'),
        document.getElementById('interior-stat-4-value')
    ];
    const statLabelEls = [
        document.getElementById('interior-stat-1-label'),
        document.getElementById('interior-stat-2-label'),
        document.getElementById('interior-stat-3-label'),
        document.getElementById('interior-stat-4-label')
    ];

    const interiorSlideData = [
        {
            title: 'Immersive cockpit design',
            description: 'A panoramic dashboard layout keeps controls minimal and focus centered on the drive.',
            stats: [
                ['17”', 'Cinematic Display'],
                ['2200x1300', 'Resolution'],
                ['10 TF', 'Processing Power'],
                ['960 W', '22-Speaker Audio']
            ]
        },
        {
            title: 'Calm ambient cabin',
            description: 'Material finish, low-noise architecture, and glass geometry create a quiet premium atmosphere.',
            stats: [
                ['22', 'Speakers'],
                ['Dual', 'Wireless Chargers'],
                ['HEPA', 'Air Filtration'],
                ['Ventilated', 'Front Seats']
            ]
        },
        {
            title: 'Passenger-first comfort',
            description: 'Rear display controls media and climate while preserving clean lines across the full cabin.',
            stats: [
                ['8"', 'Rear Touchscreen'],
                ['Tri-Zone', 'Climate Control'],
                ['Bluetooth', 'Headphone Support'],
                ['Flat Floor', 'Rear Legroom']
            ]
        }
    ];

    let interiorIndex = 0;
    let interiorTimerId;

    const startInteriorTimer = () => {
        window.clearInterval(interiorTimerId);
        interiorTimerId = window.setInterval(() => {
            renderInteriorSlide((interiorIndex + 1) % interiorSlides.length, false);
        }, 5000);
    };

    const renderInteriorSlide = (nextIndex, resetTimer = true) => {
        interiorIndex = nextIndex;

        interiorSlides.forEach((slide, index) => {
            slide.classList.toggle('is-active', index === interiorIndex);
        });

        interiorDots.forEach((dot, index) => {
            dot.classList.toggle('is-active', index === interiorIndex);
        });

        const content = interiorSlideData[interiorIndex];
        if (content && interiorTitle && interiorDescription) {
            interiorTitle.textContent = content.title;
            interiorDescription.textContent = content.description;
            content.stats.forEach(([value, label], statIndex) => {
                if (statValueEls[statIndex]) {
                    statValueEls[statIndex].textContent = value;
                }
                if (statLabelEls[statIndex]) {
                    statLabelEls[statIndex].textContent = label;
                }
            });
        }

        if (resetTimer) {
            startInteriorTimer();
        }
    };

    interiorDots.forEach((dot, index) => {
        dot.addEventListener('click', () => renderInteriorSlide(index, true));
    });

    // Start with Calm ambient slide (index 1) by default
    renderInteriorSlide(1, false);

    // Only start auto-carousel when the carousel section is scrolled into view
    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startInteriorTimer();
                carouselObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    carouselObserver.observe(interiorCarousel);
}

if (zipInput && zipTooltip) {
    const moveTooltip = (event) => {
        zipTooltip.style.left = `${event.clientX}px`;
        zipTooltip.style.top = `${event.clientY - 52}px`;
    };

    zipInput.addEventListener('mouseenter', (event) => {
        zipTooltip.classList.add('is-visible');
        moveTooltip(event);
    });
    zipInput.addEventListener('mousemove', moveTooltip);
    zipInput.addEventListener('mouseleave', () => zipTooltip.classList.remove('is-visible'));
    zipInput.addEventListener('focus', () => zipTooltip.classList.add('is-visible'));
    zipInput.addEventListener('blur', () => zipTooltip.classList.remove('is-visible'));
}

// "React-like" Reveal Animations
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('faq-open');
        faqItems.forEach((el) => el.classList.remove('faq-open'));
        if (!isActive) {
            item.classList.add('faq-open');
        }
    });
});

// Cursor-tracking tooltips for spec cards
document.querySelectorAll('.spec-card').forEach(card => {
    const tooltip = card.querySelector('.spec-tooltip');
    if (!tooltip) return;

    let animationFrame = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animateTooltip = () => {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        tooltip.style.left = currentX + 'px';
        tooltip.style.top = currentY + 'px';

        if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
            animationFrame = requestAnimationFrame(animateTooltip);
        } else {
            animationFrame = null;
        }
    };

    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '90';
        tooltip.classList.add('is-visible');
        tooltip.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const offsetX = 120;
        const offsetY = 120;
        const verticalPull = (y - rect.height / 2) * 0.95;
        targetX = x + offsetX;
        targetY = y - offsetY + verticalPull;

        if (!animationFrame) {
            currentX = targetX;
            currentY = targetY;
            tooltip.style.left = currentX + 'px';
            tooltip.style.top = currentY + 'px';
            animationFrame = requestAnimationFrame(animateTooltip);
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '';
        tooltip.classList.remove('is-visible');
        tooltip.style.transform = 'translate(-50%, -50%) scale(0.98)';
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    });
});

// Showcase on phones: arrows and swipe step through the same model buttons.
const deck = document.querySelector('.spec-deck');
if (deck) {
    const order = Array.from(specButtons).map((b) => b.dataset.spec);
    const step = (dir) => {
        const current = Array.from(specButtons).findIndex((b) => b.classList.contains('is-active'));
        const next = (current + dir + order.length) % order.length;
        specButtons[next].click();
    };
    deck.querySelectorAll('[data-deck]').forEach((b) => b.addEventListener('click', () => step(+b.dataset.deck)));
    let x0 = null;
    deck.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    deck.addEventListener('touchend', (e) => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
        x0 = null;
    });
}

// Demo drive slots: the next three days, so the dates never go stale.
document.querySelectorAll('[data-drive-slot]').forEach((slot, i) => {
    const day = new Date();
    day.setDate(day.getDate() + i + 1);
    slot.querySelector('.drive-slot-label').textContent = day.toLocaleDateString('en-GB', { weekday: 'long' });
    slot.querySelector('.drive-slot-date').textContent = day.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
});
