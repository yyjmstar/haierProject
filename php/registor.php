<?php
	require "conn.php";//引入数据库连接的文件
	
	
	//1.获取前端传来的做唯一匹配的值
	//判断是否传过来了
	//isset($_POST['submit']):为了提交表单数据到数据同时做检测.
	if(isset($_POST['username'])){
		$username=$_POST['username'];
		$result=$conn->query("select * from user where username='$username'");
		if($result->fetch_assoc()){//如果有值代表用户名存在。
			echo 'false';//有重复
		}else{
			echo 'true';//没有重复
		}
	}
	
	// 2.如果单击注册按钮
	if(isset($_POST['submit']) && $_POST['submit']=="注册账号"){
		$user=$_POST['username'];//username：表单的名称
		$pass=md5($_POST['password']);
		$email=$_POST['email'];
		//插入数据库
		$conn->query("insert user values(null,'$user','$pass','$email',NOW())");
		mysql_query($sql);
		header('location:http://10.31.158.16/HaierProject/src/login.html');//页面的跳转
	}
?>