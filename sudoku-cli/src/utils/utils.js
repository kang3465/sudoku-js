import {getRequest} from './api'
import {Message} from 'element-ui'

export const isNotNullORBlank = (...args) => {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i];
    if (argument == null || argument == '' || argument == undefined) {
      Message.warning({message: '数据不能为空!'})
      return false;
    }
  }
  return true;
}
export const initAdminMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return;
  }
  getRequest("/config/sysmenu").then(resp => {
    if (resp && resp.status == 200) {
      var fmtRoutes = formatRoutes(resp.data);
      router.addRoutes(fmtRoutes);
      store.commit('initMenu', fmtRoutes);
      store.dispatch('connect');
    }
  })
}
export const initForeMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return;
  }
  getRequest("/config/foremenu").then(resp => {
    if (resp && resp.status == 200) {
      var fmtRoutes = formatRoutes(resp.data);
      router.addRoutes(fmtRoutes);
      store.commit('initMenu', fmtRoutes);
      store.dispatch('connect');
    }
  })
}
export const formatRoutes = (routes) => {
  let fmRoutes = [];
  routes.forEach(router => {
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      component(resolve) {
        if (component.startsWith("admin")) {
          var arr=component.split("/");
          if (component.startsWith("admin/Home")) {
            require(['../components/'+arr[0] +'/'+ arr[1] + '.vue'], resolve)
          } else if (component.startsWith("admin/Emp")) {
            require(['../components/'+arr[0] + '/emp/' + arr[1] + '.vue'], resolve)
          } else if (component.startsWith("admin/Per")) {
            require(['../components/'+arr[0] + '/personnel/' + arr[1] + '.vue'], resolve)
          } else if (component.startsWith("admin/Sal")) {
            require(['../components/'+arr[0] + '/salary/' + arr[1] + '.vue'], resolve)
          } else if (component.startsWith("admin/Sta")) {
            require(['../components/'+arr[0] + '/statistics/' + arr[1] + '.vue'], resolve)
          } else if (component.startsWith("admin/Sys")) {
            require(['../components/'+arr[0] + '/system/' + arr[1] + '.vue'], resolve)
          } else if (component.startsWith("admin/Material")) {
            require(['../components/'+arr[0] + '/material/' + arr[1] + '.vue'], resolve)
          }
        }else if (component.startsWith("fore")) {

          var arr=component.split("/");
          if (component.startsWith("fore/Home")) {
            require(['../components/'+arr[0] +'/'+ arr[1] + '.vue'], resolve)
          } else if (component.startsWith("fore/Emp")) {
            require(['../components/'+arr[0] + '/emp/' + arr[1] + '.vue'], resolve)
          } else if (component.startsWith("fore/Per")) {
            require(['../components/'+arr[0] + '/personnel/' + arr[1] + '.vue'], resolve)
          } else if (component.startsWith("fore/Sal")) {
            require(['../components/'+arr[0] + '/salary/' + arr[1] + '.vue'], resolve)
          } else if (component.startsWith("fore/Sta")) {
            require(['../components/'+arr[0] + '/statistics/' + arr[1] + '.vue'], resolve)
          } else if (component.startsWith("fore/Sys")) {
            require(['../components/'+arr[0] + '/system/' + arr[1] + '.vue'], resolve)
          } else if (component.startsWith("fore/Material")) {
            require(['../components/'+arr[0] + '/material/' + arr[1] + '.vue'], resolve)
          }
        }
      },
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}
