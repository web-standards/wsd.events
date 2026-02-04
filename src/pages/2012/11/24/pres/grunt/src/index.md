# Grunt: система сборки для фронтенд-разработчиков
		
[Артём Сапегин](http://sapegin.ru) ([@sapegin](https://twitter.com/sapegin), [artem@sapegin.ru](mailto:artem@sapegin.ru))


!SLIDE #Cover shout cover

## Grunt
### Система сборки для фронтенд-разработчиков

Web Standards Days, 24 ноября 2012 г., Москва

![Grunt](pictures/grunt.png)


!SLIDE #About

## Артём Сапегин

- JavaScript-программист в Badoo.
- Использую Grunt с начала года.
- Во всех проектах.
- Пишу плагины для Grunt.

![Артём Сапегин](pictures/me.jpg)


!SLIDE

## Системы сборки

Автоматизируют подготовку проекта к боевому окружению:

- cклеивают и минифицируют файлы;
- запускают препроцессоры и компиляторы;
- оптимизируют изображения;
- и т. д.


!SLIDE shout

## Зачем нам это нужно?


!SLIDE #Programmers cover

## Пусть серверные программисты во всём разбираются!

![](pictures/programmer.jpg)


!SLIDE

## Зачем нам это нужно?

Сборка JS, CSS, картинок и прочего фронтенда — забота технолога.


!SLIDE shout

## Почему Grunt?

	
!SLIDE smallcode

## Ant

```xml
<project name="Grunt vs. Ant" default="min" basedir=".">
	<property name="JS" value="src/*.js" />
	<property name="BUILD" value="build/scripts.js" />
	<property name="BUILD_MIN" value="build/scripts.min.js" />
	<@@target name="concatenate"@@ description="Concatenate JavaScript files">
		<echo message="Concatenation..."/>
		<@@concat@@ destfile="${BUILD}">
			<fileset dir="." includes="${JS}"/>
		</concat>
	</target>
	<@@target name="min"@@ depends="concatenate" description="Minify JS...">
		<echo message="Minification..."/>
		<@@exec executable="uglifyjs"@@>
			<arg line="-o ${BUILD_MIN} ${BUILD}"/>
		</exec>
	</target>
</project>
```


!SLIDE

## Ant

- XML.
- Развесистый.
- Есть встроенные задачи.
- Но их очень мало для фронтенда.


!SLIDE smallcode

## Make

```makefile
JS = src/*.js
BUILD = ./build/scripts.js
BUILD_MIN = ./build/scripts.min.js

@@all@@: min

@@concat@@:
	mkdir -p `dirname $(BUILD)`
	cat $(JS) > $(BUILD)

@@min@@: concat
	uglifyjs -o $(BUILD_MIN) $(BUILD)
```


!SLIDE

## Make

- Краткий.
- Нужно уметь писать shell-скрипты.
- Нужно уметь пользоваться утилитами Unix.
- Сложность быстро растёт.


!SLIDE smallcode

## Grunt

```javascript
module.exports = function(grunt) {
	grunt.initConfig({
		@@concat@@: {
			main: {
				src: 'src/*.js',
				dest: 'build/scripts.js'
			}
		},
		@@min@@: {
			main: {
				src: '<%= concat.main.dest %>',
				dest: 'build/scripts.min.js'
			}
		}
	});
	grunt.registerTask('@@default@@', 'concat min');
};
```


!SLIDE

## Grunt

- Привычный язык: JS/Node.
- Конфигурация отделена от реализациии.
- Множество готовых задач.
- Заточен на фронтенд.
- Легко расширяется.


!SLIDE

## Встроенные задачи

- **concat** — склеивание файлов;
-? **min** — минификация JS (UglifyJS);
-? **lint** — проверка JS (JSHint);
-? **qunit** — запуск тестов (QUnit);
-? **watch** — отслеживание изменений в файлах;
-? **server** — простой веб-сервер для статики;
-? **init** — инициализация проектов по шаблонам.


!SLIDE

## Дополнительные задачи (плагины)

- CSS-препроцессоры (SASS, LESS, Stylus).
-? Тестовые фреймворки (Mocha, Jasmin, CasperJS).
-? Оптимизация изображений.
-? Создание архивов.
-? И более 230 плагинов на [gruntjs.com](http://gruntjs.com/).


!SLIDE

## Мои плагины

- [stylus](https://github.com/sapegin/grunt-stylus).
-? [shower-markdown](https://github.com/sapegin/grunt-shower-markdown).
-? [imgo](https://github.com/sapegin/grunt-imgo).
-? [fingerprint](https://github.com/sapegin/grunt-fingerprint).
-? [sweet](https://github.com/sapegin/grunt-sweet).


-? [SublimeGruntWatch](https://github.com/sapegin/SublimeGruntWatch) (очень альфа).


!SLIDE cover

## Кто использует

![](pictures/logotypes.png)


!SLIDE

## Установка

Сначала [Node.js](http://nodejs.org/), потом:

```
$ npm install grunt -g
```


!SLIDE

## Gruntfile: grunt.js

```javascript
module.exports = function(grunt) {
	grunt.initConfig({
		/* ... */
	});
};
```


!SLIDE

## Задачи

```javascript
module.exports = function(grunt) {
	grunt.initConfig({
		@@concat: {@@
		@@}@@
	});
	grunt.registerTask('@@default@@', 'concat');
};
```


!SLIDE

## Подзадачи (multi task)

```javascript
concat: {
	@@main: {@@
	@@}@@,
	@@second: {@@
	@@}@@
}
```


!SLIDE

## Параметры задачи

```javascript
concat: {
	main: {
		@@src: 'js/*.js',@@
		@@dest: 'build/scripts.js'@@
	}
}
```


!SLIDE

## Списки файлов

```javascript
'js/main.js'
[ 'js/utils.js', 'js/main.js' ]
[ 'js/libs/*.js', 'js/mylibs/**/*.js' ]
```

`*` — любые символы.<br>`/**/` — папка любой вложенности.


!SLIDE

## Шаблоны

Шаблонизатор из [Underscore](http://underscorejs.org/#template).

```
<%= concat.main.dest %>
<%= grunt.template.today("m-d-yyyy") %>
```


!SLIDE

## Шаблоны

```javascript
@@concat@@: { @@main@@: {
	src: [ 'js/utils.js', 'js/main.js' ],
	@@dest@@: 'build/scripts.js'
}},
min: { main: {
	src: '@@<%= @@@concat.main.dest@@@ %>@@',
	dst: 'build.@@<%= grunt.template.today("m-d-yyyy") %>@@.js'
}}
```


!SLIDE

## Банеры

```javascript
meta: {
	@@banner: '/* © Ivan Pupkin */'@@
},
min: { main: {
	src: [ '@@<banner>@@', 'build/build.js' ], ...
}}
```


!SLIDE

## Подключение плагинов

```
$ npm install grunt-stylus
```


!SLIDE

## Подключение плагинов

```javascript
module.exports = function(grunt) {
	grunt.initConfig({
		@@stylus@@: { ... }
	});
	@@grunt.loadNpmTasks('grunt-stylus');@@
	grunt.registerTask('default', '@@stylus@@');
};
```


!SLIDE

## Запуск

```
$ grunt
$ grunt concat
$ grunt concat:main

$ grunt --debug

$ grunt.cmd  # Windows :-)
```


!SLIDE nonumber

## Конфигурации

```javascript
	concat: { main: { ... dest: '@@build/scripts.js@@' }},
	min: { main: { src: '@@<%= concat.main.dest %>@@',
	               dest: '@@<%= concat.main.dest %>@@' }}
	...
	grunt.registerTask('@@default@@', 'concat min');
	grunt.registerTask('@@debug@@', 'concat');
```

`$ grunt` или `$ grunt debug --debug`

!SLIDE

## Собственные задачи

Будем запускать из Гранта [imgo](https://github.com/imgo/imgo) —<br>консольный оптимизатор веб-графики.

См. также [grunt-imgo](https://github.com/sapegin/grunt-imgo), [grunt-exec](https://github.com/jharding/grunt-exec).



!SLIDE

## Конфиг

```javascript
imgo: {
	images: {
		files: 'images/**'
	}
}
```


!SLIDE

## Задача

```javascript
grunt.registerMultiTask('imgo', '…', function() {
	// @@this.data.files@@ ===
	//   @@<%= imgo.images.files %>@@
});
```


!SLIDE

## Цикл по исходным файлам

```javascript
var done = this.async();
var files = grunt.file.expandFiles(this.data.files);
grunt.utils.async.forEach(files,
	function(file, next) {
		// @@Обрабатываем каждый файл@@
	}
, done);
```


!SLIDE

## Обработка файла

```javascript
function(file, next) {
	grunt.utils.spawn({
		cmd: 'imgo',
		args: [file]
	}, next);
}
```


!SLIDE

## Использование

```javascript
module.exports = function(grunt) {
	grunt.initConfig({
		imgo: {...}
	});
	grunt.registerMultiTask('imgo', ...);
	grunt.registerTask('default', 'imgo');
};
```


!SLIDE

## grunt watch

```javascript
concat: { main: {
	src: [ 'js/utils.js', 'js/main.js' ],
	dest: 'build/scripts.js' }},
@@watch@@: { concat: {
	files: '@@<%= concat.main.src %>@@',
	tasks: '@@concat@@' }}
```


!SLIDE

## grunt server

```javascript
server: {
	port: 8000,
	base: '.'
}
```

`$ grunt server watch` → http://localhost:8000/


!SLIDE

## grunt init

Упрощает инициализацию проектов и отдельных файлов (scaffolding).

- Создание файлов и структуры папок.
- Шаблоны.
- Таблица переименования файлов.
- Вопросы пользователю.
- gruntfile, jquery, node + [всё, что придумаете](https://github.com/sapegin/squirrelstrap).


!SLIDE treeout

## grunt init

```
$ grunt init:node
...
$ tree
.
├── LICENSE-MIT
├── README.md
├── grunt.js
├── lib
│   └── grunt-init-node-sample.js
├── package.json
└── test
    └── grunt-init-node-sample_test.js
```


!SLIDE shout

## Реальный мир


!SLIDE smallestcode

```javascript
...
<script type="text/javascript" src="/Content/js/lib/modernizr.js"></script>       
<script type="text/javascript" src="/Content/js/lib/jquery.js"></script>
<script type="text/javascript" src="/Content/js/lib/json.js"></script>
<script type="text/javascript" src="/Content/js/lib/jquery.selectBox.js"></script>
<script type="text/javascript" src="/Content/js/lib/jquery.fader.js"></script>
<script type="text/javascript" src="/Content/js/lib/jquery.jscrollpane.js"></script>
<script type="text/javascript" src="/Content/js/util.js"></script>
<script type="text/javascript" src="/Content/js/articul/tools.js"></script> 
<script type="text/javascript" src="/Content/js/articul/nav-primary.js"></script>
<script type="text/javascript" src="/Content/js/articul/gallerysis.js"></script>
<script type="text/javascript" src="/Content/js/storejs/store_json2.min.js"></script> 
<script type="text/javascript" src="/Content/js/swfobject/swfobject.js"></script>    
<script type="text/javascript" src="/Content/js/form.js"></script>
<script type="text/javascript" src="/Content/js/articul/widgets/widgets.js"></script>
<script type="text/javascript" src="/Content/js/articul/accessibility.js"></script>
<script type="text/javascript" src="/Content/js/adriver/adriver.core.2.js"></script>
<script type="text/javascript" src='/Content/js/accessibility_sensitive.js'></script>
<script type="text/javascript" src="/Content/js/articul/announce.js" ></script>
<script type="text/javascript" src="/Content/js/lib/countdown.js" ></script>
<script type="text/javascript" src="/bitrix/components2/Articul.Sochi.Components/VideoBlockHomepageComponent/templates/.default/videoblock.js" ></script>
<script type="text/javascript" src="/Content/js/util.js" ></script>
<script type="text/javascript" src="/bitrix/components2/Articul.Sochi.Components/QuoteBlockHomepageComponent/templates/.default/script.js" ></script>
<script type="text/javascript" src="/bitrix/components2/Articul.Sochi.Objects/MapHomepageComponent/templates/.default/script.js" ></script>
<script type="text/javascript" src="/Content/js/lib/hammer.js" ></script>
<script type="text/javascript" src="/Content/js/lib/jquery.specialevent.hammer.js" ></script>
<script type="text/javascript" src="/Content/js/articul/event-scroller.js" ></script>
<script type="text/javascript" src="/Content/js/lib/jquery.jscrollpane.js" ></script>
<script type="text/javascript" src="/Content/js/lib/jquery.mousewheel.js" ></script>
<script type="text/javascript" src="/bitrix/components2/Articul.Sochi.Twitter/TweetListComponent/templates/.default/script.js" ></script>
<script type="text/javascript" src="/Content/js/articul/blogs.js" ></script>
<script type="text/javascript" src="/Content/js/image-centered.js" ></script>
<script type="text/javascript" src="/Content/js/articul/storage.js" ></script>
<script type="text/javascript" src="/Content/js/articul/polls.js" ></script>
<script type="text/javascript" src="/bitrix/components2/Articul.Sochi.Components/InterestingBlockHomepageComponent/templates/.default/script.js" ></script>
...
```


!SLIDE

Главная страница реального проекта.

- 39 JS-файлов
- 5 CSS-файлов


!SLIDE #Suffering cover

## Не надо так!

![](pictures/pussinboots.jpg)


!SLIDE shout

## Grunt поможет


!SLIDE nonumber

## JavaScript: concat

```javascript
concat: { main: {
		src: [
			'Content/js/lib/modernizr.js',
			'Content/js/lib/jquery.js',
			'Content/js/articul/**/*.js', ...
		],
		dest: 'build/scripts.js'
} }
```


!SLIDE

## JavaScript: min

```javascript
min: {
	main: {
		src: [ '@@<%= concat.main.dest %>@@' ],
		dest: 'build/scripts.min.js'
	}
}
```


!SLIDE

## CSS

```javascript
concat: { main: {
		src: [
			'Content/css/main.css',
			'Content/css/articul/pit.css', ...
		],
		dest: 'build/styles.css'
} }
```


!SLIDE

## HTML

```html
...
<link rel="stylesheet" href="/build/styles.css">
<script src="/build/scripts.js"></script>
...
```


!SLIDE #Happiness cover

<div class="guy" id="guy_frontenddev">Технолог</div>
<div class="guy" id="guy_user">Пользователь</div>
<div class="guy" id="guy_backenddev">Серверный программист</div>
<div class="guy" id="guy_designer">Дизайнер</div>
<div class="guy" id="guy_client">Заказчик</div>

![](pictures/happiness.jpg)


!SLIDE

- [@sapegin](https://twitter.com/sapegin)
- [sapegin.ru](http://sapegin.ru)
- [artem@sapegin.ru](mailto:artem@sapegin.ru)


Презентация: [sapegin.ru/pres/grunt](http://sapegin.ru/pres/grunt/)<br>
Примеры: [github.com/sapegin/grunt-talk-examples](https://github.com/sapegin/grunt-talk-examples)