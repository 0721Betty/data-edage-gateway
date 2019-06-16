// 在页面刷新的时候，获取地址栏中的地址
// 路由地址对应左侧导航栏的name，根据路由进行相应的高亮显示
let navConfig = {
    '/msg1': '1-1',
    '/msg2': '1-2',
    '/ctrl1': '2-1',
    '/ctrl2': '2-2',
    '/ctrl3': '2-3',
    '/tips' : '3'
};
function getActiveNav(href) {
    let key = href.split('#')[1];
    return navConfig[key];
}
export default getActiveNav;