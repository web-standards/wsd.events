# Test

1. Ставим backbone и jquery. Проверяем тащится ли underscore
2. Записываем в dependencies старую версию underscore и проверяем, что будет
3. Попытка удаления underscore

## NPM

* backbone — ok
* jquery — 1.8.2, гора зависимостей, включая xCode
* components/jquery — ok

* Ставит как отдельную подзависимость

* Зависит от способа установки. Если ставили underscore, потом backbone — удаляет а дальше падает на любой команде

## Volo

* backbone — тащит за собой ещ	ё и jquery-2.0.2, что опасно

* Ругается на несоответствие зависимостей

* не имеет смысла

## bower

* backbone — underscore нет
* components/backbone — ok

* уведомляет о возможном конфликте

* Просто так не даёт, только --force