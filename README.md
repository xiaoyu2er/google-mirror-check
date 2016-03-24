# 谷歌镜像搜集

使用方法:

```
require('google-mirror-check')
    .then(function(arr) {
        return arr.forEach(function(b) {
            // b = {url: '', type: 'mirror': time: 1922, success: true};
            var str = '- [' + b.url + '](' + b.url + ')' + ' (' + b.time + 'ms)';
            console.log(str);
        })
    })
```
