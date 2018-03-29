import $ from 'jquery'

const Menu = (($) => {
  const NAME = 'menu'
  const DATA_KEY = `bs.${NAME}`
  const EVENT_KEY = `.${DATA_KEY}`
  const DATA_API_KEY = '.data-api'
  const Event = {
    LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  }
  const Default = {
    elementItem: '.hamburger-menu, html, #main-menu, #header',
    navItemArrows: '.nav-item-arrows'
  }
  const Selector = {
    DATA_MODULE: `[data-module="${NAME}"]`
  }

  class Menu {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.menuBar = $('.hamburger-menu')
      this.li = $('#main-menu >ul >li')
      this.liLeve2 = $('#main-menu .main-menu-dropdown li')
      this.liAll = $('#main-menu ul li')
      this.dropDowmArrow = $('#main-menu .main-menu-dropdown .nav-item-arrows')
      this.openMainMenu()
      this.clickArowOpenDropdownMenuLeve1()
      this.clickLiOpenDropdownMenuLeve1()
      this.clickArowOpenDropdownMenuLeve2()
      this.clickLiOpenDropdownMenuLeve2()
    }
    // public api
    static get Default () {
      return Default
    }

    openMainMenu () {
      this.menuBar.click((e) => {
        const ele = e.currentTarget
        if ($(ele).hasClass('is-open-menu')) {
          $(this._config.elementItem).removeClass('is-open-menu')
        } else {
          $(this._config.elementItem).addClass('is-open-menu')
        }
      })
    }

    clickArowOpenDropdownMenuLeve1 () {
      this.li.find('> .nav-item-arrows').click((e) => {
        const ele = e.currentTarget
        const eleParent = $(ele).parent()
        if (eleParent.find('ul').length && !eleParent.hasClass('is-open-child')) {
          this.liAll.removeClass('is-open-child')
          eleParent.addClass('is-open-child')
        } else {
          eleParent.removeClass('is-open-child')
        }
      })
    }

    clickLiOpenDropdownMenuLeve1 () {
      this.li.find('>a').click((e) => {
        const ele = e.currentTarget
        const eleParent = $(ele).parent()
        if ($(window).width() < 992) {
          if (eleParent.find('ul').length && !eleParent.hasClass('is-open-child')) {
            this.li.removeClass('is-open-child')
            eleParent.addClass('is-open-child')
            return false
          }
        }
      })
    }

    clickArowOpenDropdownMenuLeve2 () {
      this.dropDowmArrow.click((e) => {
        const ele = e.currentTarget
        const eleParent = $(ele).parent()
        if ($(window).width() < 992) {
          if (eleParent.find('.menu-child').length && !eleParent.hasClass('is-open-menu-child')) {
            eleParent.addClass('is-open-menu-child')
          } else {
            eleParent.addClass('is-open-menu-child')
            eleParent.removeClass('is-open-menu-child')
          }
        }
      })
    }

    clickLiOpenDropdownMenuLeve2 () {
      this.liLeve2.find('>a').click((e) => {
        const ele = e.currentTarget
        const eleParent = $(ele).parent()
        if ($(window).width() < 992) {
          if (eleParent.find('ul').length && !eleParent.hasClass('is-open-menu-child')) {
            this.li.removeClass('is-open-menu-child')
            eleParent.addClass('is-open-menu-child')
            return false
          }
        }
      })
    }

    _getConfig (config) {
      config = $.extend({}, Default, config)
      return config
    }
    static _jQueryInterface (config) {
      return this.each(function () {
        const $element = $(this)
        const _config = $.extend(
          {},
          Default,
          $element.data(),
          typeof config === 'object' && config
        )
        let data = $element.data(DATA_KEY)
        if (!data) {
          data = new Menu(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    Menu._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = Menu._jQueryInterface
  $.fn[NAME].Constructor = Menu

  return Menu
})($)

export default Menu
