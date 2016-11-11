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
		oldname = o.name;

	o.name = o.name.replace(/\.less$/, '.css');

	return function (solve, reject){
		try {
			less.render(o.content, {compress : compress}, function(err, newContent) {
				if (err) {
					console.log('[ERROR] packer says:');
					console.dir(err);
					self.stop();
				} else {

					o.content = newContent.css;
					
					fs.writeFile(o.name, o.content, function(err) {
						if (err == null) {
							msg = 'plugin ' + path.basename(__filename) + ' wrote ' + o.name+ ' (' + self.getSize(o.name) + ')';
						} else {
							console.log('[ERROR] less says:');
							console.dir(err);
							self.stop();
						}
						fs.unlink(oldname);
						solve(o);
						self.notifyAndUnlock(start, msg);
					});
				}
			});
		} catch (err) {
			console.log('[PARSE ERROR: ' + o.name + '] ' + err.message + ' @' + err.line);
			self.stop();
		}
	};	
}
malta_less.ext = 'less';
module.exports = malta_less;