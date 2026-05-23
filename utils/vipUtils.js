/**
 * 云函数调用示例 - VIP相关功能
 * 
 * 使用方法：
 * 1. 先在微信开发者工具中上传并部署云函数
 * 2. 在小程序页面中引入此文件或直接复制代码调用
 */

// ============================================
// 1. 开通VIP（用户支付成功后调用）
// ============================================
function openVip(vipLevel, orderId, paymentMethod) {
  wx.cloud.callFunction({
    name: 'openVip',
    data: {
      nickname: wx.getStorageSync('userInfo').nickname || '用户',
      avatarUrl: wx.getStorageSync('userInfo').avatarUrl || '',
      vipLevel: vipLevel,           // 1-月卡，2-季卡，3-年卡，4-永久
      expireTime: calculateExpireTime(vipLevel),
      orderId: orderId,
      paymentMethod: paymentMethod,
      amount: getVipPrice(vipLevel)
    },
    success: res => {
      console.log('开通VIP成功', res);
      if (res.result.success) {
        // 更新本地存储的VIP状态
        wx.setStorageSync('isVip', true);
        wx.setStorageSync('vipLevel', vipLevel);
        wx.setStorageSync('vipExpireTime', res.result.data.expireTime);
        
        wx.showToast({
          title: 'VIP开通成功！',
          icon: 'success'
        });
      }
    },
    fail: err => {
      console.error('开通VIP失败', err);
      wx.showToast({
        title: '开通失败，请重试',
        icon: 'none'
      });
    }
  });
}

// ============================================
// 2. 查询VIP状态
// ============================================
function queryVipStatus() {
  wx.cloud.callFunction({
    name: 'queryVipStatus',
    success: res => {
      console.log('查询VIP状态', res);
      if (res.result.success) {
        const vipData = res.result.data;
        wx.setStorageSync('isVip', vipData.isVip);
        wx.setStorageSync('vipLevel', vipData.vipLevel);
        wx.setStorageSync('vipExpireTime', vipData.expireTime);
        return vipData;
      }
    },
    fail: err => {
      console.error('查询VIP状态失败', err);
    }
  });
}

// ============================================
// 3. 管理员添加VIP用户
// ============================================
function adminAddVip(targetOpenid, nickname, vipLevel, expireTime, reason) {
  wx.cloud.callFunction({
    name: 'adminAddVip',
    data: {
      targetOpenid: targetOpenid,
      nickname: nickname,
      vipLevel: vipLevel,
      expireTime: expireTime,
      reason: reason,
      adminKey: 'digital_fuzi_admin_2024'  // 生产环境请更改为更安全的方式
    },
    success: res => {
      console.log('管理员添加VIP', res);
      if (res.result.success) {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        });
      } else {
        wx.showToast({
          title: res.result.message,
          icon: 'none'
        });
      }
    },
    fail: err => {
      console.error('添加VIP失败', err);
      wx.showToast({
        title: '添加失败',
        icon: 'none'
      });
    }
  });
}

// ============================================
// 辅助函数
// ============================================

// 计算到期时间（毫秒时间戳）
function calculateExpireTime(vipLevel) {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  
  switch (vipLevel) {
    case 1: // 月卡
      return now + 30 * day;
    case 2: // 季卡
      return now + 90 * day;
    case 3: // 年卡
      return now + 365 * day;
    case 4: // 永久
      return now + 365 * 100 * day; // 假设100年为永久
    default:
      return now + 30 * day;
  }
}

// 获取VIP价格（示例）
function getVipPrice(vipLevel) {
  const prices = {
    1: 30,    // 月卡 30元
    2: 80,    // 季卡 80元
    3: 280,   // 年卡 280元
    4: 980    // 永久 980元
  };
  return prices[vipLevel] || 30;
}

// ============================================
// 在页面中使用示例
// ============================================

/*
// pages/membership/membership.js

const vipUtils = require('../../utils/vipUtils.js');

Page({
  data: {
    isVip: false,
    vipLevel: null,
    expireTime: '',
    privileges: []
  },

  onLoad: function() {
    this.checkVipStatus();
  },

  // 检查VIP状态
  checkVipStatus: function() {
    wx.cloud.callFunction({
      name: 'queryVipStatus',
      success: res => {
        if (res.result.success) {
          this.setData({
            isVip: res.result.data.isVip,
            vipLevel: res.result.data.vipLevel,
            expireTime: this.formatTime(res.result.data.expireTime),
            privileges: res.result.data.privileges
          });
        }
      }
    });
  },

  // 开通VIP（示例：开通月卡）
  onOpenVip: function(e) {
    const vipLevel = e.currentTarget.dataset.level;
    
    // 这里应该调用微信支付，支付成功后再调用openVip
    // 简化示例：直接调用openVip
    wx.cloud.callFunction({
      name: 'openVip',
      data: {
        nickname: '测试用户',
        vipLevel: vipLevel,
        expireTime: calculateExpireTime(vipLevel),
        orderId: 'ORDER_' + Date.now(),
        paymentMethod: 'wechat'
      },
      success: res => {
        if (res.result.success) {
          wx.showToast({ title: '开通成功！', icon: 'success' });
          this.checkVipStatus(); // 刷新状态
        }
      }
    });
  },

  // 格式化时间
  formatTime: function(timestamp) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  }
});
*/

// 导出函数
module.exports = {
  openVip: openVip,
  queryVipStatus: queryVipStatus,
  adminAddVip: adminAddVip,
  calculateExpireTime: calculateExpireTime,
  getVipPrice: getVipPrice
};
