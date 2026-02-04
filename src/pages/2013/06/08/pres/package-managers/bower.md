# Bower

* Изначально разрабатывался в Twitter
* Появился в сентябре 2012
* v.0.9.2
* Часть Yoman
* Не только JS

## Установка 

$ npm install -g bower

## Команды

* cache-clean
* help
* info
* init
* install
* list, ls
* lookup
* register
* search
* uninstall
* update

## Установка пакетов

* Место настраивается в .bowerrc
* Вытягивается целиком репозиторий

## Источники пакетов

* http://sindresorhus.com/bower-components/
* A name that maps to a package registered with Bower, e.g, jquery. ‡
* A remote Git endpoint, e.g., git://github.com/someone/some-package.git. Can be public or private. ‡
* A local Git endpoint, i.e., a folder that's a Git repository. ‡
* A shorthand endpoint, e.g., someone/some-package (defaults to GitHub). ‡
* A URL to a file, including zip and tar.gz files. It's contents will be extracted.

## Настройка проекта 

* bower.json (ранее — components.json)

* name (required)
* version
* main [string|array]
* ignore [array]
* dependencies [hash]
* devDependencies [hash]

