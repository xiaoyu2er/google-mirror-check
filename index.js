var request = require('request-promise');
var promise = require('promise');
var uniq = require('uniq');

var siteType = require('./src/siteType');
var mirrors = require('./src/mirrors');
var variants = require('./src/variants');

mirrors = uniq(mirrors)
    .map(function (url) {
        return {url: url, type: 'mirror', time: 0};
    });

variants = uniq([])
    .map(function (url) {
        return {url: url, type: 'variant', time: 0};
    });


exports.check = function () {
    var backups = [].concat(mirrors, variants);
    var promises = backups.map(function (backup) {
        var d1 = new Date();
        return request({
            url: backup.url,
            timeout: 5000
        }).then(function () {
                var d2 = new Date();
                backup.time = d2 - d1;
                backup.success = true;
            })
            .catch(function (err) {
                backup.success = false;
            });
    });

    return promise.all(promises)
        .then(function () {
            return backups.filter(function (b) {
                return b.success;
            }).sort(function (a, b) {
                var type = siteType[b.type] - siteType[a.type];
                return type == 0 ? a.time - b.time : type;
            })
        });
};