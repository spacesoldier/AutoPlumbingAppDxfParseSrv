'use strict'

const {
    checkCommonEntityProperties,
    getAcadColor,
    parsePoint
} = require('./parse-helpers');

const {AUTO_CAD_COLOR_INDEX} = require('./autocad-color-index');

module.exports = {
    checkCommonEntityProperties,
    getAcadColor,
    parsePoint,
    AUTO_CAD_COLOR_INDEX
}