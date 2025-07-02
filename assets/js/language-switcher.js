// 言語切り替え機能
const LanguageSwitcher = {
  currentLanguage: 'ja',
  translations: {
    ja: {
      'hero.title': '占部直人建築設計事務所',
      'hero.subtitle': '空間と光と影を通じて、生活に新たな価値を創造する建築設計',
      'hero.button': '詳しく見る',
      'nav.philosophy': '建築哲学',
      'nav.profile': 'プロフィール',
      'nav.works': '作品',
      'nav.contact': 'お問い合わせ',
      'philosophy.title': '建築哲学',
      'philosophy.content': '占部直人建築設計事務所は、単なる建築物ではなく、人々の生活に溶け込み、時間とともに成熟していく空間づくりを目指しています。',
      'profile.title': 'プロフィール',
      'profile.name': '占部 直人 / Naoto Urabe',
      'profile.role': '建築家 / Architect',
      'profile.bio': '1985年 東京生まれ。東京大学工学部建築学科卒業後、ヨーロッパの建築事務所での実務経験を経て、2015年に占部直人建築設計事務所を設立。',
      'works.title': '作品',
      'works.residential': '住宅',
      'works.commercial': '商業施設',
      'works.office': 'オフィス',
      'works.public': '公共施設',
      'works.renovation': 'リノベーション',
      'works.interior': 'インテリア',
      'contact.title': 'お問い合わせ',
      'contact.name': 'お名前',
      'contact.email': 'メールアドレス',
      'contact.subject': '件名',
      'contact.message': 'メッセージ',
      'contact.submit': '送信',
      'contact.name_error': 'お名前を入力してください',
      'contact.email_error': '有効なメールアドレスを入力してください',
      'contact.message_error': 'メッセージを入力してください',
      'footer.copyright': '© 2025 占部直人建築設計事務所 All Rights Reserved.'
    },
    en: {
      'hero.title': 'Naoto Urabe Architecture',
      'hero.subtitle': 'Creating new value in life through space, light, and shadow',
      'hero.button': 'Discover More',
      'nav.philosophy': 'Philosophy',
      'nav.profile': 'Profile',
      'nav.works': 'Works',
      'nav.contact': 'Contact',
      'philosophy.title': 'Architectural Philosophy',
      'philosophy.content': 'Naoto Urabe Architecture aims to create spaces that blend into people\'s lives and mature over time, rather than just buildings.',
      'profile.title': 'Profile',
      'profile.name': 'Naoto Urabe',
      'profile.role': 'Architect',
      'profile.bio': 'Born in Tokyo in 1985. After graduating from the University of Tokyo, Faculty of Engineering, Department of Architecture, he gained practical experience at architectural firms in Europe before establishing Naoto Urabe Architecture in 2015.',
      'works.title': 'Works',
      'works.residential': 'Residential',
      'works.commercial': 'Commercial',
      'works.office': 'Office',
      'works.public': 'Public',
      'works.renovation': 'Renovation',
      'works.interior': 'Interior',
      'contact.title': 'Contact',
      'contact.name': 'Name',
      'contact.email': 'Email',
      'contact.subject': 'Subject',
      'contact.message': 'Message',
      'contact.submit': 'Submit',
      'contact.name_error': 'Please enter your name',
      'contact.email_error': 'Please enter a valid email address',
      'contact.message_error': 'Please enter your message',
      'footer.copyright': '© 2025 Naoto Urabe Architecture All Rights Reserved.'
    }
  },

  init() {
    this.setupLanguageSwitcher();
    this.updateContent();
  },

  setupLanguageSwitcher() {
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = option.dataset.lang;
        this.switchLanguage(lang);
      });
    });
  },

  switchLanguage(lang) {
    this.currentLanguage = lang;
    this.updateContent();
    this.updateActiveLanguageOption();
  },

  updateContent() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
      const key = element.dataset.translate;
      if (this.translations[this.currentLanguage][key]) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = this.translations[this.currentLanguage][key];
        } else {
          element.textContent = this.translations[this.currentLanguage][key];
        }
      }
    });
  },

  updateActiveLanguageOption() {
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
      if (option.dataset.lang === this.currentLanguage) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  LanguageSwitcher.init();
}); 