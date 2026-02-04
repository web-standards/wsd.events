var _ = require('lodash');
var str = '<%= date %>: Error "<%= error.message %>"';

module.exports = _.template(str);
