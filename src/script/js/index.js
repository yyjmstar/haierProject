;
! function($) {
    //定义函数用于获取第三部分优品专辑渲染数据
    function getdata(data, $optimalUl) {
        let liststr = '';
        $.each(data, function(index, value) {
            liststr += `
            <li class="optimal-item">
            <a href="javascript:;" target="_blank" data-growing-idx="201">
                <span class="dis-txt" title="${value.title}">${value.title}</span>
            </a>
            <span class="mod-price"><i>￥</i>${value.price}</span>
            <a href="javascript:;" class="lf-anim" target="_blank" data-growing-idx="201" rel="nofollow">
                <img src="${value.picurl}" alt="${value.price}">
            </a>
        </li>
            `
        });
        $optimalUl.append(liststr)
    }
    //1.主体第一部分精品推荐数据
    $.ajax({
        url: 'http://10.31.158.16/HaierProject/php/part1-data.php',
        dataType: 'json',
    }).done(function(data) {
        const $jpList = $('.jp-list');
        let itemstr = '';
        $.each(data, function(index, value) {
            itemstr += `
            <li class="jp-item">
            <a href="javascript:;" class="jp-img rg-anim" target="_blank"><img src="${value.picurl}" alt=""></a>
            <a href="javascript:;" class="dis-txt" title="${value.title}" target="_blank">${value.title}</a>
            <span class="mod-price"><i>￥</i><span>${value.price}</span></span>
        </li>
            `
        });
        $jpList.append(itemstr);
    });
    //主体第三部分优品专辑数据
    //洗衣机
    $.ajax({
        url: 'http://10.31.158.16/HaierProject/php/part3-xyjdata.php',
        dataType: 'json'
    }).done(function(data) {
        const $optimalUl = $('.optimal-list-ul0');
        getdata(data, $optimalUl)
    });
    //冰箱
    $.ajax({
        url: 'http://10.31.158.16/HaierProject/php/part3-bxdata.php',
        dataType: 'json'
    }).done(function(data) {
        const $optimalUl = $('.optimal-list-ul1');
        getdata(data, $optimalUl)
    });
    //空调
    $.ajax({
        url: 'http://10.31.158.16/HaierProject/php/part3-ktdata.php',
        dataType: 'json'
    }).done(function(data) {
        const $optimalUl = $('.optimal-list-ul2');
        getdata(data, $optimalUl)
    });
    //彩电
    $.ajax({
        url: 'http://10.31.158.16/HaierProject/php/part3-cddata.php',
        dataType: 'json'
    }).done(function(data) {
        const $optimalUl = $('.optimal-list-ul3');
        getdata(data, $optimalUl)
    });
    //热水器
    $.ajax({
        url: 'http://10.31.158.16/HaierProject/php/part3-rsqdata.php',
        dataType: 'json'
    }).done(function(data) {
        const $optimalUl = $('.optimal-list-ul4');
        getdata(data, $optimalUl)
    });
    //厨电
    $.ajax({
        url: 'http://10.31.158.16/HaierProject/php/part3-cfdata.php',
        dataType: 'json'
    }).done(function(data) {
        const $optimalUl = $('.optimal-list-ul5');
        getdata(data, $optimalUl)
    });
    //冷柜
    $.ajax({
        url: 'http://10.31.158.16/HaierProject/php/part3-lgdata.php',
        dataType: 'json'
    }).done(function(data) {
        const $optimalUl = $('.optimal-list-ul6');
        getdata(data, $optimalUl)
    });
    //生活家电
    $.ajax({
        url: 'http://10.31.158.16/HaierProject/php/part3-shjddata.php',
        dataType: 'json'
    }).done(function(data) {
        const $optimalUl = $('.optimal-list-ul7');
        getdata(data, $optimalUl)
    });
    //主体第五部分为你推荐数据渲染
    $.ajax({
        url: 'http://10.31.158.16/HaierProject/php/part5-data.php',
        dataType: 'json',
    }).done(function(data) {
        const $recomitem = $('.recommend-mod .product-dis');
        let itemstr = '';
        $.each(data, function(index, value) {
            itemstr += `
            <li class="ud-anim">
            <a href="=javascript:;" class="dis-link" target="_blank">
                <img src="${value.picurl}">
            </a>
            <a href="=javascript:;" class="dis-txt" target="_blank" data-growing-idx="1">${value.title}</a>
            <p class="dis-price">
                <span class="mod-price"><i>￥</i><span>${value.price}</span>
            </p>
        </li>
            `
        });
        $recomitem.append(itemstr)
    });

}(jQuery);


;
! function($) {
    //banner幻灯片效果
    class Hdp {
        // 获取对应的元素，变为属性
        constructor() {
                this.banner = $('.main-banner');
                this.bannerPicUl = $('.banner-pic');
                this.bannerPicLi = $('.banner-pic li');
                this.bannerBtn = $('.banner-btn li');
                this.picliwidth = this.bannerPicUl.width();
                this.left = $('.main-banner .left');
                this.right = $('.main-banner .right');
                this.arrows = $('.main-banner .left , .main-banner .right')
                this.index = null;
                this.timer = null;
            }
            //方法
            //初始化方法
        init() {
                let _this = this;
                //克隆第一个和最后一个元素
                this.clonePic();
                //点击banner图底部按钮，被激活
                this.bannerBtn.on('click', function() {
                        _this.index = $(this).index();
                        _this.picMove(_this.index);
                    })
                    //鼠标进入banner,左右切换箭头出现
                this.banner.hover(function() {
                        _this.arrows.show();
                        clearInterval(_this.timer);
                    }, function() {
                        _this.arrows.hide();
                        _this.autoplay();
                    })
                    //点击右边箭头，图片切换
                this.right.on('click', function() {
                        _this.index++;
                        if (_this.index > _this.bannerBtn.size() - 1) {
                            _this.index = 0;
                            _this.bannerPicUl.css({ left: 0 })
                        }
                        _this.picMove(_this.index);
                    })
                    //点击左边箭头，图片切换
                this.left.on('click', function() {
                        _this.index--;
                        console.log(_this.index);
                        if (_this.index < 0) {
                            _this.index = _this.bannerBtn.length - 1;
                            _this.bannerPicUl.css({ left: -(_this.bannerBtn.length + 1) * _this.picliwidth })

                        }
                        _this.picMove(_this.index);
                    })
                    //自动播放
                this.autoplay();
            }
            //部分效果的方法
            //1.克隆元素
        clonePic() {
                let $firstPic = this.bannerPicLi.first().clone(); //克隆第一张图片
                let $lastPic = this.bannerPicLi.last().clone(); //克隆最后一张图片；
                this.bannerPicUl.append($firstPic); //将第一张图片追加到最后
                this.bannerPicUl.prepend($lastPic); //将最后一张追加到最前面
                this.bannerPicUl.width(this.picliwidth * $('.banner-pic li').length) //计算bannerPicUl的宽度
                this.bannerPicUl.css({ left: -this.picliwidth });
            }
            //2.点击对应的按钮图片移动
        picMove(index) {
                this.bannerBtn.eq(index).addClass('banner-active').siblings().removeClass('banner-active'); //添加类
                this.bannerPicUl.stop(true).animate({
                    left: -(index + 1) * this.picliwidth
                })
            }
            //3.自动播放
        autoplay() {
            let _this = this;
            this.timer = setInterval(function() {
                _this.right.click();
            }, 3000)
        }

    }
    new Hdp().init();
}(jQuery);;
! function($) {
    //楼梯效果
    // 取对应的元素
    const $sidenav = $('#sidenav');
    const $louti = $('#sidenav ul li');
    const $louceng = $('.louceng');
    const $returnTop = $('#sidenav ul .return');
    const $topbar = $('.top-bar');
    const $headerwrap = $('.head-wrap');
    const $navbar = $('.nav-bar');
    const $banner = $('.pb-main');
    const $saleHot = $('.saleHot-mod');
    // 楼梯效果基于滚轮事件
    $(window).on('scroll', function() {
        let $scrollTop = $(window).scrollTop(); //获取滚动条距离顶端距离
        let $headerTop = $topbar.height() + $headerwrap.height() + $navbar.height() + $banner.height() + $saleHot.height();
        //进行判断，滚动条距离顶端的距离与头部的高度的一半进行判断
        if ($scrollTop > $headerTop / 2) {
            $sidenav.show();
        } else {
            $sidenav.hide();
        }
        // 遍历对应首页的五个部分，获取对应的top值并进行判断
        $louceng.each(function(index, element) {
                let $loucengTop = $louceng.eq(index).offset().top; //滚动条滚动时，获取对应索引的楼层距顶端的距离
                if ($loucengTop + $(element).height() / 10 > $scrollTop) { //判断，当滚动条距顶端的距离小于当前楼层距离顶端的距离加上自身高度的一半
                    $louti.not($returnTop).removeClass('active');
                    $louti.not($returnTop).eq(index).addClass('active');
                    return false;
                }
            })
            //随意点击侧边的楼梯，与楼层内容对应，
        $louti.not($returnTop).on('click', function() {
                $(this).addClass('active').siblings().removeClass('active'); //点击对应的楼层添加类
                // 点击楼梯与楼层内容对应
                let $loucengTop = $louceng.eq($(this).index()).offset().top;
                $('html,body').stop().animate({
                    scrollTop: $loucengTop
                }, 500)
            })
            // 点击回到顶部按钮，回到顶部
        $returnTop.on('click', function() {
            $('html,body').stop().animate({
                scrollTop: 0
            }, 1000)
        })
    })

}(jQuery);
//首页主体第三部分优品专辑tab切换效果
;
! function($) {
    const $tabli = $('.optimal-album-mod .tab-item ');
    const $tabitem = $('.optimal-album-mod .optimal-panel');
    $tabli.on('mouseover', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $tabitem.eq($(this).index()).show().siblings().hide();

    })
}(jQuery)
//首页主体第四部分大家都在说幻灯片效果
// ! function($) {
//     class Hdp {
//         // 获取对应的元素，变为属性
//         constructor() {
//                 this.movepic = $('.topic-wrap');
//                 this.movepicUl = $('.topic-saying-mod .topic-list');
//                 this.movepicLi = $('.topic-saying-mod .topic-list li');
//                 this.picliwidth = this.movepicLi.eq(0).width();
//                 this.left = $('.sc-prev');
//                 this.right = $('.sc-next');
//                 this.arrows = $('.sc-prev ,.sc-next')
//                 this.index = null;
//                 this.timer = null;
//             }
//             //方法
//             //初始化方法
//         init() {
//             let _this = this;
//             //克隆第一个和最后一个元素
//             this.clonePic();
//             //鼠标进入
//             //部分效果的方法
//             //1.克隆元素
//         }
//         clonePic() {
//                 let $firstPic = this.movepicLi.first().clone(); //克隆第一张图片
//                 let $lastPic = this.movepicLi.last().clone(); //克隆最后一张图片；
//                 this.movepicUl.append($firstPic); //将第一张图片追加到最后
//                 this.movepicUl.prepend($lastPic); //将最后一张追加到最前面
//                 this.movepicUl.width((this.picliwidth + 10) * $('.topic-list li').length) //计算movepicUl的宽度
//                 console.log($('.topic-list li').length)
//                 this.movepicUl.css({ left: -this.picliwidth });
//             }
//             //2.点击对应的按钮图片移动
//             //3.自动播放

//     }
//     new Hdp().init();
// }(jQuery);
//页面小效果
//1.banner图左边侧边栏，鼠标经过效果

;
! function($) {
    const $navli = $('.nav-bar .nav_ul li');
    const $navitem = $('.nav-bar .nav-side-item');
    //鼠标悬浮
    $navli.hover(function() {
        $(this).addClass('bgcolor_change').siblings().removeClass('bgcolor_change')
        $(this).find('a').addClass('fontcolor_change').parent().siblings().find('a').removeClass('fontcolor_change');
        $navitem.eq($(this).index()).animate({
            width: 447
        })

    }, function() {
        $(this).removeClass('bgcolor_change');
        $(this).find('a').removeClass('fontcolor_change');
        $navitem.eq($(this).index()).animate({
            width: 0
        }, 1000)
    })
    $navitem.hover(function() {},
        function() {
            $(this).animate({
                width: 0
            })
        }, 1000)
}(jQuery)