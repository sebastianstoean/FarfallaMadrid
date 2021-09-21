<?php

echo "<pre>"; {
		$fecha=$_POST['fecha'];
		$hora=$_POST['hora'];
		$pers=$_POST['personas'];
		$nombre=$_POST['nombre'];
		$phone=$_POST['tel'];

		$to='farfallamadrid2@gmail.com';
		$subject='Reserva día '.$fecha;
		$message='Hay una nueva reserva para '.$pers.' personas el día '.$fecha.' a las
		'.$hora."\n\n".' La reserva es a nombre de '.$nombre."\n\n".'y el número de
		teléfono es: '.$phone;

    mail($to, $subject, $message);

    $messege_sent = true;
	}
  else {
    $messege_sent = false;
  }
echo "</pre>";
?>
