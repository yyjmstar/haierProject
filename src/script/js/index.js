;
// ! function($) {
//     //banner数据
//     $.ajax({
//         url: 'php/banner.php',
//         dataType: 'json'
//     }).done(function(bannerdata) {
//         $.each(bannerdata, function(index, value) {
//             var $bannerstr = '<ul>';

//         });
//     });

//     //lunbo数据
//     $.ajax({
//         url: 'php/banner.php',
//         dataType: 'json'
//     }).done(function(bannerdata) {
//         $.each(bannerdata, function(index, value) {
//             var $bannerstr = '<ul>';

//         });
//     });
//     //tab切换数据
//     $.ajax({
//         url: 'php/banner.php',
//         dataType: 'json'
//     }).done(function(bannerdata) {
//         $.each(bannerdata, function(index, value) {
//             var $bannerstr = '<ul>';

//         });
//     });
// }(jQuery);


// ! function() {
//     //lunbo效果

// }(jQuery);
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

// ! function() {
//     //小效果

// }(jQuery);