export function get(url, query){
    return request(url, 'get')
}

export function post(url, data){
    return request(url, 'post', data)
}

export function pul(url, data){
    return request(url, 'put', data)
}

export function remove(url){
    return request(url, 'delete')
}

function request(url, method, data){
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
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
        if(data){
            const buffer = (typeof data == "object")?JSON.stringify(data):data;
            xhr.send(buffer);
        }else{
            xhr.send();
        }
    });
}

function parsToJson(str){
    try{
        return JSON.parse(str);
    }catch(e){
        console.log('json parce error', e)
        return str;
    }
}
function addAuthHeader(xhr){
    const token = localStorage.getItem('token');
    xhr.setRequestHeader('x-access-token', token);
}