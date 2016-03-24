var google = require('../index.js')

google.check()
    .then(function(arr) {
        return arr.map(function(b) {
            var str = '- [' + b.url + '](' + b.url + ')' + ' (' + b.time + 'ms)';
            console.log(str);
            return str;
        })
    })