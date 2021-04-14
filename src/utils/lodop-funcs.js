/**
 * @fileoverview 电子运单打印
 * @see {@link http://www.lodop.net/demolist/LodopFuncs.js}
 */

let CreatedOKLodop7766 = null

let Download = {
  win32: 'static/install_lodop32.zip',
  win64: 'static/install_lodop64.zip',
  cLodop: 'static/CLodop_Setup_for_Win32NT.zip' // 云打印服务
}

/**
 * 判断是否需要安装CLodop云打印服务器
 */
function needCLodop () {
  try {
    let ua = navigator.userAgent
    let verTrident = ua.match(/Trident\D?\d+/i)
    let verIE = ua.match(/MSIE\D?\d+/i)
    let verOPR = ua.match(/OPR\D?\d+/i)
    let verFF = ua.match(/Firefox\D?\d+/i)
    let x64 = ua.match(/x64/i)
    if ((!verTrident) && (!verIE) && (x64)) {
      return true
    } else if (verFF) {
      verFF = verFF[0].match(/\d+/)
      if ((verFF[0] >= 41) || (x64)) {
        return true
      }
    } else if (verOPR) {
      verOPR = verOPR[0].match(/\d+/)
      if (verOPR[0] >= 32) {
        return true
      }
    } else if ((!verTrident) && (!verIE)) {
      let verChrome = ua.match(/Chrome\D?\d+/i)
      if (verChrome) {
        verChrome = verChrome[0].match(/\d+/)
        if (verChrome[0] >= 41) {
          return true
        }
      }
    }
    return false
  } catch (err) {
    return true
  }
}

/**
 * ====页面引用CLodop云打印必须的JS文件：====
 * 类似起了一个服务
 */
function init () {
  if (!navigator.userAgent.match(/Mac OS/i) && needCLodop()) {
    let head = document.head
    let oscript = document.createElement('script')
    oscript.type = 'text/javascript'
    oscript.async = true
    oscript.src = 'http://localhost:8000/CLodopfuncs.js?priority=1'
    head.appendChild(oscript)

    // 引用双端口(8000和18000）避免其中某个被占用：
    oscript = document.createElement('script')
    oscript.type = 'text/javascript'
    oscript.async = true
    oscript.src = 'http://localhost:18000/CLodopfuncs.js?priority=0'
    head.appendChild(oscript)
  }
}

init()

function showTip (html) {
  let container = document.createElement('div')

  container.setAttribute('style', 'position:absolute;width:600px;height:50px;z-index:10000;line-height:50px;left:50%;top:50%;margin-left:-301px;top:30px;border:1px solid #DFDFDF;background:#FFF;font-size:14px;text-align:center;color:#FD9393')
  container.innerHTML = html

  document.body.appendChild(container)
  setTimeout(function () {
    container.parentNode.removeChild(container)
  }, 8000)
}

/**
 * 获取LODOP对象的主过程
 */
function getLodop (oOBJECT, oEMBED) {
  let strHtmInstall = "打印控件未安装!点击这里<a style='color:#F00' href='" + Download.win32 + "' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。"
  let strHtmUpdate = "打印控件需要升级!点击这里<a style='color:#F00' href='" + Download.win32 + "' target='_self'>执行升级</a>,升级后请重新进入。"
  let strHtm64_Install = "打印控件未安装!点击这里<a style='color:#F00' href='" + Download.win64 + "' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。"
  let strHtm64_Update = "打印控件需要升级!点击这里<a style='color:#F00' href='" + Download.win64 + "' target='_self'>执行升级</a>,升级后请重新进入。"
  let strHtmFireFox = '（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）'
  let strHtmChrome = '（如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）'
  let strCLodopInstall = "CLodop云打印服务(localhost本地)未安装启动!点击这里<a style='color:#F00' href='" + Download.cLodop + "' target='_self'>执行安装</a>,安装后请刷新页面。"
  let strCLodopUpdate = "CLodop云打印服务需升级!点击这里<a style='color:#F00' href='" + Download.cLodop + "' target='_self'>执行升级</a>,升级后请刷新页面。"
  let LODOP
  try {
    let ua = navigator.userAgent
    let isIE = !!(ua.match(/MSIE/i)) || !!(ua.match(/Trident/i))
    let is64IE = isIE && !!(ua.match(/x64/i))

    if (needCLodop()) {
      try {
        LODOP = window.getCLodop()
      } catch (err) {
      }
      if (!LODOP && document.readyState !== 'complete') {
        showTip('C-Lodop没准备好，请稍后再试！')
        return
      }
      if (!LODOP) {
        showTip(strCLodopInstall)
        return
      } else {
        if (window.CLODOP.CVERSION < '3.0.4.8') {
          showTip(strCLodopUpdate)
        }
        if (oEMBED && oEMBED.parentNode) {
          oEMBED.parentNode.removeChild(oEMBED)
        }
        if (oOBJECT && oOBJECT.parentNode) {
          oOBJECT.parentNode.removeChild(oOBJECT)
        }
      }
    } else {
      // =====如果页面有Lodop就直接使用，没有则新建:==========
      if (oOBJECT || oEMBED) {
        LODOP = isIE ? oOBJECT : oEMBED
      } else if (!CreatedOKLodop7766) {
        LODOP = document.createElement('object')
        LODOP.setAttribute('width', 0)
        LODOP.setAttribute('height', 0)
        LODOP.setAttribute('style', 'position:absolute;left:0px;top:-100px;width:0px;height:0px;')
        if (isIE) {
          LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA')
        } else {
          LODOP.setAttribute('type', 'application/x-print-lodop')
        }
        document.documentElement.appendChild(LODOP)
        CreatedOKLodop7766 = LODOP
      } else {
        LODOP = CreatedOKLodop7766
      }
      // =====Lodop插件未安装时提示下载地址:==========
      if ((!LODOP) || (!LODOP.VERSION)) {
        if (ua.indexOf('Chrome') >= 0) {
          showTip(strHtmChrome)
        }
        if (ua.indexOf('Firefox') >= 0) {
          showTip(strHtmFireFox)
        }
        showTip(is64IE ? strHtm64_Install : strHtmInstall)
        return LODOP
      }
    }
    if (LODOP.VERSION < '6.2.2.3') {
      if (!needCLodop()) {
        showTip(is64IE ? strHtm64_Update : strHtmUpdate)
      }
      return LODOP
    }
    console.log('LODOP SET_LICENSES before')
    // ===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
    LODOP.SET_LICENSES('', '8D4622D58AC3D6F0FC02BB974AFF384B', 'C94CEE276DB2187AE6B65D56B3FC2848', '')
    // ===========================================================
    console.log('LODOP SET_LICENSES after')
    return LODOP
  } catch (err) {
    showTip('getLodop出错:' + err)
  }
}

export default getLodop
