<?php
 require "conn.php";
$result=$conn->query("select * from djpjpart");
$arr=array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
};
echo json_encode($arr);