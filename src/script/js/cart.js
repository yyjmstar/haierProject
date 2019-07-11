! function($) {
    //取元素计算总价
    const $pricesum = $('.all-price span'); //总价
    const $itemsum = $('.all-num'); //总数
    let priceall = null;
    let itemnum = null;
    let itemNum = null;

    //定义一个函数，用于渲染购物车页面商品列表
    function itemlist(id, num) {
        $.ajax({
            url: 'http://10.31.158.16/HaierProject/php/cart.php',
            dataType: 'json',
            data: {
                itemid: id
            }
        }).done(function(data) {
            const $cartlist = $('.newlist .form');
            let str = '';
            $.each(data, function(index, value) {
                str = `
            <div class="item-list clearfix">
                <div class="list-check iteminfo-float">
                    <input type="checkbox">
                </div>
                <div class="item-info iteminfo-float">
                    <a href="" class="item-pic">
                        <img itemid="${data.picid}"
                        src="${data.picurl}" alt="">
                    </a>
                    <a href="" class="item-title">
                        <span>
                            ${data.title}
                    </span>
                    </a>
                </div>
                <div class="item-have iteminfo-float">
                    <span>支持</span>
                </div>
                <div class="item-price iteminfo-float">
                    <i>${data.price}</i>
                </div>
                <div class="item-num iteminfo-float">
                    <em class="em-sub">-</em>
                    <input type="text" class="num" value="${num}">
                    <em class="em-add">+</em>
                </div>
                <div class="item-discount iteminfo-float">
                    <i class="color_red font_style">￥0</i>
                </div>
                <div class="item-money iteminfo-float">
                    <i class="color_red font_style">${data.price*num}</i>
                </div>
                <div class="item-choose iteminfo-float">
                    <em>移入收藏夹</em><br>
                    <strong>删除</strong>
                </div>
            </div>

                `;
            });
            $cartlist.append(str);
            priceall += num * data.price;
            $pricesum.html(priceall);
            //点击删除按钮，删除整条信息
            const $itemlist = $('.item-list');
            console.log($itemlist)
            $.each($itemlist, function(index, value) {
                let itemidarr = $.cookie('itemid').split(','); //将cookie中存的ID变成数组
                let itemnumarr = $.cookie('itemnum').split(',');
                $(this).find('strong').on('click', function() {
                    let $itemid = $(this).parent().parent().find('img').attr('itemid'); //获取删除图片的ID
                    $(this).parent().parent().remove(); //从购物车页面移除对应ID的商品列表
                    let index = $.inArray($itemid, itemidarr);
                    console.log(index)
                    itemidarr.splice(index, 1); //删除对应的商品ID
                    console.log(itemidarr)
                    itemnumarr.splice(index, 1); //删除对应ID商品的数量
                    console.log(itemnumarr)
                    $.cookie('itemid', itemidarr.join(','), { expires: 10 }) //写入cookie
                    $.cookie('itemnum', itemnumarr.join(','), { expires: 10 })

                })
            })

        })
    }
    if ($.cookie('itemid') && $.cookie('itemnum')) {
        let itemid = $.cookie('itemid').split(','); //将cookie中存的ID变成数组
        let itemnum = $.cookie('itemnum').split(',');
        $.each(itemid, function(index, value) { //遍历存放商品ID的数组
            itemlist(value, itemnum[index]);
        });
        //计算购物车商品的总数

        $.each(itemnum, function(index, value) {
            itemNum += Number(value);
            $itemsum.html(itemNum)
        })
    }
}(jQuery)