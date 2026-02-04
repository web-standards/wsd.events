# Этот скрипт используется для генерации содержимого тестовых файлов.

# Тут нет лишних комментариев, скрипт создавался для решения сиюминутной
# задачи для себя. Используйте, если кому нужно, «как есть».

$document = "<!DOCTYPE html>
<html lang=\"ru-RU\">

<head>
	<meta charset=\"utf-8\">
	<meta name=\"viewport\" content=\"width=device-width\">
	<title>Тест</title>
	<script>
		var \$startTime = (new Date()).getTime();
	</script>
";

$divs_in_set = 5;
$sections_in_set = 6;
$articles_in_set = 10;
$paragraphs_in_set = 10;

$div_number = 0;
$section_number = 0;
$article_number = 0;
$paragraph_number = 0;

$html = '';
$css = '';

srand(100500);

for($i_div = 1; $i_div <= $divs_in_set; $i_div++)
{
	$div_number++;
	$html .= "	<div id=\"d$i_div\" class=\"d$i_div\">\n";

	for($i_section = 1; $i_section <= $sections_in_set; $i_section++)
	{
		$section_number++;
		$html .= "		<section id=\"s$section_number\" class=\"s$section_number\">\n";

		for($i_article = 1; $i_article <= $articles_in_set; $i_article++)
		{
			$article_number++;
			$html .= "			<article id=\"a$article_number\" class=\"a$article_number\">\n";

			for($i_paragraph = 1; $i_paragraph <= $paragraphs_in_set; $i_paragraph++)
			{
				$paragraph_number++;
				$random_number = rand();

				$html .= "				<p id=\"p$paragraph_number\" class=\"p$paragraph_number\"><span>Текст абзаца $paragraph_number\.";
				$html .= " Он&#160;чуть длинее обычного." if($random_number < .3);
				$html .= " Этот абзац по&#160;чистой случайности длиннее многих других." if($random_number > .9);
				$html .= "</span></p>\n";
			}

			#$css .= "		#p$paragraph_number {color: red;}\n";
			#$css .= "		.p$paragraph_number {color: red;}\n";
			#$css .= "		.p$paragraph_number > span {color: red;}\n";
			#$css .= "		.p$paragraph_number * {color: red;}\n";
			#$css .= "		.a$article_number p:last-child {color: red;}\n";
			#$css .= "		.a$article_number p:nth-child(-" . ($paragraphs_in_set + 1) . "n+$paragraphs_in_set) {color: red;}\n";
			#$css .= "		.a$article_number p:nth-of-type(-" . ($paragraphs_in_set + 1) . "n+$paragraphs_in_set) {color: red;}\n";

			$html .= "			</article>\n";
		}

		$html .= "		</section>\n";
	}

	$html .= "	</div>\n";
}

$document .= "	<style>\n";

$document .= $css;

$document .= "	</style>
</head>

<body>
	<h1>Тест</h1>
	<div id=\"stats\">Ожидается статистика… (включите <span lang=\"en-US\">JavaScript</span>!)</div>
";

$document .= $html;

$document .= "	<script>
		window.onload = function() {
			var \$processDuration = (new Date()).getTime() - \$startTime;
			var \$totalElements = document.getElementsByTagName('*').length;
			var \$totalParagraphs = document.getElementsByTagName('p').length;
			document.getElementById('stats').innerHTML = 'Миллисекунд: ' + \$processDuration + ', элементов: ' + \$totalElements + ', абзацев: ' + \$totalParagraphs;
		}
	</script>
</body>

</html>
";

print $document;
