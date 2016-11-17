require('malta').checkDeps('less');
/**
 * malta-less plugin
 * dependency : less
 * 
 * affects: .less
 * outputs: a file named as the template but with .css extension
 * parameters accepted:
 * - compress (false)
 * 
 * pipe support : yes
 */
var less = require("less"),
	path = require('path'),
	fs = require('fs');

function malta_less(o, options) {

	var self = this,
		compress = options.compress || false,
		start = new Date(),
		msg,
        pluginName = path.basename(path.dirname(__filename)),
		oldname = o.name,
		doErr = function (e) {
			console.log(('[ERROR on ' + o.name + ' using ' + pluginName + '] :').red());
			console.dir(e);
			self.stop();
		};

	o.name = o.name.replace(/\.less$/, '.css');

	return function (solve, reject){
		less.render(o.content, {compress : compress}, function(err, newContent) {
			err && doErr(err);
			o.content = newContent.css;
			fs.writeFile(o.name, o.content, function(err) {
				err && doErr(err);
				msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name+ ' (' + self.getSize(o.name) + ')';
				fs.unlink(oldname);
				solve(o);
				self.notifyAndUnlock(start, msg);
			});
		});
	};	
}
malta_less.ext = 'less';
module.exports = malta_less;