function setItem(key, maxAge, value) {
    var data = JSON.stringify({
        expire: Date.now() + maxAge,
        value: value
    });

    localStorage.setItem(key, data);
}

function getItem(key, maxAge, value) {
    var data = JSON.parse(localStorage.getItem('key'));

    if(data.expire > Date.now()) {
        return data.value;
    }
}
