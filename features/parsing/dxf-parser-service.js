'use strict'

const crypto = require('crypto');
const {loggerBuilder, logLevels} = require('starty');
const {DxfParser} = require('./parser-implementation');

const parser = new DxfParser();

const log = loggerBuilder()
                    .name('DXF parser')
                    .level(logLevels.INFO)
                .build();

/**
 *
 * @param {string} fileName
 * @param {string} fileContentStr
 * @returns {{name: string, content: {object}}}
 */
function parseDxfFile(fileName, fileContentStr){

    let parsedContent = {};

    if (fileContentStr !== undefined){
        try {
            parsedContent = parser.parseSync(fileContentStr);
        }catch(err) {
            return log.error(err.stack);
        }
        //parsedContent = parser.parseSync(fileContentStr);
    }

    return {
        name: fileName,
        content: parsedContent
    }
}

/**
 *
 * @param   {{  msgId:    string,
 *              request:  {headers: {object}},
 *              response: {object},
 *              payload:  {object}
 *          }} msg
 *
 * @returns {{  msgId:    string,
 *              request:  {headers: {object}},
 *              response: {headers:{object}},
 *              payload: {object}
 *          }} msg
 */
function receiveBase64DxfDrawing(msg){

    log.info(`received msg ${msg.msgId}`);

    let payloadJSON = {};

    if (msg.payload !== undefined){
        payloadJSON = JSON.parse(msg.payload);
    }

    if (payloadJSON.count !== undefined){
        log.info(`${msg.msgId}: will parse ${payloadJSON.count} drawing(s)`);
    }

    let parsedOutput = {
        batchId: msg.msgId,
        batchCount: payloadJSON.count,
        parsedDrawings: []
    }

    if (payloadJSON.files !== undefined && Array.isArray(payloadJSON.files)){
        let allFiles = payloadJSON.files;
        allFiles.forEach(
            dxfFile => {
                let fileName = dxfFile.name === undefined ? "noname" : dxfFile.name;
                let fileContentB64 = dxfFile.content;
                log.info(`${msg.msgId}: parsing ${dxfFile.name}`);

                let parsedFileContent = {name: fileName};

                if (fileContentB64 !== undefined){
                    let fileContent = Buffer.from(fileContentB64,'base64').toString('utf8');
                    parsedFileContent = parseDxfFile(fileName,fileContent);
                }

                parsedOutput.parsedDrawings.push(parsedFileContent);
            }
        )
    }

    msg.payload = JSON.stringify(parsedOutput);

    return msg;
}

module.exports = {
    receiveBase64DxfDrawing
}

