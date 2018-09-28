var gulp = require('gulp');//加载gulp文件
var htmlmin = require('gulp-htmlmin');//加载html压缩包
var cssmin = require("gulp-clean-css");//加载css压缩包
var concat = require("gulp-concat");//加载css、js合并包
var uglify = require("gulp-uglify");//加载js压缩包
var sass = require("gulp-sass");//加载sass压缩包
var rename = require("gulp-rename");//加载重命名包
var imagemin = require("gulp-imagemin");//加载图片压缩包
var base64 = require("gulp-base64");//加载图片转码包
var inject = require("gulp-inject");//加载注入包
var watch = require("gulp-watch");//加载监听包
var connect = require("gulp-connect")//加载服务器包

//我是注释，为了测试one
//我是注释2，为了测试克隆是否成功
//我是注释2，为了测试克隆是否成功

// css文件
gulp.task("css",function(){
	gulp.src(["./src/css/base.css","./src/css/lunbo.css"])
		.pipe(concat("all.css"))//合并css
		.pipe(cssmin())//压缩css
		.pipe(base64()) //背景图转码为base64
		.pipe(gulp.dest("./dist/css"));
});

//js文件
gulp.task("js",function(){
	gulp.src(["./src/js/jquery.js","./src/js/banner.js"])
		// 合并
		.pipe(concat("all.js"))
		//压缩 
		.pipe(uglify())
		.pipe(gulp.dest("./dist/js"));
});

//sass文件
gulp.task("sass",function(){
	gulp.src("./src/sass/*.scss") //找到所有以scss结尾的文件
		.pipe(concat("all.scss")) //合并
		.pipe(sass())  //转换为css
		.pipe(rename("last-sass.css"))//重新命名
		.pipe(cssmin())
		.pipe(gulp.dest("./dist/css")); //转换，压缩后放在css中
});

//图片
gulp.task("image",function(){
	gulp.src("./src/images/**/*")
		//压缩 
		.pipe(imagemin())
		.pipe(gulp.dest("./dist/images"));
});

// inject
gulp.task("inject",["html"],function(){
	gulp.src("./dist/index.html")
		//inject注入地址  相对地址 
		.pipe(inject(gulp.src(["./dist/css/all.css","./dist/js/all.js"]),{relative:true}))
		.pipe(gulp.dest("./dist"));
	gulp.src("./dist/html/**/*")
		.pipe(inject(gulp.src(["./dist/css/all.css","./dist/js/all.js"]),{relative:true}))
		.pipe(gulp.dest("./dist/html"));
});

// html文件
gulp.task('html',["css","js"],function(){
  gulp.src("./src/index.html")  //加载路径
  // .pipe(htmlmin({ collapseWhitespace: true }))  //压缩html文件
  .pipe(gulp.dest("./dist"))  //输出路径
  gulp.src("./src/html/**/*")  //加载路径
  .pipe(gulp.dest("./dist/html"))  //输出路径
});

// watch
gulp.task("watch",function(){
	gulp.watch("./src/css/**/*",["css"]); //监听css文件，若变化，依赖于gulp下的css方法
	gulp.watch("./src/js/**/*",["js"]);//监听css文件，若变化，依赖于gulp下的js方法
})

// server
gulp.task("connect",function(){
	connect.server({
		root:"dist",//默认文件夹名称
		livereload: true //默认直接加载类型
	});
});

// 默认gulp
gulp.task("default",["image","inject","sass","watch","connect"]);