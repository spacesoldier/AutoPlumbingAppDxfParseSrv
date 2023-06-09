// import * as helpers from '../tools/ParseHelpers';
const {
    parsePoint,
    checkCommonEntityProperties
} = require('../tools');

// export default class Dimension {
class Dimension {
    constructor() {
        this.ForEntityName = 'DIMENSION';
    }
    parseEntity(scanner, curr) {
        const entity = { type: curr.value };
        curr = scanner.next();
        while (!scanner.isEOF()) {
            if (curr.code === 0)
                break;
            switch (curr.code) {
                case 2: // Referenced block name
                    entity.block = curr.value;
                    break;
                case 10: // X coordinate of 'first alignment point'
                    // entity.anchorPoint = helpers.parsePoint(scanner);
                    entity.anchorPoint = parsePoint(scanner);
                    break;
                case 11:
                    // entity.middleOfText = helpers.parsePoint(scanner);
                    entity.middleOfText = parsePoint(scanner);
                    break;
                case 12: // Insertion point for clones of a dimension
                    // entity.insertionPoint = helpers.parsePoint(scanner);
                    entity.insertionPoint = parsePoint(scanner);
                    break;
                case 13: // Definition point for linear and angular dimensions 
                    // entity.linearOrAngularPoint1 = helpers.parsePoint(scanner);
                    entity.linearOrAngularPoint1 = parsePoint(scanner);
                    break;
                case 14: // Definition point for linear and angular dimensions 
                    // entity.linearOrAngularPoint2 = helpers.parsePoint(scanner);
                    entity.linearOrAngularPoint2 = parsePoint(scanner);
                    break;
                case 15: // Definition point for diameter, radius, and angular dimensions
                    // entity.diameterOrRadiusPoint = helpers.parsePoint(scanner);
                    entity.diameterOrRadiusPoint = parsePoint(scanner);
                    break;
                case 16: // Point defining dimension arc for angular dimensions
                    // entity.arcPoint = helpers.parsePoint(scanner);
                    entity.arcPoint = parsePoint(scanner);
                    break;
                case 70: // Dimension type
                    entity.dimensionType = curr.value;
                    break;
                case 71: // 5 = Middle center
                    entity.attachmentPoint = curr.value;
                    break;
                case 42: // Actual measurement
                    entity.actualMeasurement = curr.value;
                    break;
                case 1: // Text entered by user explicitly
                    entity.text = curr.value;
                    break;
                case 50: // Angle of rotated, horizontal, or vertical dimensions
                    entity.angle = curr.value;
                    break;
                default: // check common entity attributes
                    // helpers.checkCommonEntityProperties(entity, curr, scanner);
                    checkCommonEntityProperties(entity, curr, scanner);
                    break;
            }
            curr = scanner.next();
        }
        return entity;
    }
}

module.exports = {
    Dimension
};
