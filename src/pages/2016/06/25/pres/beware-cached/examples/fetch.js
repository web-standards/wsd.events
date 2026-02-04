const data = [
    { name: 'Catuai', region: 'Latin America' },
    { name: 'Catimor', region: 'Latin America' },
    { name: 'Charrieriana', region: 'Cameroon' },
    { name: 'Timor', region: 'Indonesia' },
    { name: 'Java', region: 'Indonesia' },
    { name: 'K7', region: 'Africa' },
    { name: 'Maragogipe', region: 'Latin America' },
    { name: 'Maragaturra', region: 'Latin America' },
    { name: 'Mocha', region: 'Yemen' },
    { name: 'French Mission', region: 'Africa' },
    { name: 'Mayagüez', region: 'Africa' }
]

module.exports = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), 1500);
    });
}
