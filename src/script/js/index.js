;
! function($) {
    //定义函数用于获取第三部分优品专辑渲染数据
    function getdata(data, $optimalUl) {
        let liststr = '';
        $.each(data, function(index, value) {
            liststr += `
            <li class="optimal-item">
            <a href="http://10.31.158.16/HaierProject/src/details.html?itemid=${value.picid}" style="display:inlineblock"target="_blank" data-growing-idx="201">
                <span class="dis-txt" title="${value.title}">${value.title}</span>
            <span class="mod-price"><i>￥</i>${value.price}</span>
                <img src="${value.picurl}" alt="${value.price}">
            </a>
        </li>
            `
        });
        $optimalUl.append(liststr)
    };
    //定义函数用于首页鼠标移入，图片移动
    function picmove(select) {
        $(select).find('img').css({ position: 'absolute' }).hover(function() {
            $(this).stop().animate({
                left: 3
            })
        }, function() {
            $(this).stop().animate({
                left: 0
            })
        })
    }
    //分会场部分
    picmove('.saleHot-mod');
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
        getdata(data, $optimalUl);
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
! function($) {
    class Hdp {
        // 获取对应的元素，变为属性
        constructor() {
                this.movepic = $('.topic-wrap');
                this.movepicUl = $('.topic-saying-mod .topic-list');
                this.movepicLi = $('.topic-saying-mod .topic-list li');
                this.picliwidth = this.movepicLi.eq(0).width() + 10;
                this.left = $('.sc-prev');
                this.right = $('.sc-next');
                this.arrows = $('.sc-prev ,.sc-next')
                this.num = 0;
                this.timer = null;
            }
            //方法
            //初始化方法
        init() {
            let _this = this;
            //克隆第一个和最后一个元素
            this.clonePic();
            //点击右箭头，运动
            this.right.on('click', function() {
                    _this.num++;
                    if (_this.num > _this.movepicLi.length - 1) {
                        _this.num = 0;
                        _this.movepicUl.css({
                            left: 0
                        })
                    }
                    _this.picMove(_this.num)
                })
                //点击左箭头，运动
            this.left.on('click', function() {
                    _this.num--;
                    if (_this.num < -1) {
                        _this.num = _this.movepicLi.length - 1;
                        _this.movepicUl.css({
                            left: -(_this.movepicLi.length) * _this.picliwidth
                        })
                    }
                    _this.picMove(_this.num)
                })
                //鼠标进入，停止自动播放，移出，继续播放
            this.movepic.hover(function() {
                    clearInterval(_this.timer)
                }, function() {
                    _this.autoplay();
                })
                //自动播放
            _this.autoplay();
            //部分效果的方法
            //1.克隆元素
        }
        clonePic() {
                let $firstPic = this.movepicLi.first().clone(); //克隆第一张图片
                let $lastPic = this.movepicLi.last().clone(); //克隆最后一张图片；
                let $secondPic = this.movepicLi.eq(1).clone(); //克隆第二张图片
                let $lastsecondPic = this.movepicLi.eq(this.movepicLi.length - 2).clone() //克隆倒数第二张图片
                this.movepicUl.append($firstPic); //将第一张图片追加到最后
                this.movepicUl.append($secondPic);
                this.movepicUl.prepend($lastPic); //将最后一张追加到最前面
                this.movepicUl.prepend($lastsecondPic);
                this.movepicUl.width((this.picliwidth + 10) * $('.topic-list li').length) //计算movepicUl的宽度
                this.movepicUl.css({ left: -2 * this.picliwidth });
            }
            //2.点击对应的按钮图片移动
        picMove(num) {
                this.movepicUl.stop(true).animate({
                    left: -(num + 1) * this.picliwidth
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
}(jQuery);
//详情页数据渲染及部分效果
! function($) {
    let itemid = location.search.split('?')[1].split('=')[1];
    const $itempic = $('.item-bpic img');
    const $itemtitle = $('.item-title');
    const $itemprice = $('.item-info-list .price');
    const $piclistall = $('.piclist-all ul');
    const $bpic = $('.bpic');

    const $leftarrow = $('.item-piclist .left');
    const $rightarrow = $('.item-piclist .right');

    $.ajax({
        url: 'http://10.31.158.16/HaierProject/php/details-part3xyj.php',
        dataType: 'json',
        data: {
            itemid: itemid
        }
    }).done(function(data) {
        let tabpicurls = [];
        tabpicurls = data.tabpicurls.split('，');
        console.log(tabpicurls);
        $itempic.attr({ src: `${data.picurl}` });
        $bpic.attr({ src: `${data.picurl}` });
        $itemtitle.html(`${data.title}`);
        $itemprice.html(`${data.price}`);
        //渲染详情页下面的tab切换列表 
        let str = '';
        $.each(tabpicurls, function(index, value) {
            str += `
            <li class="lists">
            <a href="">
                <img src="${value}" alt="">
            </a>
        </li>
            `
        })
        $piclistall.append(str);
        //鼠标悬浮放大镜下面的图片列表，放大镜中的图片改变当前鼠标悬浮的图片
        const $piclistli = $('.piclist-all ul li');
        $piclistli.on('mouseover', function() {
                let imgurl = $(this).find('img').attr('src');
                $itempic.attr({ src: imgurl });
                $bpic.attr({ src: imgurl });
            })
            //点击大图下面的列表进行切换
        let num = 5;
        const $listli = $('.piclist-all ul li');
        const $listliwidth = $listli.eq(0).width();
        $piclistall.width($listliwidth * $listli.length);
        //右键点击
        $rightarrow.on('click', function() {
            if ($listli.length > num) {
                num++;
            };
            if ($listli.length == num) {}
            $piclistall.stop().animate({
                left: -(num - 5) * $listliwidth
            })
        });
        //左键点击
        $leftarrow.on('click', function() {
            if (num > 5) {
                num--;
            };
            $piclistall.stop().animate({
                left: -(num - 5) * $listliwidth
            })
        });
    });
}(jQuery);
//放大镜效果
;
! function($) {
    //构造函数
    function Fdj() {
        //取元素  
        this.itemcontainer = $('.item-bpic');
        this.spic = $('.item-bpic img');
        this.sf = $('.item-bpic .sf');
        this.df = $('.df');
        this.bpic = $('.bpic');
        let lp = null;
        let tp = null;
    }
    //原型
    Fdj.prototype.init = function() {
            let _this = this;
            //鼠标移入小图，大图出现,移出消失
            this.itemcontainer.hover(function() {
                _this.df.show();
                _this.sf.show();
                _this.sfsize();
                _this.sf.on('mousemove', function(ev) {
                    let event = ev || window.event;
                    _this.sfposition(event);
                    _this.bpicposition();

                })
            }, function() {
                _this.df.hide();
                _this.sf.hide()
            })
        }
        //将鼠标的位置给sf，让sf跟随鼠标移动
    Fdj.prototype.sfposition = function(event) {
            lp = event.pageX - this.itemcontainer.offset().left - this.sf.width() / 2;
            tp = event.pageY - this.itemcontainer.offset().top - this.sf.height() / 2;
            if (lp <= 0) {
                lp = 0;
            } else if (lp >= this.itemcontainer.width() - this.sf.width()) {
                lp = this.itemcontainer.width() - this.sf.width()
            };
            if (tp <= 0) {
                tp = 0;
            } else if (tp >= this.itemcontainer.height() - this.sf.height()) {
                tp = this.itemcontainer.height() - this.sf.height()
            }
            this.sf.css({
                left: lp,
                top: tp
            })
        }
        //求小放大镜的尺寸
    Fdj.prototype.sfsize = function() {
            let width = this.df.width() * this.spic.width() / this.bpic.width();
            let height = this.df.height() * this.spic.height() / this.bpic.height();
            this.lrate = this.df.width() / this.sf.width();
            this.trate = this.df.width() / this.sf.height();
            this.sf.width(width);
            this.sf.height(height);

        }
        //让大图反方向移动
    Fdj.prototype.bpicposition = function() {
            this.bpic.css({
                left: -this.lrate * lp,
                top: -this.trate * tp

            })
        }
        //调用
    new Fdj().init()
}(jQuery)
//页面小效果
//1.搜索框效果
;
// ! function($) {
function haier(data) {
    const $searchul = $('.ul-searchKeyList');
    let arr = data.data;
    let str = '';
    $.each(arr, function(index, data) {
        str += `
            <li class="li-searchKey">
            <a href="http://search.shunguang.com/s?k=${value.smartWord}">
            <span class="s-keyword">${value.smartWord}</span><span class="s-keyNumber">约${value.resultCount}个商品</span>
            </a>
           </li>
            `
    })
    $searchul.append(str);
}

$('.all-search .txt-search').on('input', function() {
    let str = `
        <script  class="searchscript" src="http://search.shunguang.com/suggestJson.html?q=${$(this).val()}&jsonpCallback=haier&_=1562652256201">
        </script>
    `
    $('body').append(str);
});
$('.all-search .txt-search').on('blur', function() {
    $('body').remove('.all-search .searchscript')
})

// }(jQuery)

//2.banner图左边侧边栏，鼠标经过效果

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
}(jQuery);