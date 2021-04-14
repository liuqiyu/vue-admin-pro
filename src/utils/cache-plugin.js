import localforage from 'localforage'

class CachePlugin {
  constructor (name = 'api') {
    this.store = localforage.createInstance({
      name
    })
    this.init()
  }

  init () {
    // 缓存时间 单位秒
    this.cacheAge = 8 * 3600
    this.cacheMaxAge = window.__ERPCacheMaxAge__ || this.cacheAge
    // 根据method判断是否缓存
    this.cacheMethod = [
      'system.genericSearch.listByMenuId',
      'system.genericSearch.get'
    ]
    // 根据请求数据特征判断是否缓存
    // 比如请求数据包含'genericSearchCode', 就能判断是调用通用查询
    this.cacheCharacteristic = [
      'ERPSearchCacheFlag', // 缓存列表数据专用标识
      'ERPGeneralCacheFlag'
    ]
    // 根据method判断是否[清除]缓存
    this.removeCacheMethod = [
      'system.genericSearch.field.saveOrUpdate',
      'system.genericSearch.saveOrUpdate'
    ]
    // 根据请求数据特征判断是否[清除]缓存
    this.removeCacheCharacteristic = [
      'forceCache', // 清除列表数据专用标识
      'generalForceCache'
    ]
    this.filterKeys = [
      ...this.removeCacheCharacteristic,
      'time',
      'ERPSearchPreload'
    ]
    // 个性设置、通用查询配置会持久缓存
    this.initSearchListCache()
  }

  removeAllCache () {
    let id = window.__ERPUSER__ && window.__ERPUSER__.id
    if (id && id !== localStorage.ERPCacheFlag) {
      localStorage.setItem('ERPCacheFlag', id)
      console.info('[cache-plugin] remove all cache')
      this.store.clear()
    }
  }

  async initSearchListCache () {
    this.removeSpecifiedCache('ERPSearchCacheFlag')
  }

  // 遍历所有的key, 找出符合特征的 删除其缓存
  async removeSpecifiedCache (str) {
    if (!str) return
    let keys = await this.store.keys()
    keys.filter(item => this.decodeKey(item).includes(str)).forEach(item => this.store.removeItem(item))
  }

  decodeKey (str) {
    if (!str) return ''
    return window.decodeURIComponent(window.atob(str))
  }

  encodeKey (str) {
    if (!str) return ''
    return window.btoa(window.encodeURIComponent(str))
  }

  isAvailable (str) {
    if (!str) return false
    if (Array.isArray(str) && str.length === 0) return false
    if (JSON.stringify(str) === '{}') return false
    return true
  }

  handleCacheData (cacheData, key) {
    if (!cacheData) return ''
    let now = +new Date()
    let createTime = cacheData.createTime || 0
    let resData = cacheData.resData || ''
    if ((now - createTime) / 1000 > this.cacheMaxAge) {
      console.log('[cache-plugin] 缓存过期')
      this.store.removeItem(key)
      return ''
    } else {
      return resData
    }
  }

  // 清除通用查询配置列的缓存
  async removeSearchListCache (requestParams) {
    let menuId = requestParams.menuId || ''
    let keys = await this.store.keys()
    if (menuId) {
      // 移除包含指定菜单id的列表缓存
      keys.filter(item => this.decodeKey(item).includes(menuId) && this.decodeKey(item).includes('ERPSearchCacheFlag')).forEach(item => this.store.removeItem(item))
    } else {
      // 非标准通用查询接口，请求时没有menuId时，移除所有模块的列表缓存
      keys.filter(item => this.decodeKey(item).includes('ERPSearchCacheFlag')).forEach(item => this.store.removeItem(item))
    }
  }

  // 清除通用查询配置列的缓存
  async removeSearchConfigCache (requestParams) {
    let genericId = requestParams.genericId || ''
    let menuId = requestParams.menuId || ''
    let id = requestParams.id || ''
    if (menuId) {
      let keys = await this.store.keys()
      // 移除包含指定菜单id的配置缓存，防止误删当前模块的列表缓存
      keys.filter(item => this.decodeKey(item).includes(menuId) && !this.decodeKey(item).includes('ERPSearchCacheFlag')).forEach(item => this.store.removeItem(item))
    }
    if (genericId) {
      this.removeSpecifiedCache(genericId)
    }

    if (id) {
      this.removeSpecifiedCache(id)
    }
  }

  async get (method, data) {
    if (!data) return ''
    if (Array.isArray(data)) return ''
    // 移除和当前 menuId 相关的所有列表缓存
    if (data.hasOwnProperty('forceCache')) {
      // console.info('[cache-plugin] 用户主动查询:', method)
      this.removeSearchListCache(data)
      return ''
    }
    // 达不到缓存条件的直接返回
    if (!this.hasCacheCharacteristics(data) && !this.hasCacheMethods(method)) {
      return ''
    }
    let key = this.makeKey(method, data)
    let cacheData = await this.store.getItem(key)
    return this.handleCacheData(cacheData, key)
  }

  save (response) {
    let { config } = response
    if (!config.headers) return
    if (!response.data) return
    if (response.data.code !== 0) return
    if (!this.isAvailable(response.data.data)) return
    let method = config.headers.method
    let requestParams = JSON.parse(config.data || {})

    // 移除和当前 menuId 相关通用查询、个性设置配置
    if (this.hasRemoveCacheMethod(method)) {
      this.removeSearchConfigCache(requestParams)
    }

    // 符合条件就缓存
    if (this.hasCacheMethods(method) || this.hasCacheCharacteristics(requestParams)) {
      let key = this.makeKey(method, requestParams)
      // console.info('[cache-plugin] cache key:', this.decodeKey(key))
      let cacheData = {
        createTime: +new Date(),
        resData: response.data.data
      }
      this.store.setItem(key, cacheData, function (err) {
        if (!err) {
          // console.info('[cache-plugin] 缓存成功', method)
        }
      })
    }
  }

  hasRemoveCacheMethod (method) {
    return this.removeCacheMethod.includes(method)
  }

  hasRemoveCacheCharacteristic (requestParams) {
    if (!requestParams) return false
    return this.removeCacheCharacteristic.some(item => requestParams.hasOwnProperty(item))
  }

  hasCacheMethods (method) {
    return this.cacheMethod.includes(method)
  }

  hasCacheCharacteristics (requestParams) {
    if (!requestParams) return false
    return this.cacheCharacteristic.some(item => requestParams.hasOwnProperty(item))
  }

  makeKey (method, data) {
    // 去掉这行，会保留原始请求 比如仍然包含 forceCache、ERPSearchCacheFlag 等标识
    data = JSON.parse(JSON.stringify(data))
    let key = method + this.formatRequestParams(data)
    return this.encodeKey(key)
  }

  formatRequestParams (requestParams) {
    // 过滤影响缓存命中的随机key
    var data = this.filterForceCacheKey(requestParams)
    return JSON.stringify(data)
  }

  filterForceCacheKey (requestParams) {
    this.filterKeys.forEach(item => {
      if (requestParams.hasOwnProperty(item)) {
        delete requestParams[item]
      }
    })
    return requestParams
  }
}

export default new CachePlugin()
