<?php


//$pic = $_POST['file'];
$allowed_ext = array('jpg','jpeg','png','gif');
$upload_dir = 'uploads/';


function get_extension($file_name){
	$ext = explode('.', $file_name);
	$ext = array_pop($ext);
	return strtolower($ext);
}

function randomPrefix($length) 
{ 
	$random= "";
	srand((double)microtime()*1000000);

	$data = "AbcDE123IJKLMN67QRSTUVWXYZ"; 
	$data .= "aBCdefghijklmn123opq45rs67tuv89wxyz"; 
	$data .= "0FGH45OP89";

	for($i = 0; $i < $length; $i++) 
	{ 
		$random .= substr($data, (rand()%(strlen($data))), 1); 
	}

	return $random; 
}

//header("Content-type: image/jpg");
//$image = imagecreatefromstring($_POST["file"]);
//print $image;

$file = $_POST["file"];
$img = str_replace("data:image/png;base64,", "", $file);

//echo '<img src="'..'" />';
//if(!in_array(get_extension($pic['name']),$allowed_ext)){
//	die('Only '.implode(',',$allowed_ext).' files are allowed!');
//}	
//echo $img;
$img = base64_decode($img);
//$img = imagecreatefromstring($img);
//$img = imagecreatefrompng($img,"test.png");
//header('Content-Type: image/png');
//imagepng($img);
//imagedestroy($img);

//move_uploaded_file($pic['tmp_name'], $upload_dir.$pic['name']);
//randomPrefix(8)
$fp =	fopen("i/".$_POST["photoinfo"]."-".time()."-".randomPrefix(2).".png", 'wb');
		fwrite($fp, $img);
		fclose($fp);

echo 	$_POST["phototime"];		
		
		
		
?>