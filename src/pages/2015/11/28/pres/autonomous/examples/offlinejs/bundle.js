(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {

    /**
     * Класс показывающий то, как обрабатывается переход пользователя в offline
     * @class
     */

    var DeferedDelivery = (function () {

        /**
         * Назначаем обработчики событий
         * @constructor
         */

        function DeferedDelivery() {
            _classCallCheck(this, DeferedDelivery);

            Offline.options = {
                checks: { xhr: { url: 'http://frontender.info/favicon.ico' } },
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

        _createClass(DeferedDelivery, [{
            key: 'checking',
            value: function checking() {
                console.log('Проверяем соединение. Текущее состояние: ', Offline.state);
            }

            /**
             * Выводим информацию о том, что соединение установлено
             */
        }, {
            key: 'goUp',
            value: function goUp() {
                console.log('Соединение установлено');
            }

            /**
             * Выводим информацию о том, что соединение потеряно
             */
        }, {
            key: 'goDown',
            value: function goDown() {
                console.log('Соединение потеряно');
            }

            /**
             * Отправка формы AJAX'ом
             * @param event {DOM Event} событие, блокируем действие по умолчанию, что бы избежать перезагрузки проекта
             */
        }, {
            key: 'sendData',
            value: function sendData(event) {
                event.preventDefault();

                var xhr = new XMLHttpRequest();
                xhr.open(this.form.getAttribute('method'), this.form.getAttribute('action') + '?message=' + encodeURIComponent(this.input.value));
                xhr.send();
            }
        }]);

        return DeferedDelivery;
    })();

    var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
            return resolve();
        });
    });

    ready.then(function () {
        new DeferedDelivery();
    });
})();

},{}]},{},[1]);
