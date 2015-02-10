<?php
sleep(1);

if (isset($_POST['username']) && isset($_POST['password'])) {
	if ($_POST['username'] == 'admin' && $_POST['password'] == 'admin')
		echo 1;
	else
		echo 0;
} else {
	echo 0;
}

?>
