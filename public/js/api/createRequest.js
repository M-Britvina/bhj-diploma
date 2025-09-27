/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const method = options.method;    
    const data = options.data;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    let url = options.url;
    let formData = new FormData();

    if (method === 'GET') {
        let params = '';
        for (const key in data) {
            params += key + '=' + data[key] + '&';
        }
        if (params.length > 0) {
            url += '?' + params.slice(0, -1);
        }
    } else {
        for (const key in data) {
            formData.append(key, data[key]);
        }
    }
    
    try {
        xhr.open(method, url);
        xhr.onload = () => {
            options.callback(xhr.response.error, xhr.response);
        };
        xhr.send(method === 'GET' ? null : formData);
    } catch (exception) {
        callback(exception);
    }
};
