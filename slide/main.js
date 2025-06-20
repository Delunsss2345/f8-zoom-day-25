const slides = document.querySelectorAll('[data-slideMain]');

slides.forEach(slide => {
    const slideContent = slide.querySelector('[data-slideContent]');
    const slideItems = slide.querySelectorAll('[data-index]');
    const dots = slide.querySelector('[data-dots]');
    const controls = slide.querySelector('[data-control]');

    let checkSpam = false ; 
    let currentIndex = 1;
    const maxIndex = slideItems.length - 1;

    const firstClone = slideItems[0].cloneNode(true);
    const lastClone = slideItems[maxIndex].cloneNode(true);

    slideContent.appendChild(firstClone);
    slideContent.prepend(lastClone);

    slideContent.style.transform = `translateX(-100%)`;

    setTimeout(() => {
        slideContent.style.transition = "transform 0.3s ease";
    }, 10)


    const nextSlide = (control) => {
        const oldDot = dots.querySelector(`[data-slide-to="${currentIndex - 1}"]`);
        if (oldDot) oldDot.classList.remove("active");


        if(checkSpam) return ;
        checkSpam = true ; 

        if (control === "prev") {
            currentIndex--;
        } else if (control === "next") {
            currentIndex++;
        }
        
        const offset = `-${currentIndex * 100}%`;
        slideContent.style.transform = `translateX(${offset})`;
        
        if (currentIndex >= 1 && currentIndex <= maxIndex + 1) {
            const newDot = dots.querySelector(`[data-slide-to="${currentIndex - 1}"]`);
            if (newDot) newDot.classList.add("active");
        }

    };



    controls.onclick = (e) => {
        const control = e.target.closest("[data-slide]");
        if (!control) return;
        nextSlide(control.dataset.slide) ; 
    }

    let play = setInterval(() => nextSlide("next"), 3000);
    
    slide.addEventListener("mouseenter", () => clearInterval(play));
    
    slide.addEventListener("mouseleave", () => {
        play = setInterval(() => nextSlide("next"), 3000);
    });



    slideContent.addEventListener('transitionend', () => {
        checkSpam = false;

        if (currentIndex === slideItems.length + 1) {
            slideContent.style.transition = "none";
            currentIndex = 1;

            slideContent.style.transform = `translateX(-${currentIndex * 100}%)`;
            const newDot = dots.querySelector(`[data-slide-to="0"]`);

            if (newDot) newDot.classList.add("active");
            setTimeout(() => {
                slideContent.style.transition = "transform 0.3s ease";
            }, 10);
        }

        if (currentIndex === 0) {
            slideContent.style.transition = "none";
            currentIndex = slideItems.length;
            slideContent.style.transform = `translateX(-${currentIndex * 100}%)`;
            const newDot = dots.querySelector(`[data-slide-to="${maxIndex}"]`);
            if (newDot) newDot.classList.add("active");
            setTimeout(() => {
                slideContent.style.transition = "transform 0.3s ease";
            }, 10);
        }
    });

});


