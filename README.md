# 谷歌镜像搜集+检测

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

如果你有更多的镜像请加入到 `./src/mirrors.js`,
如果你有更多的变种网页请加入到 `./src/variants.js`,
如果你有更好的检测方法, 请修改 `./index.js`

愿每个人都可以自由的获取信息.