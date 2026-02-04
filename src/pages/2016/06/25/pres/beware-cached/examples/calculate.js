function calculate (data) {
    return data.reduce((acc, item) => {
        if (!acc[item.region]) {
            acc[item.region] = [];
        }

        acc[item.region].push(item.name);
        return acc;
    }, {});
}

module.exports = calculate;
