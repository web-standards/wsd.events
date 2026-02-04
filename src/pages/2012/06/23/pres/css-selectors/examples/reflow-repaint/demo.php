<?php

# Настройки
# =========

# Имя файла веб-страницы
$document_filename = 'index.html';

# Конструкция, с которой начинается замедленный вывод
$delayed_beginning = '<body';

# Задержка после открывающих тегов и тегов пустых элементов (в микросекундах)
$opening_pause = 75000;

# Задержка после закрывающих тегов (в микросекундах)
$closing_pause = 25000;



# Выполнение действий
# ===================

if(is_readable($document_filename))
{
	# Содержимое веб-страницы
	$document_content = file_get_contents($document_filename);

	# Объем содержимого
	$content_size = strlen($document_content);

	# Позиция начала конструкции, начиная с которой вывод осуществляется с задержкой
	if($delayed_beginning != '')
	{
		$delayed_position = strpos($document_content, $delayed_beginning);
	}

	# Эта позиция в случае неопределенности
	if(!($delayed_position))
	{
		$delayed_position = 0;
	}

	if(($content_size > 0) && ($opening_pause + $closing_pause > 0))
	{
		# Данные разбиваются на две подстроки
		$direct_output = substr($document_content, 0, $delayed_position);
		$delayed_output = substr($document_content, $delayed_position);

		# Первая подстрока выводится без задержек
		print $direct_output;

		# Вторая подстрока преобразуется в массив
		$delayed_output_array = str_split($delayed_output);


		# Посимвольный вывод с очисткой буфера и паузами после символов '>'

		$lt_flag = 0;     	# Флаг того, что получен символ '<'
		$closing_flag = 0;	# Флаг того, что тег является закрывающим

		foreach($delayed_output_array as $current_symbol)
		{
			print $current_symbol;

			if($current_symbol == '<')
			{
				$lt_flag = 1;
			}
			else
			{
				if(($current_symbol == '/') && ($lt_flag == 1))
				{
					$closing_flag = 1;
				}

				$lt_flag = 0;
			}

			if($current_symbol == '>')
			{
				if($closing_flag == 0)
				{
					if($opening_pause > 0)
					{
						flush();
						usleep($opening_pause);
					}
				}
				else
				{
					if($closing_pause > 0)
					{
						flush();
						usleep($closing_pause);
					}

					$closing_flag = 0;
				}
			}
		}
	}
	else
	{
		# Выводим все содержимое документа
		print $document_content;
	}
}
else
{
	# Вывод сообщения об ошибке в случае невозможности обработать файл
	print "<!DOCTYPE html>
<html lang=\"ru-RU\">

<head>
	<meta charset=\"utf-8\">
	<meta name=\"viewport\" content=\"width=device-width\">
	<title>Ошибка</title>
</head>

<body>
	<h1>Ошибка</h1>
	<p>Невозможно прочесть заданный в&#160;настройках файл.</p>
</body>

</html>
";
}

?>
