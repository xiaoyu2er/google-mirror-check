# 谷歌镜像搜集

使用方法:

```
var google = require('google-mirror-check')
google.check()
    .then(function(arr) {
        arr.forEach(function(b) {
            // b = {url: '', type: 'mirror': time: 1922, success: true};
            var str = '- [' + b.url + '](' + b.url + ')' + ' (' + b.time + 'ms)';
            console.log(str);
        })
    })
```
