// import * as helpers from '../tools/ParseHelpers';
const {
    parsePoint,
    checkCommonEntityProperties
} = require('../tools');

// export default class Solid {
class Solid {
    constructor() {
        this.ForEntityName = 'SOLID';
    }
    parseEntity(scanner, curr) {
        const entity = { type: curr.value, points: [] };
        curr = scanner.next();
        while (!scanner.isEOF()) {
            if (curr.code === 0)
                break;
            switch (curr.code) {
                case 10:
                    // entity.points[0] = helpers.parsePoint(scanner);
                    entity.points[0] = parsePoint(scanner);
                    break;
                case 11:
                    // entity.points[1] = helpers.parsePoint(scanner);
                    entity.points[1] = parsePoint(scanner);
                    break;
                case 12:
                    // entity.points[2] = helpers.parsePoint(scanner);
                    entity.points[2] = parsePoint(scanner);
                    break;
                case 13:
                    // entity.points[3] = helpers.parsePoint(scanner);
                    entity.points[3] = parsePoint(scanner);
                    break;
                case 210:
                    // entity.extrusionDirection = helpers.parsePoint(scanner);
                    entity.extrusionDirection = parsePoint(scanner);
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
    Solid
};
