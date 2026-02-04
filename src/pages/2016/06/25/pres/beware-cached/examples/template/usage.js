var template = require('./template');
var myError = Error('Oh-oh-oh!');

console.log(template({
    date: new Date(),
    error: myError
}));
