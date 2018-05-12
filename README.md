---
[![npm version](https://badge.fury.io/js/malta-less.svg)](http://badge.fury.io/js/malta-less)
[![Dependencies](https://david-dm.org/fedeghe/malta-less.svg)](https://david-dm.org/fedeghe/malta-less)
[![npm downloads](https://img.shields.io/npm/dt/malta-less.svg)](https://npmjs.org/package/malta-less)
[![npm downloads](https://img.shields.io/npm/dm/malta-less.svg)](https://npmjs.org/package/malta-less)  
[![Known Vulnerabilities](https://snyk.io/test/github/fedeghe/malta-less/badge.svg)](https://snyk.io/test/github/fedeghe/malta-less)
---  

This plugin can be used on: **.less** files

Options : 
    - compress : default `false`

Sample usage:  
```
malta app/source/home.less public/css -plugins=malta-less
```
or in the .json file :
```
"app/source/home.less" : "public/js -plugins=malta-less"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/home.less',
    'public/css',
    '-plugins=malta-less',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```