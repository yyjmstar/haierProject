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
    const $addcart = $('#buy_Now');
    const itemnum = $('.buy-num .num');

    //渲染详情页数据
    $.ajax({
        url: 'http://10.31.158.16/HaierProject/php/details-part3xyj.php',
        dataType: 'json',
        data: {
            itemid: itemid
        }
    }).done(function(data) {
        let tabpicurls = [];
        tabpicurls = data.tabpicurls.split('，');
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
    //将详情页商品的数量和ID存入cookie
    let idarr = [];
    let numarr = [];
    //定义一个函数，确定cookie中是否存在对应商品的ID和数量
    function cookievalue() {
        if ($.cookie('itemid') && $.cookie('itemnum')) {
            idarr = $.cookie('itemid').split(',');
            numarr = $.cookie('itemnum').split(',');
        }
    }
    //点击加入购物车，将对应的商品的ID和数量存入cookie
    $addcart.on('click', function() {
            //点击加入购物车，出现弹框
            $('.cartclick_choose').show();
            $('.bgmask').addClass('so-openmask');
            console.log($('.cartclick_choose'))
            cookievalue(); //点击加入购物车按钮时，先判断cookie中是否已经存在该商品
            if ($.inArray(itemid, idarr) === -1) { //如果当前商品的ID不在cookie中
                idarr.push(itemid); //存ID
                numarr.push(itemnum.val()); //存数量
                $.cookie('itemid', idarr.join(','), { expires: 10 }) //写入cookie
                $.cookie('itemnum', numarr.join(','), { expires: 10 })
            } else { //添加的商品在cookie中ID已存在
                let index = $.inArray(itemid, idarr);
                let sum = parseInt(numarr[index]) + parseInt(itemnum.val());
                numarr[index] = sum;
                $.cookie('itemnum', numarr.join(','), { expires: 10 })
            }
        })
        //点击弹框的关闭按钮
    $('.s-sopop-close').on('click', function() {
        $('.cartclick_choose').hide();
        $('.bgmask').removeClass('so-openmask');
    })



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
}(jQuery);