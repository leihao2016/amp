
var 
	Promise = require("bluebird"),
	fs = require('fs-extra');


var file = {
	createEmptyDir: function() {
		process.stdout.write('=> 请输入要创建的目录名称：');
		process.stdin.setEncoding('utf8');
		process.stdin.resume();
		process.stdin.on('data', function(dirName){
			dirName = dirName.replace(/(\n|\r)*/g, '');
			var path = dirName + '/';

			fs.exists(path, function(isExist){
				if (!isExist) {
					fs.emptyDir(path, function(err){
						if (err) {
							return console.log(err);
						}
						
						console.log('* 目录: /'+ path + ' 创建成功.');
					});
				} else {
					return console.log('* 目录: /'+ path + ' 已经存在.');
				}
			});

			process.stdin.pause();
		});
	},

	createFileByType: function() {
		process.stdout.write('=> 请输入要创建的文件名称，如test.html：');
		process.stdin.setEncoding('utf8');
		process.stdin.resume();
		process.stdin.on('data', function(file){
			file = file.replace(/(\n|\r)*/g, '');
			var 
				f = file.split('.'),
				name = f[0],
				type = f[1],
				path = name + '/';

			return new Promise(function(resolve, reject){
				if (name) {
					fs.exists(path, function(isExist){
						if (!isExist) {
							fs.mkdir(path, function(err){
								if (err) {
									return console.log(err);
								}
							});
						}
					});

					resolve('* 创建成功.');
				} else {
					reject('* 创建失败.');
				}
			}).then(function(){
				var dir = path + file;
				fs.exists(file, function(isExist){
					if (isExist) {
						process.stdin.pause();
						return console.log('* 文件: /'+ dir + ' 已经存在.');
					} else {
						fs.copy('temp/demo.'+type, dir, function(err){
							if (err) {
								return console.log(err);
							}

							console.log('* 文件: /'+ dir + ' 创建成功.');
					
							process.stdin.pause();
						});
					}
				});
			});

			process.stdin.pause();
		});
	},

	createProject: function() {
		process.stdout.write('=> 请输入要创建的项目名称：');
		process.stdin.setEncoding('utf8');
		process.stdin.resume();
		process.stdin.on('data', function(projectName){
			projectName = projectName.replace(/(\n|\r)*/g, '');

			return fs.copy('temp', projectName, function(err){
				if (err) {
					return console.log(err);
				}

				fs.readdir(projectName, function(err, files){
					files.forEach(function(item){
						var m = item.match(/\.(.*)/gi);
						if (m && m.length && m[0]) {
							var opath = projectName + '/demo' + m[0];
							var npath = projectName + '/' + projectName + m[0];
							fs.rename(opath, npath);
						}
					});
				});

				console.log('* 项目: /'+ projectName + '/ 创建成功.');

				process.stdin.pause();
			});
		});
	}
};

module.exports = function(chunk) {
	if (chunk == 1) {

		// 创建一个空的目录
		file.createEmptyDir();

	} else if (chunk == 2) {

		// 创建一个制定类型的文件
		file.createFileByType();

	} else if (chunk == 3) {

		// 创建一个项目，包括模版、样式、脚本、背景图片...
		file.createProject();

	}
}