
# 当hello.cc源文件写好后，需要被编译成addon.node
# 因此我们以JSON格式写好编译的信息，使用node-gyp工具来编译Node组件
# 在使用node-gyp configure的同时，会产生一个Makefile(UNIX)或者是vcxproj(windows)文件在build/目录
# 使用node-gyp build生成addon.node，该文件会被放到build/Release/目录

# 编译完成之后，可以使用以下方式来引入组件
# 若addon.js和addon.node同时存在时会先引入addon.js文件
# // hello.js
# const addon = require('./build/Release/addon');

# console.log(addon.hello()); // 'world'

{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "hello.cc" ]
    }
  ]
}