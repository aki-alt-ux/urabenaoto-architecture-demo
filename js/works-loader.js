// 定数定義
const IMAGE_BASE_PATH = window.location.hostname === 'github.io'
  ? 'https://continuetouse.github.io/urabenaoto-architecture-demo/images/works'
  : './images/works';

// 作品データ
const WORKS_DATA = {
  residential: {
    title: '住宅インナー',
    description: '住宅設計の実績',
    images: ['residential/0028.jpg']
  },
  commercial: {
    title: '商業施設インナー',
    description: '商業施設の設計実績',
    images: ['commercial/0026.jpg']
  },
  office: {
    title: 'オフィスインナー',
    description: 'オフィス設計の実績',
    images: ['office/0002.jpg']
  },
  public: {
    title: '公共施設インナー',
    description: '公共施設の設計実績',
    images: ['public/0001.jpg']
  },
  renovation: {
    title: 'リノベーションインナー',
    description: 'リノベーションの実績',
    images: ['renovation/0029.jpg']
  },
  interior: {
    title: 'インテリアインナー',
    description: 'インテリア設計の実績',
    images: ['interior/0007.jpg']
  }
};

/**
 * 画像のパスを取得する
 * @param {string} imagePath - 画像の相対パス（カテゴリーフォルダを含む）
 * @returns {string} 画像の完全なパス
 */
function getImagePath(imagePath) {
  return `${IMAGE_BASE_PATH}/${imagePath}`;
}

/**
 * 作品アイテムを作成する
 * @param {string} imagePath - 画像のパス
 * @param {string} title - 作品のタイトル
 * @param {string} description - 作品の説明
 * @returns {HTMLElement} 作品アイテムの要素
 */
function createWorkItem(imagePath, title, description) {
  const workItem = document.createElement('div');
  workItem.className = 'work-item';
  
  const img = document.createElement('img');
  img.src = imagePath;
  img.alt = title;
  img.onerror = function() {
    console.error(`Error loading image: ${this.src}`);
    this.style.display = 'none';
  };
  
  const overlay = document.createElement('div');
  overlay.className = 'work-overlay';
  
  const titleElement = document.createElement('h3');
  titleElement.className = 'work-title';
  titleElement.textContent = title;
  
  const descriptionElement = document.createElement('p');
  descriptionElement.className = 'work-description';
  descriptionElement.textContent = description;
  
  overlay.appendChild(titleElement);
  overlay.appendChild(descriptionElement);
  workItem.appendChild(img);
  workItem.appendChild(overlay);
  
  return workItem;
}

/**
 * 作品セクションを初期化する
 */
async function initializeWorks() {
  try {
    for (const [category, data] of Object.entries(WORKS_DATA)) {
      const container = document.getElementById(`${category}-works`);
      if (!container) continue;
      
      container.innerHTML = '';
      
      data.images.forEach(image => {
        const workItem = createWorkItem(
          getImagePath(image),
          data.title,
          data.description
        );
        container.appendChild(workItem);
      });
    }
  } catch (error) {
    console.error('Error initializing works:', error);
  }
}

// モジュールとしてエクスポート
export { initializeWorks }; 