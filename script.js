// Initialize ScrollMagic Controller
var controller = new ScrollMagic.Controller();
var currentIndex = 0; // Track the current slide index
var slideDuration = 2000; // Hold slide for 2 seconds before moving

// Get all slides
var slides = document.querySelectorAll('.slide-container');
var totalSlides = slides.length;

// ScrollMagic Scene setup for each slide
slides.forEach((slide, index) => {
    var timeline = gsap.timeline();

    timeline.fromTo(slide.querySelector('.content'), 
        { opacity: 0, x: -100 }, 
        { opacity: 1, x: 0, duration: 2 });

    new ScrollMagic.Scene({
        triggerElement: slide,
        triggerHook: 0.5,
        duration: "100%" // Hold the scroll for the slide
    })
    .setTween(timeline)
    .addTo(controller);
});

// Automatically move to the next slide after 2 seconds of stop
// window.addEventListener('scroll', debounceAutoScroll);

function debounceAutoScroll() {
    clearTimeout(window.autoScrollTimeout);
    window.autoScrollTimeout = setTimeout(() => {
        goToNextSlide();
    }, slideDuration);
}

// Navigate to the next slide
function goToNextSlide() {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
        scrollToSlide(currentIndex);
    }
}

// Navigate to the previous slide
function goToPrevSlide() {
    debugger;
    if (currentIndex > 0) {
        currentIndex--;
        scrollToSlide(currentIndex);
    }
}

// Scroll to specific slide based on index
function scrollToSlide(index) {
    var targetSlide = slides[index];
    var top = targetSlide.offsetTop;
    window.scrollTo({ top: top, behavior: 'smooth' });
}

// Add click event listeners to the buttons
document.getElementById('prevBtn').addEventListener('click', goToPrevSlide);
document.getElementById('nextBtn').addEventListener('click', goToNextSlide);
