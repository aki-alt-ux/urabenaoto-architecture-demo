// ========================================
// 占部直人建築設計事務所 - メインJavaScript
// ========================================

class ArchitectureSite {
  constructor() {
    this.currentLanguage = 'ja';
    this.sliders = new Map();
    this.scrollY = 0;
    this.sliderManager = new SliderManager();
    this.modalManager = new ModalManager();
    this.formValidator = new FormValidator();
    this.sectionObserver = new SectionObserver();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.sliderManager.initialize();
    this.sectionObserver.initialize();
    this.modalManager.initialize();
    this.formValidator.initialize();
    this.initializeSliders();
  }

  // ========================================
  // イベントリスナー設定
  // ========================================
  setupEventListeners() {
    // スクロールイベント
    window.addEventListener('scroll', this.throttle(() => {
      this.scrollY = window.scrollY;
      this.handleScroll();
    }, 16));

    // リサイズイベント
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  handleScroll() {
    // スクロール時の処理
    const navbar = document.getElementById('navbar');
    if (this.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  handleResize() {
    // リサイズ時の処理
    this.sliderManager.handleResize();
  }

  // ========================================
  // アニメーション処理
  // ========================================
  animateOnLoad() {
    // ページ読み込み時のアニメーション
    document.body.classList.add('loaded');
    
    // ヒーローセクションのアニメーション
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.classList.add('fade-in');
    }

    // 各セクションのアニメーション
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('fade-in');
      }, 100 * index);
    });
  }

  // ========================================
  // スライダー初期化と制御
  // ========================================
  initializeSliders() {
    const sliderConfigs = [
      {
        container: '.hero-slider',
        slides: this.getSlidesForSection('hero'),
        duration: 5000
      },
      {
        container: '.philosophy-slider',
        slides: this.getSlidesForSection('philosophy'),
        duration: 7000
      },
      {
        container: '.profile-slider',
        slides: this.getSlidesForSection('profile'),
        duration: 6000
      },
      {
        container: '.contact-slider',
        slides: this.getSlidesForSection('contact'),
        duration: 4000
      },
      {
        container: '.works-slider',
        slides: this.getWorksSlides(),
        duration: 8000
      }
    ];

    sliderConfigs.forEach(config => {
      if (config.slides && config.slides.length > 0) {
        this.sliderManager.create(config);
      }
    });
  }

  // スライダー画像取得
  getSlidesForSection(section) {
    const basePath = 'assets/images';
    const slides = {
      hero: [
        { src: `${basePath}/hero/0001.jpg`, alt: 'トップ画像1' },
        { src: `${basePath}/hero/0002.jpg`, alt: 'トップ画像2' },
        { src: `${basePath}/hero/0003.jpg`, alt: 'トップ画像3' }
      ],
      philosophy: [
        { src: `${basePath}/philosophy/0001.jpg`, alt: '建築哲学1' },
        { src: `${basePath}/philosophy/0002.jpg`, alt: '建築哲学2' },
        { src: `${basePath}/philosophy/0003.jpg`, alt: '建築哲学3' }
      ],
      profile: [
        { src: `${basePath}/profile/0001.jpg`, alt: 'プロフィール1' },
        { src: `${basePath}/profile/0002.jpg`, alt: 'プロフィール2' },
        { src: `${basePath}/profile/0003.jpg`, alt: 'プロフィール3' }
      ],
      contact: [
        { src: `${basePath}/contact/0001.jpg`, alt: 'お問い合わせ1' },
        { src: `${basePath}/contact/0002.jpg`, alt: 'お問い合わせ2' },
        { src: `${basePath}/contact/0003.jpg`, alt: 'お問い合わせ3' }
      ]
    };
    return slides[section] || [];
  }

  // 作品画像取得
  getWorksImages() {
    const basePath = 'assets/images/works';
    return {
      residential: [
        { src: `${basePath}/0027.jpg`, alt: '住宅1' },
        { src: `${basePath}/0028.jpg`, alt: '住宅2' },
        { src: `${basePath}/0029.jpg`, alt: '住宅3' }
      ],
      commercial: [
        { src: `${basePath}/0030.jpg`, alt: '商業施設1' },
        { src: `${basePath}/0031.jpg`, alt: '商業施設2' },
        { src: `${basePath}/0032.jpg`, alt: '商業施設3' }
      ],
      office: [
        { src: `${basePath}/0033.jpg`, alt: 'オフィス1' },
        { src: `${basePath}/0034.jpg`, alt: 'オフィス2' },
        { src: `${basePath}/0035.jpg`, alt: 'オフィス3' }
      ],
      public: [
        { src: `${basePath}/0036.jpg`, alt: '公共施設1' },
        { src: `${basePath}/0037.jpg`, alt: '公共施設2' },
        { src: `${basePath}/0038.jpg`, alt: '公共施設3' }
      ],
      renovation: [
        { src: `${basePath}/0039.jpg`, alt: 'リノベーション1' },
        { src: `${basePath}/0040.jpg`, alt: 'リノベーション2' },
        { src: `${basePath}/0041.jpg`, alt: 'リノベーション3' }
      ],
      interior: [
        { src: `${basePath}/0042.jpg`, alt: 'インテリア1' },
        { src: `${basePath}/0043.jpg`, alt: 'インテリア2' },
        { src: `${basePath}/0044.jpg`, alt: 'インテリア3' }
      ]
    };
  }

  // 作品スライダー画像取得
  getWorksSlides() {
    const worksImages = this.getWorksImages();
    return Object.values(worksImages).flat();
  }

  // ========================================
  // モーダルイベント設定
  // ========================================
  setupModalEvents() {
    const workElements = document.querySelectorAll('.work-item');
    workElements.forEach(work => {
      work.addEventListener('click', () => {
        const workId = work.dataset.workId;
        const workData = this.worksData[workId];
        if (workData) {
          this.modalManager.open(workData);
        }
      });
    });

    const closeButton = document.querySelector('.modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.modalManager.close();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.modalManager.close();
      }
    });
  }

  // ========================================
  // フォームイベント設定
  // ========================================
  setupFormEvents() {
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (this.formValidator.validate()) {
          this.sendForm();
        }
      });
    }
  }

  // ========================================
  // フォーム送信処理
  // ========================================
  async sendForm() {
    try {
      const formData = new FormData(this.form);
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        this.showSuccessMessage();
      } else {
        this.formValidator.showErrorMessage('送信に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      this.formValidator.showErrorMessage('通信エラーが発生しました。');
    }
  }

  // ========================================
  // 成功メッセージ表示
  // ========================================
  showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = 'お問い合わせありがとうございます。';
    this.form.appendChild(message);

    setTimeout(() => {
      message.remove();
      this.form.reset();
    }, 3000);
  }

  // ========================================
  // ユーティリティ関数
  // ========================================
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait) {
    let timeout;
    return function(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// ========================================
// スライダー管理モジュール
// ========================================
class SliderManager {
  constructor() {
    this.sliders = new Map();
    this.activeSlider = null;
  }

  initialize() {
    // 初期化処理
  }

  create(config) {
    const { container, slides, duration = 5000 } = config;
    const sliderContainer = document.querySelector(container);
    if (!sliderContainer) return;

    // スライダーのHTMLを構築
    const sliderHTML = `
      <div class="slider-wrapper">
        <div class="slider-track">
          ${slides.map(slide => `
            <div class="slide">
              <img src="${slide.src}" alt="${slide.alt}" loading="lazy">
            </div>
          `).join('')}
        </div>
        <div class="slider-controls">
          <button class="slider-prev" aria-label="前へ">←</button>
          <button class="slider-next" aria-label="次へ">→</button>
        </div>
      </div>
    `;

    sliderContainer.innerHTML = sliderHTML;
    const track = sliderContainer.querySelector('.slider-track');
    const prevBtn = sliderContainer.querySelector('.slider-prev');
    const nextBtn = sliderContainer.querySelector('.slider-next');

    let currentIndex = 0;
    let isAnimating = false;
    let autoplayInterval;

    const updateSlider = () => {
      if (isAnimating) return;
      isAnimating = true;

      const slideWidth = track.clientWidth;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

      setTimeout(() => {
        isAnimating = false;
      }, 500);
    };

    const startAutoplay = () => {
      stopAutoplay();
      autoplayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
      }, duration);
    };

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };

    const handleResize = () => {
      updateSlider();
    };

    // イベントリスナーの設定
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
      stopAutoplay();
      startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
      stopAutoplay();
      startAutoplay();
    });

    // スライダーの初期化
    this.sliders.set(container, {
      track,
      currentIndex,
      updateSlider,
      startAutoplay,
      stopAutoplay,
      handleResize
    });

    // 自動再生の開始
    startAutoplay();
  }

  handleResize() {
    this.sliders.forEach(slider => {
      if (slider.handleResize) {
        slider.handleResize();
      }
    });
  }
}

// ========================================
// モーダル管理モジュール
// ========================================
class ModalManager {
  constructor() {
    this.modal = null;
    this.modalImage = null;
    this.modalTitle = null;
    this.modalDescription = null;
  }

  initialize() {
    this.modal = document.querySelector('.work-modal');
    this.modalImage = document.querySelector('.modal-image');
    this.modalTitle = document.querySelector('.modal-title');
    this.modalDescription = document.querySelector('.modal-description');

    if (this.modal) {
      this.setupModalEvents();
    }
  }

  setupModalEvents() {
    const closeButton = document.querySelector('.modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  open(work) {
    if (!this.modal) return;

    this.modalImage.src = work.image;
    this.modalTitle.textContent = work.title;
    this.modalDescription.textContent = work.description;
    this.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal) return;

    this.modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// ========================================
// フォーム検証モジュール
// ========================================
class FormValidator {
  constructor() {
    this.form = null;
    this.submitButton = null;
  }

  initialize() {
    this.form = document.querySelector('form');
    this.submitButton = document.querySelector('form button[type="submit"]');

    if (this.form) {
      this.setupFormEvents();
    }
  }

  setupFormEvents() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validate()) {
        this.form.submit();
      }
    });
  }

  validate() {
    const inputs = this.form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });

    return isValid;
  }

  showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    this.form.insertBefore(errorDiv, this.form.firstChild);

    setTimeout(() => {
      errorDiv.remove();
    }, 3000);
  }
}

// ========================================
// セクションオブザーバーモジュール
// ========================================
class SectionObserver {
  constructor() {
    this.observer = null;
  }

  initialize() {
    this.setupObserver();
    this.observeSections();
  }

  setupObserver() {
    const options = {
      threshold: 0.5
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, options);
  }

  observeSections() {
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
      this.observer.observe(section);
    });
  }
}

// ========================================
// 初期化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  new ArchitectureSite();
});

// CSSアニメーション用のスタイル追加
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .success-message,
  .error-message {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;
document.head.appendChild(style);