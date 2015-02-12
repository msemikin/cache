<?php
sleep(1);

if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['usertype'])) {
    if($_POST['usertype'] == 'student'){
        if ($_POST['username'] == 'admin' && $_POST['password'] == 'admin')
            echo 1;
        else
            echo 0;
    }
    else if ($_POST['usertype'] == 'teacher'){
        if ($_POST['username'] == 'admin' && $_POST['password'] == 'admin')
            echo 2;
        else
            echo 0;
    }
} else {
	echo 0;
}

?>
