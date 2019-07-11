<?php
require "conn.php";

if(isset($_POST['name'])){//前端ajax传输过来的额
	$username=$_POST['name'];
	$password=md5($_POST['pass']);
}else{
	exit('非法操作');
}

$result=$conn->query("select * from user where username='$username' and password='$password'");
if($result->fetch_assoc()){
	echo true;
}else{
	echo false;
}
