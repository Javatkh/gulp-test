	$(document).ready(function () {

        var i = 0;

        var clone = $(".banner ul li").first().clone();//克隆第一张图片
        $(".banner ul").append(clone);                //复制到列表最后
        var size = $(".banner ul li").size();         //返回匹配元素的数量
        // console.log(size);

        /*循环图片容器的数量，并且向点点按钮的大容器添加几个子节点作为点点按钮*/
        for (var j = 0; j < size-1; j++) {
            $(".banner ol").append("<li></li>");
        }

        $(".banner ol li").first().addClass("active");

        // 先执行一次
        i++;
        move();

        /*自动轮播*/
        var t = setInterval(function () {
            i++;
            move();
            },3000);

        /*鼠标悬停事件*/

        $(".banner").hover(function () {
            clearInterval(t);//鼠标悬停时清除定时器
        }, function () {
            t = setInterval(function () {
                i++;
                move();
                }, 3000); //鼠标移出时开始定时器
        });




        /*鼠标滑入圆点事件*/

        $(".banner ol li").hover(function () {

            var index = $(this).index();//获取当前索引值
            i = index;
            $(".banner ul").stop().animate({ left: -index * 1920 }, 1000);
            $(this).addClass("active").siblings().removeClass("active");
        });



        /*向左按钮*/
        $(".banner .btn-left").click(function () {
            i--;
            move();
        })


        /*向右按钮*/
        $(".banner .btn-right").click(function () {
            i++;
            move();
        })

        /*移动事件*/
        function move() {
            if (i == size) {
                $(".banner ul").css({ left: 0 });
                i = 1;
            }
            if (i == -1) {
                $(".banner ul").css({ left: -(size - 1) * 1920 });
                i = size - 2;
            }
            $(".banner ul").stop().animate({ left: -i * 1920 }, 1000);

            if (i == size - 1) {
                $(".banner ol li").eq(0).addClass("active").siblings().removeClass("active");
            } else {
                $(".banner ol li").eq(i).addClass("active").siblings().removeClass("active");
            }
        }
    });