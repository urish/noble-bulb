### Windows installation notes

1. Currently fails with node 6.x, so use 5.x
2. Download [Zadig](http://zadig.akeo.ie/) and associate Bluetooth stick with the WinUSB driver
3. `npm install` requires build tools:
    * Install here: [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools)
    * Install python 2.7
    * `npm config set python python2.7`
    * `npm config set msvs_version 2015`
    See [node-gyp](https://github.com/nodejs/node-gyp) for additional instructions 
4. If still fails, try `npm install -g node-gyp@latest`