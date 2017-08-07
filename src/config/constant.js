let basicUrl = '192.168.1.188';
let basicPort = "8018";

export let aaa1url='/ss/fsf/ww.htm';
export let aaa2url='/ss/fsf/ww.htm';
export let aaa3url='/ss/fsf/ww.htm';
export let aaa4url='/ss/fsf/ww.htm';
export let aaa1url='/ss/fsf/ww.htm';
export function getURL(url) {
    return 'http://' + basicUrl + ((basicPort === null || basicPort === '') ? '' : (':' + basicPort)) + url;
}

export function getPostParams(obj) {
    let param = 'tttid=1';
    for (let key in obj) {
        param = param + '&' + key + '=' + obj[key];
    }
    return param;
}

export function getFormData(obj) {
    let formData = new FormData();
    for (let key in obj) {
        formData.append(key, obj[key]);
    }
    return formData;
}