// import * as helpers from '../tools/ParseHelpers';
const {
    parsePoint,
    checkCommonEntityProperties
} = require('../tools');

// export default class Line {
class Line {
    constructor() {
        this.ForEntityName = 'LINE';
    }
    parseEntity(scanner, curr) {
        const entity = { type: curr.value, vertices: [] };
        curr = scanner.next();
        while (!scanner.isEOF()) {
            if (curr.code === 0)
                break;
            switch (curr.code) {
                case 10: // X coordinate of point
                    // entity.vertices.unshift(helpers.parsePoint(scanner));
                    entity.vertices.unshift(parsePoint(scanner));
                    break;
                case 11:
                    // entity.vertices.push(helpers.parsePoint(scanner));
                    entity.vertices.push(parsePoint(scanner));
                    break;
                case 210:
                    // entity.extrusionDirection = helpers.parsePoint(scanner);
                    entity.extrusionDirection = parsePoint(scanner);
                    break;
                case 100:
                    break;
                default:
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
    Line
};
