// import * as helpers from '../tools/ParseHelpers';
const {
    parsePoint,
    checkCommonEntityProperties
} = require('../tools');

// export default class Point {
class Point {
    constructor() {
        this.ForEntityName = 'POINT';
    }
    parseEntity(scanner, curr) {
        const type = curr.value;
        const entity = { type };
        curr = scanner.next();
        while (!scanner.isEOF()) {
            if (curr.code === 0)
                break;
            switch (curr.code) {
                case 10:
                    // entity.position = helpers.parsePoint(scanner);
                    entity.position = parsePoint(scanner);
                    break;
                case 39:
                    entity.thickness = curr.value;
                    break;
                case 210:
                    // entity.extrusionDirection = helpers.parsePoint(scanner);
                    entity.extrusionDirection = parsePoint(scanner);
                    break;
                case 100:
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
    Point
};
