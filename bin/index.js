#! /usr/bin/env node


var 
	program = require('commander'),
	fs = require('fs'),
	file = require('../lib/');


program
  .version('0.0.1')

program
	.command('create')
	.description('create project or file. include html, js, css...')
	.option("-t, --type [mode]", "set a file type")
	.action(function(name, options){
		process.stdout.write('-----------------------------------------\n');
		process.stdout.write('* 1  创建一个空的目录.\n');
		process.stdout.write('* 2  创建一个文件[.html, .js, .css, ...].\n');
		process.stdout.write('* 3  创建一个项目.\n');
		process.stdout.write('-----------------------------------------\n');
		process.stdout.write('\n');
		process.stdout.write('=> 请选择你要操作的选项：');
		process.stdin.setEncoding('utf8');
		process.stdin.resume();
		process.stdin.on('data', function(chunk){
			file(chunk);
			//process.stdin.pause();
		});
	});

program.parse(process.argv);