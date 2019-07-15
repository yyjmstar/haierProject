! function($) {
    //取元素计算总价
    const $pricesum = $('.all-price span'); //购物车总价结算
    const $itemsum = $('.all-num'); //购物车所有总数
    const $newlist = $('.newlist .form');
    let itemNum = null;
    let priceall = null;
    //定义一个函数，用于渲染购物车页面商品列表
    function itemlist(id, num) {
        $.ajax({
            url: 'http://10.31.158.16/HaierProject/php/cart.php',
            dataType: 'json',
            data: {
                itemid: id
            }
        }).done(function(data) {
            let $clonebox = $('.item-list:hidden').clone(true, true);
            $clonebox.find('.img').attr('src', data.picurl); //商品图片路径
            $clonebox.find('.item-title span').html(data.title); //商品ID
            $clonebox.find('.item-price i').html(data.price); //商品单价
            $clonebox.find('.num').val(num); //商品数量
            $clonebox.find('.item-money i').html(num * data.price) //商品总价
            $newlist.append($clonebox.show());
            priceall += num * data.price; //每次遍历商品总价叠加
            //计算总价
            $('.all-price span').html(priceall)
        })
    }


    //对cookie判断并取cookie的值  
    let num = null;
    if ($.cookie('itemid') && $.cookie('itemnum')) {
        let itemid = $.cookie('itemid').split(','); //将cookie中存的ID变成数组
        let itemnum = $.cookie('itemnum').split(',');
        $.each(itemid, function(index, value) { //遍历存放商品ID的数组
            itemlist(value, itemnum[index]); //函数调用
        });
        //计算购物车商品的总数
        $.each(itemnum, function(index, value) {
            itemNum += Number(value);
            $itemsum.html(itemNum); //计算总数
        })
    } else {
        $itemsum.html(0);
        $pricesum.html(0);
    }


    //点击删除按钮， 删除整条信息
    const $itemlist = $('.item-list');
    $.each($itemlist, function(index, value) {
            let itemidarr = $.cookie('itemid').split(','); //将cookie中存的ID变成数组
            let itemnumarr = $.cookie('itemnum').split(',');
            $(this).find('strong').on('click', function() {
                let $itemid = $(this).parent().parent().find('img').attr('itemid'); //获取删除图片的ID
                $(this).parent().parent().remove(); //从购物车页面移除对应ID的商品列表
                let index = $.inArray($itemid, itemidarr);
                itemidarr.splice(index, 1); //删除对应的商品ID
                itemnumarr.splice(index, 1); //删除对应ID商品的数量
                $.cookie('itemid', itemidarr.join(','), { expires: 10 }) //写入cookie
                $.cookie('itemnum', itemnumarr.join(','), { expires: 10 })
            })
        })
        //点击数量的input左右的加减符号，数量改变

}(jQuery)