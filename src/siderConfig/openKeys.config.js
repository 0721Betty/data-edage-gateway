// 左边导航栏一级菜单打开项的配置文件
// 根据路由开启相应的一级菜单的下拉
let openConfig = {
    '/msg1': '1',
    '/msg2': '1',
    '/ctrl1': '2',
    '/ctrl2': '2',
    '/ctrl3': '2',
    '/tips' : '3'
}
function getOpenKeys(href){
    let key = href.split('#')[1];
    return openConfig[key];
}
export default getOpenKeys