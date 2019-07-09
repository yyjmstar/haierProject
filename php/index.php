<?php
 require "conn.php";
 //part1-data
$result1=$conn->query("select * from jptjpart");
$arr1=array();
for($i=0;$i<$result1->num_rows;$i++){
    $arr1[$i]=$result1->fetch_assoc();
};
//part3-bxdata
$result2=$conn->query("select * from ypzjpartbx");
$arr2=array();
for($i=0;$i<$result2->num_rows;$i++){
    $arr2[$i]=$result2->fetch_assoc();
};
//part3-cddata
$result3=$conn->query("select * from ypzjpartcd");
$arr3=array();
for($i=0;$i<$result3->num_rows;$i++){
    $arr3[$i]=$result3->fetch_assoc();
};
//part3-cfdata
$result4=$conn->query("select * from ypzjpartcf");
$arr4=array();
for($i=0;$i<$result4->num_rows;$i++){
    $arr4[$i]=$result4->fetch_assoc();
};
//part3-ktdata
$result5=$conn->query("select * from ypzjpartkt");
$arr5=array();
for($i=0;$i<$result5->num_rows;$i++){
    $arr5[$i]=$result5->fetch_assoc();
};
//part3-lgdata
$result6=$conn->query("select * from ypzjpartlg");
$arr6=array();
for($i=0;$i<$result6->num_rows;$i++){
    $arr6[$i]=$result6->fetch_assoc();
};
//part3-rsqdata
$result7=$conn->query("select * from ypzjpartrsq");
$arr7=array();
for($i=0;$i<$result7->num_rows;$i++){
    $arr7[$i]=$result7->fetch_assoc();
};

//part3-shjddata
$result8=$conn->query("select * from ypzjpartshjd");
$arr8=array();
for($i=0;$i<$result8->num_rows;$i++){
    $arr8[$i]=$result8->fetch_assoc();
};
//part3-xyjdata
$result9=$conn->query("select * from ypzjpartxyj");
$arr9=array();
for($i=0;$i<$result9->num_rows;$i++){
    $arr9[$i]=$result9->fetch_assoc();
};
//part4-data
$result10=$conn->query("select * from djpjpart");
$arr10=array();
for($i=0;$i<$result10->num_rows;$i++){
    $arr10[$i]=$result10->fetch_assoc();
};
//part5-data
$result11=$conn->query("select * from wntjpart");
$arr11=array();
for($i=0;$i<$result11->num_rows;$i++){
    $arr11[$i]=$result11->fetch_assoc();
};
class data{

}

$d1=new data();
$d1->part1data=$arr1;
$d1->part3bxdata=$arr2;
$d1->part3cddata=$arr3;
$d1->part3cfdata=$arr4;
$d1->part3ktdata=$arr5;
$d1->part3lgdata=$arr6;
$d1->part3rsqdata=$arr7;
$d1->part3shjdata=$arr8;
$d1->part3xyjdata=$arr9;
$d1->part4data=$arr10;
$d1->part5data=$arr11;

echo json_encode($d1);
