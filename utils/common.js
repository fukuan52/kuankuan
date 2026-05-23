// 公共工具函数

/**
 * 获取当前时间 HH:mm 格式
 * @returns {string} 当前时间
 */
function getCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

/**
 * 从本地存储加载数据
 * @param {string} key 存储键名
 * @param {any} defaultValue 默认值
 * @returns {any} 存储的数据
 */
function loadFromStorage(key, defaultValue = null) {
  try {
    return wx.getStorageSync(key) || defaultValue
  } catch (e) {
    return defaultValue
  }
}

/**
 * 保存数据到本地存储
 * @param {string} key 存储键名
 * @param {any} data 要保存的数据
 */
function saveToStorage(key, data) {
  try {
    wx.setStorageSync(key, data)
  } catch (e) {
    // 存储失败处理
  }
}

/**
 * 显示成功提示
 * @param {string} title 提示文字
 * @param {function} callback 回调函数
 */
function showSuccess(title, callback) {
  wx.showToast({
    title: title,
    icon: 'success',
    success: callback
  })
}

/**
 * 显示普通提示
 * @param {string} title 提示文字
 */
function showToast(title) {
  wx.showToast({
    title: title,
    icon: 'none'
  })
}

module.exports = {
  getCurrentTime,
  loadFromStorage,
  saveToStorage,
  showSuccess,
  showToast
}
