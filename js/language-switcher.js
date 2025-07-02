// 多言語コンテンツの定義
const translations = {
  ja: {
    nav: {
      philosophy: '建築哲学',
      profile: 'プロフィール',
      works: '作品',
      contact: 'お問い合わせ'
    },
    hero: {
      title: '占部直人建築設計事務所',
      subtitle: '空間と光と影を通じて、生活に新たな価値を創造する建築設計',
      button: 'もっと見る'
    },
    philosophy: {
      title: '建築哲学',
      content: [
        '占部直人建築設計事務所は、単なる建築物ではなく、人々の生活に溶け込み、時間とともに成熟していく空間づくりを目指しています。私たちは、光と影の対話、素材の質感、そして空間が醸し出す静謐さを大切にしています。',
        '建築とは、クライアントの夢や希望を形にするだけでなく、環境との調和や持続可能性を追求する芸術でもあります。私たちは常に新しい可能性を探求しながらも、日本の伝統的な美意識や技術を尊重し、現代の生活様式に適応した独自の建築言語を創造しています。',
        'それぞれのプロジェクトを通じて、私たちは空間が持つ可能性を最大限に引き出し、使う人々に豊かな体験を提供することを目指しています。'
      ]
    },
    profile: {
      title: 'プロフィール',
      name: '占部 直人 / Naoto Urabe',
      role: '建築家 / Architect',
      bio: '1985年 東京生まれ。東京大学工学部建築学科卒業後、ヨーロッパの建築事務所での実務経験を経て、2015年に占部直人建築設計事務所を設立。住宅、オフィス、商業施設など、幅広い建築設計を手がける。',
      awards: '日本建築学会賞、グッドデザイン賞など国内外での受賞歴多数。自然光を活かした空間構成と、素材の質感を大切にした設計アプローチに定評がある。'
    },
    works: {
      title: '作品',
      residential: '住宅Top',
      commercial: '商業施設Top',
      office: 'オフィスTop',
      public: '公共施設Top',
      renovation: 'リノベーションTop',
      interior: 'インテリアTop'
    },
    contact: {
      title: 'お問い合わせ',
      name: 'お名前',
      email: 'メールアドレス',
      subject: '件名',
      message: 'メッセージ',
      submit: '送信',
      name_error: 'お名前を入力してください',
      email_error: '有効なメールアドレスを入力してください',
      message_error: 'メッセージを入力してください'
    },
    footer: {
      copyright: '© 2025 占部直人建築設計事務所 All Rights Reserved.'
    }
  },
  en: {
    nav: {
      philosophy: 'Philosophy',
      profile: 'Profile',
      works: 'Works',
      contact: 'Contact'
    },
    hero: {
      title: 'Naoto Urabe Architecture',
      subtitle: 'Creating new value in life through space, light, and shadow',
      button: 'Discover More'
    },
    philosophy: {
      title: 'Architectural Philosophy',
      content: [
        'Naoto Urabe Architecture aims to create spaces that blend into people\'s lives and mature over time, rather than just buildings. We value the dialogue between light and shadow, the texture of materials, and the tranquility that space creates.',
        'Architecture is not only about shaping clients\' dreams and hopes but also about pursuing harmony with the environment and sustainability as an art form. While constantly exploring new possibilities, we respect traditional Japanese aesthetics and techniques, creating our own architectural language adapted to modern lifestyles.',
        'Through each project, we aim to maximize the potential of space and provide rich experiences for its users.'
      ]
    },
    profile: {
      title: 'Profile',
      name: 'Naoto Urabe',
      role: 'Architect',
      bio: 'Born in Tokyo in 1985. After graduating from the University of Tokyo\'s Department of Architecture, he gained practical experience at architectural firms in Europe before establishing Naoto Urabe Architecture in 2015. He handles a wide range of architectural designs including residences, offices, and commercial facilities.',
      awards: 'Recipient of numerous awards including the Architectural Institute of Japan Award and Good Design Award. Known for his design approach that emphasizes spatial composition utilizing natural light and the quality of materials.'
    },
    works: {
      title: 'Works',
      residential: 'Residential',
      commercial: 'Commercial',
      office: 'Office',
      public: 'Public',
      renovation: 'Renovation',
      interior: 'Interior'
    },
    contact: {
      title: 'Contact',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      submit: 'Submit',
      name_error: 'Please enter your name',
      email_error: 'Please enter a valid email address',
      message_error: 'Please enter your message'
    },
    footer: {
      copyright: '© 2025 Naoto Urabe Architecture All Rights Reserved.'
    }
  }
};

// 言語切り替え関数
function switchLanguage(lang) {
  document.documentElement.lang = lang;
  const t = translations[lang];
  
  // ナビゲーション
  document.querySelectorAll('.nav-links a').forEach((link, index) => {
    const keys = ['philosophy', 'profile', 'works', 'contact'];
    link.textContent = t.nav[keys[index]];
  });
  
  // ヒーローセクション
  const hero = document.querySelector('.hero-content');
  hero.querySelector('h1').textContent = t.hero.title;
  hero.querySelector('p').textContent = t.hero.subtitle;
  hero.querySelector('.btn').textContent = t.hero.button;
  
  // 哲学セクション
  const philosophy = document.querySelector('.philosophy-content');
  philosophy.querySelector('h2').textContent = t.philosophy.title;
  philosophy.querySelectorAll('p').forEach((p, index) => {
    p.textContent = t.philosophy.content[index];
  });
  
  // プロフィールセクション
  const profile = document.querySelector('.profile-content');
  profile.querySelector('h2').textContent = t.profile.title;
  profile.querySelector('h3').textContent = t.profile.name;
  profile.querySelectorAll('p')[0].textContent = t.profile.role;
  profile.querySelectorAll('p')[1].textContent = t.profile.bio;
  profile.querySelectorAll('p')[2].textContent = t.profile.awards;
  
  // 作品セクション
  const works = document.querySelector('.works-content');
  works.querySelector('h2').textContent = t.works.title;
  document.querySelectorAll('.works-corner h3').forEach((h3, index) => {
    const keys = ['residential', 'commercial', 'office', 'public', 'renovation', 'interior'];
    h3.textContent = t.works[keys[index]];
  });
  
  // お問い合わせセクション
  const contact = document.querySelector('.contact-content');
  contact.querySelector('h2').textContent = t.contact.title;
  const form = contact.querySelector('.contact-form');
  form.querySelectorAll('input, textarea').forEach(input => {
    const placeholder = input.getAttribute('data-placeholder');
    if (placeholder) {
      input.placeholder = t.contact[placeholder.split('.')[1]];
    }
  });
  form.querySelector('.submit-btn').textContent = t.contact.submit;
  
  // エラーメッセージ
  form.querySelectorAll('.error-message').forEach(msg => {
    const errorType = msg.getAttribute('data-translate').split('.')[1];
    msg.textContent = t.contact[errorType];
  });
  
  // フッター
  document.querySelector('.footer-logo').textContent = t.hero.title;
  document.querySelector('.copyright').textContent = t.footer.copyright;
}

// ページ読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
  // 言語切り替え機能の初期化
  const languageDropdown = document.querySelector('.language-dropdown');
  const languageButton = document.querySelector('.language-button');
  const languageOptions = document.querySelectorAll('.language-option');
  
  // ドロップダウンの表示/非表示を切り替える
  languageButton.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.classList.toggle('active');
  });
  
  // ドキュメント全体のクリックでドロップダウンを閉じる
  document.addEventListener('click', () => {
    languageDropdown.classList.remove('active');
  });
  
  // ドロップダウン内のクリックで閉じないようにする
  languageDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  // 言語オプションのクリックイベント
  languageOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // アクティブな言語を更新
      languageOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      
      // 言語を切り替え
      const lang = option.getAttribute('data-lang');
      switchLanguage(lang);
      
      // ドロップダウンを閉じる
      languageDropdown.classList.remove('active');
    });
  });
  
  // 初期言語を設定
  const currentLang = localStorage.getItem('language') || 'ja';
  document.querySelector(`.language-option[data-lang="${currentLang}"]`).classList.add('active');
  switchLanguage(currentLang);
}); 