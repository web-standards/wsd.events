# NPM

* Появился где-то в 2010 году
* С ноября 2011 — встроен в инсталлер Nodejs
* npm --version 1.2.24

## Установка
* Ставим node c nodejs.org — получаем npm
* Обновление: `sudo npm update npm`

## Основные команды (из 96)
* install
* isntall
* update
* uninstall
* list

## Изменить node_modules
** Нельзя. Feature by design
** Симлинки

## Конфигурация окружения
~/.npmrc
registry

## Реестр
http://registry.npmjs.org
** Иногда лежит
** Есть решения: https://gist.github.com/streunerlein/3331671
** Можно поднять свой

## Управление зависимостями проекта
package.json
* name
* version
* repository

Это json со всеми достоинствами и недостатками
Для публикации нужно заполнять больше полей

## dependencies
```{ "dependencies" :
  { "foo" : "1.0.0 - 2.9999.9999"
  , "bar" : ">=1.0.2 <2.1.2"
  , "baz" : ">1.0.2 <=2.3.4"
  , "boo" : "2.0.1"
  , "qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0"
  , "asd" : "http://asdf.com/asdf.tar.gz"
  , "til" : "~1.2"
  , "elf" : "~1.2.3"
  , "two" : "2.x"
  , "thr" : "3.3.x"
  }
}```

git://github.com/user/project.git#commit-ish
git+ssh://user@hostname:project.git#commit-ish
git+ssh://user@hostname/project.git#commit-ish
git+http://user@hostname/project/blah.git#commit-ish
git+https://user@hostname/project/blah.git#commit-ish