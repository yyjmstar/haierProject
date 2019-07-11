;
! function($) {
    //表单验证-用户名
    $.extend($.validator.messages, {
        equalTo: "请再次输入相同的密码",
        minlength: $.validator.format("密码位数不符合要求"),
    })
    $('#form').validate({
        rules: {
            username: {
                required: true,
                minlength: 3,
                maxlength: 15,
                remote: { //将前端的name给后端
                    url: "http://10.31.158.16/HaierProject/php/registor.php", //后台处理程序
                    type: "post" //数据发送方式
                }
            },
            password: {
                required: true,
                minlength: 6
            },
            verifypass: {
                required: true,
                equalTo: '#password'
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            username: {
                required: '用户名不能为空',
                minlength: '用户名字符长度不能小于3个字符',
                maxlength: '用户名字符长度不能大于15个字符',
                remote: '用户名已存在'
            },
            password: {
                required: '密码不能为空'
            },
            verifypass: {
                required: '验证密码不能为空'
            },
            email: {
                required: '电子邮箱不能为空',
                email: '你输入的邮箱格式有误'
            }
        }
    });

    $.validator.setDefaults({
        /*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
        success: function(p) {
            p.find('.error').addClass('valid').text('ok').css('color', 'green');
        }
    });
}(jQuery)