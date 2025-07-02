// 定数定義
const SLIDER_INTERVAL = 5000; // スライド切り替えの間隔（ミリ秒）

// 画像ファイルの設定
const IMAGE_CONFIG = {
  hero: {
    files: ['0001.jpg', '0002.jpg', '0003.jpg', '0026.jpg'],
    path: './images/hero'
  },
  philosophy: {
    files: ['0005.jpg', '0006.jpg', '0008.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg'],
    path: './images/philosophy'
  },
  profile: {
    files: ['0017.jpg', '0018.jpg', '0019.jpg', '0021.jpg', '0022.jpg', '0023.jpg', '0024.jpg', '0025.jpg'],
    path: './images/profile'
  },
  works: {
    files: ['0027.jpg', '0028.jpg', '0029.jpg', '0030.jpg', '0031.jpg', '0032.jpg'],
    path: './images/works'
  },
  contact: {
    files: [],
    path: './images/contact'
  }
};

// 各セクションの前回アクティブなスライドのインデックスを追跡
const activeSlideIndex = {
  hero: 0,
  philosophy: 0,
  profile: 0,
  works: 0,
  contact: 0
};

/**
 * 画像ファイルのパスを取得する
 * @param {string} section - セクション名
 * @param {string} file - ファイル名
 * @returns {string} 画像の完全なパス
 */
function getImagePath(section, file) {
  return `${IMAGE_CONFIG[section].path}/${file}`;
}

/**
 * 画像ファイルのリストを取得する
 * @param {string} section - セクション名
 * @returns {string[]} 画像ファイルのリスト
 */
async function getImageFiles(section) {
  try {
    return IMAGE_CONFIG[section]?.files || [];
  } catch (error) {
    console.error(`Error loading images for ${section}:`, error);
    return [];
  }
}

/**
 * 配列をランダムに並び替える
 * @param {Array} array - 並び替える配列
 * @returns {Array} ランダムに並び替えられた配列
 */
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

/**
 * スライダーを初期化する
 * @param {string} sectionId - セクションID
 * @param {string[]} imageArray - 画像ファイルの配列
 */
function initSlider(sectionId, imageArray) {
  const sliderContainer = document.querySelector(`.${sectionId}-slider`);
  if (!sliderContainer) return;

  sliderContainer.innerHTML = '';
  const shuffledImages = shuffleArray(imageArray);
  
  shuffledImages.forEach((imgSrc, index) => {
    const slide = document.createElement('div');
    slide.className = `${sectionId}-slide`;
    slide.style.backgroundImage = `url(${imgSrc})`;
    
    if (index === 0) {
      slide.classList.add('active');
    }
    
    sliderContainer.appendChild(slide);
  });
  
  startSlider(sectionId, shuffledImages.length);
}

/**
 * スライダーを開始する
 * @param {string} sectionId - セクションID
 * @param {number} slideCount - スライドの総数
 */
function startSlider(sectionId, slideCount) {
  setInterval(() => {
    const slides = document.querySelectorAll(`.${sectionId}-slide`);
    if (!slides.length) return;

    slides[activeSlideIndex[sectionId]].classList.remove('active');
    
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * slideCount);
    } while (nextIndex === activeSlideIndex[sectionId] && slideCount > 1);
    
    activeSlideIndex[sectionId] = nextIndex;
    slides[nextIndex].classList.add('active');
  }, SLIDER_INTERVAL);
}

/**
 * 画像データを動的に取得する
 * @returns {Promise<Object>} セクションごとの画像データ
 */
async function loadImageData() {
  const imageData = {};
  for (const [section, config] of Object.entries(IMAGE_CONFIG)) {
    imageData[section] = config.files.map(file => getImagePath(section, file));
  }
  return imageData;
}

/**
 * スライダーを初期化する
 */
async function initializeSliders() {
  const imageData = await loadImageData();
  for (const [section, images] of Object.entries(imageData)) {
    if (images.length > 0) {
      initSlider(section, images);
    }
  }
}

// モジュールとしてエクスポート
export { initializeSliders };