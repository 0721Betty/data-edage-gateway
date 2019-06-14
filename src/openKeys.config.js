let openConfig = {
    '/msg1': '1',
    '/msg2': '1',
    '/ctrl1': '2',
    '/ctrl2': '2',
    '/ctrl3': '2',
    '/ctrl4': '2',
    '/ctrl5': '2',
}
function getOpenKeys(href){
    let key = href.split('#')[1];
    // console.log(key);
    // console.log(openConfig[key]);
    return openConfig[key];
}
export default getOpenKeys