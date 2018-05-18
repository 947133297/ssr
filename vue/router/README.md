## 说明
    配置分为三个文件：base, client 和 server。基本配置(base config)包含在两个环境共享的配置，例如，输出路径(output path)，别名(alias)和 loader。服务器配置(server config)和客户端配置(client config)，可以通过使用 webpack-merge 来简单地扩展基本配置
### 3个配置文件
##### base.config：

babel-loader那一块配置如下：    
```
use: {
    loader: "babel-loader",
    options: {
        presets: ["es2015"],  // ES6转ES5
        plugins: ["syntax-dynamic-import"] // 路由懒加载需要用到动态import
    }
},
```
##### client.config：
在以上base.config的基础上添加配置，使用了一个插件“vue-server-renderer/client-plugin”
    
##### server.config：
在以上base.config的基础上添加配置
