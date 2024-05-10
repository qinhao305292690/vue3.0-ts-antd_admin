import { defineComponent, reactive, watch, toRefs } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
const LayouteMenu = defineComponent({
  name: 'LayouteMenu',
  setup() {
    const route = useRoute()
    const findParentRoutePath = (data, parentPath) => {
      let rt = ''
      for (const _item of data) {
        if (_item.path === route.path) {
          rt = parentPath || _item.path
        } else if (_item.children) {
          rt = findParentRoutePath(_item.children, _item.path)
        }
      }
      return rt
    }
    const currentOpenPath = findParentRoutePath(route.matched[0].children)
    const menuConfig = reactive({
      selectedKeys: [route.path],
      openKeys: [currentOpenPath]
    })
    const renderMenuItem = data => {
      return data.map(item => {
        return (
          item.children ?
            <a-sub-menu title={item.meta.moduleName} key={item.path}>{renderMenuItem(item.children)}</a-sub-menu> :
            <a-menu-item key={item.path}>
              <RouterLink to={item.path}>
                {item.meta.moduleName}
              </RouterLink>
            </a-menu-item>
        )
      })
    }
    watch(route, route => {
      menuConfig.selectedKeys = [route.path]
      menuConfig.openKeys = [findParentRoutePath(route.matched[0].children)]
    })
    return {
      route,
      ...toRefs(menuConfig),
      renderMenuItem
    }
  },
  render() {
    const { route, renderMenuItem } = this
    return (
      <>
        <a-menu v-model:openKeys={this.openKeys} v-model:selectedKeys={this.selectedKeys} mode='inline' theme="dark">
          {renderMenuItem(route.matched[0].children)}
        </a-menu>
      </>
    )
  }

})

export default LayouteMenu
