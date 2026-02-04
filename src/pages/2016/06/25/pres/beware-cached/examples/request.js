function request(url) {
    return data[url]
        ? Promise.resolve(data[url])
        : $.get(url);
}
