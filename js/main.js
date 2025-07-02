// 画像データのシミュレーション
const imageData = {
  hero: [
    './images/hero/architecture1.jpg',
    './images/hero/architecture2.jpg',
    './images/hero/architecture3.jpg',
    './images/hero/architecture4.jpg',
    './images/hero/architecture5.jpg'
  ],
  philosophy: [
    './images/philosophy/philosophy1.jpg',
    './images/philosophy/philosophy2.jpg',
    './images/philosophy/philosophy3.jpg',
    './images/philosophy/philosophy4.jpg'
  ],
  profile: [
    './images/profile/profile1.jpg',
    './images/profile/profile2.jpg',
    './images/profile/profile3.jpg'
  ],
  works: [
    './images/works/works-bg.jpg',
    './images/works/work1.jpg',
    './images/works/work2.jpg',
    './images/works/work3.jpg',
    './images/works/work4.jpg'
  ],
  contact: [
    './images/contact/contact-bg.jpg',
    './images/contact/contact1.jpg',
    './images/contact/contact2.jpg',
    './images/contact/contact3.jpg'
  ]
};

// 定数定義
const SCROLL_THRESHOLD = 50;
const ANIMATION_OFFSET = 100;

// ナビゲーションバーのスクロール効果
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  });
}

// セクションのスクロールアニメーション
function handleScrollAnimation() {
  const elements = [
    document.querySelector('.philosophy-content'),
    document.querySelector('.profile-content'),
    document.querySelector('.contact-form'),
    ...document.querySelectorAll('.work-item')
  ].filter(Boolean);

  const animateOnScroll = () => {
    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementBottom = el.getBoundingClientRect().bottom;
      const isVisible = (elementTop < window.innerHeight - ANIMATION_OFFSET) && (elementBottom > 0);
      
      el.classList.toggle('animate', isVisible);
    });
  };
  
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
}

// ナビゲーションリンクのスムーズスクロール
function handleSmoothScroll() {
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;
      
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: 'smooth'
      });
    });
  });
}

// フォームのバリデーション
function handleFormValidation() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData.entries());
    
    // バリデーション
    let isValid = true;
    const requiredFields = ['name', 'email', 'message'];
    
    requiredFields.forEach(field => {
      const input = this.querySelector(`[name="${field}"]`);
      if (!input || !input.value.trim()) {
        isValid = false;
        input.classList.add('error');
        input.nextElementSibling.style.display = 'block';
      } else {
        input.classList.remove('error');
        input.nextElementSibling.style.display = 'none';
      }
    });
    
    if (isValid) {
      // フォーム送信処理
      console.log('Form submitted:', formObject);
      this.reset();
      this.innerHTML = '<div class="success-message">メッセージを送信しました。ありがとうございます。</div>';
    }
  });
}

// ページ読み込み完了時の処理
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // スライダーの初期化
    const sliderModule = await import('./image-slider.js');
    await sliderModule.initializeSliders();
    
    // 作品セクションの初期化
    const worksModule = await import('./works-loader.js');
    await worksModule.initializeWorks();
    
    // その他の機能の初期化
    handleNavbarScroll();
    handleScrollAnimation();
    handleSmoothScroll();
    handleFormValidation();
  } catch (error) {
    console.error('Error initializing page:', error);
  }
});