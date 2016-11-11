This plugin can be used on: **.less** files

Options : 
    - compress : default `false`

Sample usage:  

    malta app/source/home.less public/css -plugins=malta-less

or in the .json file :

    "app/source/home.less" : "public/js -plugins=malta-less"

or in a script : 

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
            */
        });
