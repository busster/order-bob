const $ = require('jquery')
import Vue from 'vue'
import store from '@/store/index'
import router from '@/router/index'

const testUtils = {}

testUtils.CtorConstructor = (component, options = {}, mount = true) => {
  const Ctor = Vue.extend(component)

  const defaultOptions = {
    propsData: {},
    store,
    router,
    mixins: [],
  }

  const finalOptions = Object.assign({}, defaultOptions, options)

  const Component = new Ctor(finalOptions)
  if (mount) {
    return Component.$mount()
  }
  return Component
}

testUtils.stubAjaxCall = () => {
  // stub out Ajax call
  sinon.stub($, 'ajax').callsFake((event) => {
    var result = $.Deferred()
    result.args = event
    return result
  })
}
testUtils.unwrapAjaxCall = () => {
  if (typeof $.ajax.restore === 'function') {
    $.ajax.restore()
  }
}

export default testUtils
