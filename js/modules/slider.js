function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) { 
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; 
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';


    slides.forEach(slide => {
    slide.style.width = width; 
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicator');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
    slider.append(indicators);

    for (let k = 0; k < slides.length; k++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', k + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    if (k == 0) {
        dot.style.opacity = 1;
    } 
    indicators.append(dot);
    dots.push(dot);
    }

    function changeOpacity() {
    dots.forEach(dot => dot.style.opacity = '.5'); 
    dots[slideIndex - 1].style.opacity = 1; 
    }

    function outPx(str) {
    return +str.replace(/\D/g, '');
    }

    function currentSlide() {
    if (slides.length < 10) { 
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
    }

    next.addEventListener('click', () => {

    if (offset == outPx(width) * (slides.length - 1)) {
        offset = 0; 
    } else {
        offset += outPx(width); 
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++; 
    }

    currentSlide();
    changeOpacity();
    });

    prev.addEventListener('click', () => {
    if (offset == 0) {  
        offset = outPx(width) * (slides.length - 1);
    } else {
        offset -= outPx(width); 
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == 1) {  
        slideIndex = slides.length; 
    } else {
        slideIndex--; 
    }
    currentSlide();
    dots.forEach(dot => dot.style.opacity = '.5'); //берем массив дотс и перебираем форИчем и устанавливаем изначальные инлайн стили
    dots[slideIndex - 1].style.opacity = 1; //и тут мы назначаем первому слайду опасити 1
    });

    dots.forEach(dot => { //берем каждую точку и навешиваем обработчик события
    dot.addEventListener('click', (e) => {//объект события нам нужен потому что сейчас у каждой из точек есть атрибут dataslideto который мы и должны получить
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo; //тут все просто, кликаем на 4, слайдИндекс будет 4
        offset = outPx(width) * (slideTo - 1); 
        //теперь нужно сделать смещение слайдера
        slidesField.style.transform = `translateX(-${offset}px)`;
        changeOpacity();
        currentSlide(); //тут повторяющиеся участки кода я вынес в отдельные функции, так будет правильней. Функция активного слайда и изменение опасити.
    });
    });
}

export default slider;