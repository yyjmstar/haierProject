;
! function($) {

    $('.login-btn').on('click', function() {
        var $username = $('#username').val();
        var $password = $('#password').val();
        $.ajax({
            type: 'post',
            url: 'http://10.31.158.16/HaierProject/php/login.php',
            data: { //将用户名和密码传输给后端
                name: $username,
                pass: $password
            },
            success: function(data) { //请求成功，接收后端返回的值
                if (!data) { //用户名或者密码错误
                    $('#error').html('用户名或密码错误!');
                    $('#password').val('');
                } else { //成功,存cookie,跳转到首页
                    $.cookie('UserName', $username, 7);
                    location.href = 'http://10.31.158.16/HaierProject/src/index1.html';
                }
            }
        })
    });


}(jQuery)