// app.js
const { translations, defaultLanguage } = require('./utils/i18n.js')

App({
  onLaunch() {
    // 初始化云开发环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      // 初始化云开发环境
      wx.cloud.init({
        env: 'cloud1-d1gcomdzg5388060b',
        traceUser: true,
      });
    }

    // 初始化语言设置
    this.initLanguage()

    // 登录
    wx.login({
      success: res => {
        // 登录成功处理
        console.log('登录成功:', res.code);
      }
    })
  },

  // 初始化语言设置
  initLanguage() {
    try {
      const settings = wx.getStorageSync('languageSettings') || {}
      
      if (settings.autoDetect && !settings.currentLanguage) {
        // 自动检测系统语言
        const systemInfo = wx.getSystemInfoSync()
        const systemLang = systemInfo.language || systemInfo.system.split(' ')[1] || 'zh-CN'
        
        // 根据系统语言设置
        if (systemLang.startsWith('zh')) {
          this.globalData.currentLanguage = systemLang === 'zh-TW' || systemLang === 'zh-HK' ? 'zh-TW' : 'zh-CN'
        } else if (systemLang.startsWith('en')) {
          this.globalData.currentLanguage = 'en'
        } else if (systemLang.startsWith('ja')) {
          this.globalData.currentLanguage = 'ja'
        } else if (systemLang.startsWith('ko')) {
          this.globalData.currentLanguage = 'ko'
        } else {
          this.globalData.currentLanguage = defaultLanguage
        }
      } else {
        this.globalData.currentLanguage = settings.currentLanguage || defaultLanguage
      }
      
      this.globalData.autoDetect = settings.autoDetect !== undefined ? settings.autoDetect : true
      this.globalData.languageSettings = settings
      
      console.log('语言初始化完成:', this.globalData.currentLanguage)
    } catch (e) {
      console.error('语言初始化失败:', e)
      this.globalData.currentLanguage = defaultLanguage
      this.globalData.autoDetect = true
    }
  },

  // 获取当前语言
  getCurrentLanguage() {
    return this.globalData.currentLanguage || defaultLanguage
  },

  // 获取翻译文本
  t(key) {
    const lang = this.getCurrentLanguage()
    const langData = translations[lang] || translations[defaultLanguage]
    return langData[key] || key
  },

  // 切换语言
  setLanguage(language, callback) {
    if (!translations[language]) {
      console.error('不支持的语言:', language)
      return false
    }
    
    this.globalData.currentLanguage = language
    
    // 更新存储的设置
    let settings = this.globalData.languageSettings || {}
    settings.currentLanguage = language
    this.globalData.languageSettings = settings
    
    try {
      wx.setStorageSync('languageSettings', settings)
    } catch (e) {
      console.error('保存语言设置失败:', e)
    }
    
    // 触发语言变更事件
    this.triggerEvent && this.triggerEvent('languageChange', { language })
    
    // 通知所有页面刷新
    const pages = getCurrentPages()
    pages.forEach(page => {
      if (page.onLanguageChange) {
        page.onLanguageChange(language)
      } else if (page.refreshLanguage) {
        page.refreshLanguage()
      }
    })
    
    console.log('语言已切换至:', language)
    
    if (callback) callback()
    
    return true
  },
  
  // 刷新所有页面
  refreshAllPages() {
    const pages = getCurrentPages()
    pages.forEach(page => {
      if (page.onShow && !page.route.includes('language')) {
        // 重新调用onShow刷新页面
        page.onShow()
      }
    })
  },

  globalData: {
    userInfo: null,
    userName: '文韬武略',
    userLevel: 'Lv.8 博学之士',
    userEmail: 'fuzi@digitalsage.com',
    currentLanguage: defaultLanguage,
    autoDetect: true,
    languageSettings: null,
    studyStats: {
      days: 128,
      books: 24,
      hours: 156,
      achievements: 18
    },
    // 会员信息
    membership: {
      type: 'none', // monthly, quarterly, yearly, none
      expired: true,
      expireDate: null
    },
    // 积分信息
    points: {
      total: 1250,
      history: []
    },
    // 阅读统计
    readingStats: {
      today: 45, // 今日阅读时长（分钟）
      total: 156, // 总阅读时长（小时）
      dailyGoal: 30 // 每日阅读目标（分钟）
    },
    // 已加入的打卡营
    joinedCamps: [
      {
        id: 1,
        name: '经典文学阅读营',
        days: 21,
        remaining: 15,
        completed: 6,
        status: '进行中'
      }
    ],
    // 排行榜数据
    rankings: {
      reading: [
        { id: 1, name: '文韬武略', time: 120, avatar: 'https://picsum.photos/50/50?random=1' },
        { id: 2, name: '学而不厌', time: 90, avatar: 'https://picsum.photos/50/50?random=2' },
        { id: 3, name: '温故知新', time: 85, avatar: 'https://picsum.photos/50/50?random=3' },
        { id: 4, name: '敏而好学', time: 75, avatar: 'https://picsum.photos/50/50?random=4' },
        { id: 5, name: '不耻下问', time: 60, avatar: 'https://picsum.photos/50/50?random=5' },
        { id: 6, name: '你', time: 45, avatar: 'https://picsum.photos/50/50?random=6' }
      ],
      points: [
        { id: 1, name: '文韬武略', points: 5000, avatar: 'https://picsum.photos/50/50?random=7' },
        { id: 2, name: '学而不厌', points: 4200, avatar: 'https://picsum.photos/50/50?random=8' },
        { id: 3, name: '温故知新', points: 3800, avatar: 'https://picsum.photos/50/50?random=9' },
        { id: 4, name: '敏而好学', points: 3500, avatar: 'https://picsum.photos/50/50?random=10' },
        { id: 5, name: '不耻下问', points: 3000, avatar: 'https://picsum.photos/50/50?random=11' },
        { id: 6, name: '你', points: 1250, avatar: 'https://picsum.photos/50/50?random=12' }
      ]
    }
  }
})
