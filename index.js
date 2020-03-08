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
const less = require("less"),
	path = require('path'),
	fs = require('fs');

function malta_less(o, options) {

	const self = this,
		compress = options.compress || false,
		start = new Date(),
        pluginName = path.basename(path.dirname(__filename)),
        oldname = o.name;
    
    let msg;

	o.name = o.name.replace(/\.less$/, '.css');

	return (solve, reject) => {
		less.render(o.content, {compress : compress}, (err, newContent) => {
			if (err) {
				self.doErr(err, o, pluginName);
				msg = 'plugin ' + pluginName.white() + ' ERROR on file ' + o.name + ')';
				err
                    ? reject(`Plugin ${pluginName} error:\n${err}`)
                    : solve(o);
				self.notifyAndUnlock(start, msg);
			} else {
				o.content = newContent.css;
				fs.writeFile(o.name, o.content, err => {
					err && self.doErr(err, o, pluginName);
					msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name+ ' (' + self.getSize(o.name) + ')';
					fs.unlink(oldname, () => {});
					err
                        ? reject(`Plugin ${pluginName} write error:\n${err}`)
                        : solve(o);
					self.notifyAndUnlock(start, msg);
				});
			}
		});
	};	
}
malta_less.ext = 'less';
module.exports = malta_less;