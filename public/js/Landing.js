/**
 * JQuery и babel-polyfill компилируются в вебпак, их подключать не нужно
 * Допступны импорты из es6, можно создавать модульный код
 * */

import 'slick-carousel'
import './slider.config.js'

import GoogleMap from './map.config.js'

$(document).ready(function () {
    GoogleMap('adressMap');
});