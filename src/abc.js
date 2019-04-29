module.exports = function makeRequest() {
    return fetch('http://httpbin.org/get').then(response => response.json());
};