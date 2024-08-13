class Carousel {
    constructor(element) {
        this.carousel = element;
        this.track = this.carousel.querySelector('.carousel-track');
        this.slides = [];
        this.currentIndex = 0;

        this.createSlides();
        this.updateCarousel();

        document.querySelector('.carousel-button.prev').addEventListener('click', () => this.prev());
        document.querySelector('.carousel-button.next').addEventListener('click', () => this.next());
    }

    createSlides() {
        console.log("Creating slides...");
        for (let i = 101; i <= 112; i++) {
            const slide = document.createElement('div');
            slide.classList.add('carousel-slide');
            const img = document.createElement('img');
            const imagePath = `MOT${i}.png`;
            console.log(`Attempting to load image: ${imagePath}`);
            img.src = imagePath;
            img.alt = `Moth Opera Image ${i - 100}`;
            img.onerror = () => {
                console.error(`Failed to load image: ${imagePath}`);
                slide.style.backgroundColor = '#FF0000';
                slide.textContent = `Failed to load: ${imagePath}`;
            };
            img.onload = () => {
                console.log(`Successfully loaded image: ${imagePath}`);
            };
            slide.appendChild(img);
            this.track.appendChild(slide);
            this.slides.push(slide);
        }
    }

    updateCarousel() {
        const newTransformValue = -this.currentIndex * 100 + '%';
        this.track.style.transform = `translateX(${newTransformValue})`;
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded. Initializing carousel...");
    const carouselElement = document.querySelector('.carousel');
    if (carouselElement) {
        new Carousel(carouselElement);
    } else {
        console.error("Carousel element not found in the DOM");
    }
});

// Log any unhandled errors
window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
});