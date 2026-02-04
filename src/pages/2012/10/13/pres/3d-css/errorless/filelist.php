<?php

$file_list = scandir(".");
$index = count($file_list);

	
echo '<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>Список файлов</title>
</head>
<body><ol>';
while($index--){
	if(($file_list[$index]=='.')||($file_list[$index]=='..')||(!is_file($file_list[$index]))||(strpos($file_list[$index],".php")!==false)){
		continue;
	}
	echo "<li><a href='".$file_list[$index]."'>".$file_list[$index]."</a></li>";
}
echo '</ol></body>
</html>';
?>