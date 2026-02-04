# Volo

* Январь 2012 (на самом деле - раньше)
* Последняя версия 0.2.10
* James Burke — автор RequireJS
* Больше, чем менеджер зависимостей
* Базируется на поиске по гитхабу
* Расширяет package.json от nom

## Установка 

$ npm install -g volo

## Команды

* add
* amdify
* create
* info
* install
* search
* remove (не работает)

## Установка

* Можно выбирать место установки
* Устанавливается минимум
* Что установлено - смотри в package.json

## Источники пакетов

* Github search
** searchterm
** searchterm/version
** user/repo
** user/repo/tag
** user/repo/semverVersion
** user/repo/tag#specific/file.js
** user/repo/tag#specific/dir
* http://some.domain.com/path/to/archive.zip
* http://some.domain.com/path/to/archive.zip#specific/file.js: 
* symlink:path/to/directory/or/file.js
* local:path/to/directory

## Мета-данные пакета
{
    "amd": {},
    "volo": {
        "baseUrl": "",
        "url": "",
        "dependencies": {},
        "type": "",
        "ignore": []
    }
}