

module.exports ={
    get,
    post
}

function get(url, query){
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        addAuthHeader(xhr);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(parsToJson(xhr.response));
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

function post(url, data){
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', url);
        addAuthHeader(xhr);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(parsToJson(xhr.response));
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        const buffer = (typeof data == "object")?JSON.stringify(data):data;
        xhr.send(buffer);
    });
}

function parsToJson(str){
    try{
        return JSON.parse(str);
    }catch(e){
        console.log('json parce error', e)
        return str;
    }
function addAuthHeader(xhr){
    const token = localStorage.get('token');
    xhr.setRequestHeader('x-access-token', token);
}}