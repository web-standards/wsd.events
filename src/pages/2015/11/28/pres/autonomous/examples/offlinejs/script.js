"use strict";
(function() {

    /**
     * Класс показывающий то, как обрабатывается переход пользователя в offline
     * @class
     */
    class DeferedDelivery {

        /**
         * Назначаем обработчики событий
         * @constructor
         */
        constructor () {

            Offline.options = {
                checks: {xhr: {url: 'http://frontender.info/favicon.ico'}},
                checkOnLoad: true,
                interceptRequests: true,
                requests: true,
                reconnect: {
                    initialDelay: 3,
                    delay: 3
                }
            };

            Offline.on('up', this.goUp, this);
            Offline.on('down', this.goDown, this);
            Offline.on('checking', this.checking, this);

            this.form = document.querySelector('.messanger');
            this.form.addEventListener('submit', this.sendData.bind(this));
            this.input = this.form.querySelector('.messanger__input');
        }

        /**
         * Выводим информацию о том, что проверено состояние соединения
         * и какой результат проверки.
         */
        checking () {
            console.log('Проверяем соединение. Текущее состояние: ', Offline.state);
        }

        /**
         * Выводим информацию о том, что соединение установлено
         */
        goUp () {
            console.log('Соединение установлено');
        }

        /**
         * Выводим информацию о том, что соединение потеряно
         */
        goDown () {
            console.log('Соединение потеряно');
        }

        /**
         * Отправка формы AJAX'ом
         * @param event {DOM Event} событие, блокируем действие по умолчанию, что бы избежать перезагрузки проекта
         */
        sendData (event) {
            event.preventDefault();

            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://frontender.info/action/add/');
            xhr.send(new FormData(this.form));
        }
    }

    let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
    });

    ready.then(() => {
        new DeferedDelivery;
    });

})();
