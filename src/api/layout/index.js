import Home from '../../views/layout/Home.vue'

// 字符串首字母大写
export const firstUpperCase = (string) => string.charAt(0).toUpperCase() + string.slice(1)

// 动态添加路由
export const addDynamicMenuRoutes = (menuData) => {
  var routes = []
  for (var i = 0; i < menuData.length; i++) {
    if (menuData[i].children && menuData[i].children.length >= 1) {
      const subPath = menuData[i].children[0].url.split('/')
      const childrens = []
      for (var j = 0; j < menuData[i].children.length; j++) {
        const subPath = menuData[i].children[j].url.split('/')
        var children = {
          path: subPath[2],
          component: () => import('../../views/' + subPath[2] + '/' + firstUpperCase(subPath[2]) + '.vue'),
          meta: {
            title: menuData[i].children[j].label,
            icon: menuData[i].children[j].icon
          }
        }
        childrens.push(children)
      }
      var route = {
        path: '/' + subPath[1],
        component: Home,
        children: childrens
      }
      routes.push(route)
    }
  }
  return routes
}
