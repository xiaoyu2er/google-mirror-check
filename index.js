var request = require('request-promise');
var promise = require('promise');
var uniq = require('uniq');

var siteType = {
    mirror: 2,
    variant: 1
}

var mirrors = uniq([
    'http://g.jiasubao.co/',
    'http://gc.ihuan.me/',
    'http://ggss.cf/',
    'http://gogoogle.ml/',
    'http://google.casejs.com/',
    'http://hao.cytbj.com/',
    'http://rose.jgoproxy.tk/',
    'http://s.8090st.com/',
    'http://soguge.com/',
    'http://www.wen.lu/',
    'http://www.zzq2.com/',
    'https://g2.wen.lu/',
    'https://gg.kfd.me/',
    'https://ggg.eeload.com/',
    'https://go.cccyun.cn/',
    'https://jisuobuyu.com/',
    'https://www.iamgg.pw/',
    'https://www.onenew.net/'
]).map(function(url) {
    return { url: url, type: 'mirror', time: 0 };
})

;

var variants = uniq([])
    .map(function(url) {
        return { url: url, type: 'variant', time: 0 };
    });





exports.check = function() {
    var backups = [].concat(mirrors, variants);
    var promises = backups.map(function(backup) {
        var d1 = new Date();
        return request({
                url: backup.url,
                timeout: 5000
            })
            .then(function(res) {
                var d2 = new Date();
                backup.time = d2 - d1;
                backup.success = true;
            })
            .catch(function(err) {
                backup.success = false;
            });
    })
    return promise.all(promises).then(function() {
        return backups.filter(function(b) {
            return b.success;
        }).sort(function(a, b) {
            var type = siteType[b.type] - siteType[a.type];
            return type == 0 ? a.time - b.time : type;
        })
    });
};