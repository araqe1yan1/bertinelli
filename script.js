// 1. Инициализация иконок
lucide.createIcons();

// 2. Логика курсора (более плавная анимация)
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

document.addEventListener('mousemove', (e) => {
    // Используем requestAnimationFrame для плавности
    requestAnimationFrame(() => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        ring.style.left = `${e.clientX}px`;
        ring.style.top = `${e.clientY}px`;
    });
});

// 3. Навигация
function navTo(id) {
    const pages = document.querySelectorAll('.page');
    const links = document.querySelectorAll('.n-link');
    
    // Плавное скрытие всех страниц
    pages.forEach(p => {
        p.style.opacity = '0';
        setTimeout(() => p.classList.remove('active'), 400);
    });
    
    links.forEach(l => l.classList.remove('active'));
    
    setTimeout(() => {
        const target = document.getElementById(id);
        target.classList.add('active');
        // Небольшая задержка перед проявлением
        requestAnimationFrame(() => target.style.opacity = '1');
        document.getElementById('l-' + id).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        reveal();
    }, 450);
}

// 4. Модальное окно
function openProduct(name, price, tag, img) {
    document.getElementById('modal-name').innerText = name;
    document.getElementById('modal-price').innerText = price;
    document.getElementById('modal-tag').innerText = tag;
    document.getElementById('modal-img').style.backgroundImage = `url(${img})`;
    
    const modal = document.getElementById('product-modal');
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.style.opacity = '1');
    document.body.classList.add('modal-open'); // Блокируем скролл
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.style.opacity = '1');
}

function closeProduct(e) {
    document.body.classList.remove('modal-open'); // Разблокируем скролл
    const modal = document.getElementById('product-modal');
    modal.style.opacity = '0';
    setTimeout(() => modal.style.display = 'none', 500);
}

// 5. Анимация появления при скролле
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) el.classList.add('active');
    });
};
window.addEventListener('scroll', reveal);

// 6. Прелоадер и старт страницы
window.addEventListener('load', () => {
    let c = 0;
    const iv = setInterval(() => {
        c += Math.floor(Math.random() * 15) + 5;
        if(c >= 100) {
            c = 100;
            clearInterval(iv);
            setTimeout(() => {
                document.getElementById('preloader').style.transform = 'translateY(-100%)';
                reveal(); // Запускаем проверку при входе
            }, 500);
        }
        document.getElementById('perc').innerText = c + '%';
    }, 70);

    // Плавное появление заголовка
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transition = 'opacity 2s ease';
        setTimeout(() => heroTitle.style.opacity = '1', 1000);
    }
});

document.querySelectorAll('.c-link').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.c-link').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        // Здесь можно добавить логику фильтрации элементов с классом .product-item
    });
});