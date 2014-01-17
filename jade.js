var jade = require('jade')
  , data = require('./data.json')
;

console.log(jade.renderFile('vast.jade', { pretty: true, data: data }));