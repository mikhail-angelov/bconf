

module.exports ={
    get,
    post
}

function get(url, query){
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
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
console.log('-',data, (typeof data == "object")?JSON.stringify(data):data)

    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
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