var structuredLog = require('structured-log');
var seqSink = require('../lib/structured-log-seq-sink');

'use strict';

const SEQ_URL = process.env.SEQ_URL || null;

if (SEQ_URL) {
    console.log('Enabling SEQ logging');
    var logger = structuredLog.configure()
    .writeTo(seqSink({
        url: SEQ_URL,
        compact: true
    }))
    .create();

    console.log('Seq logging is enabled');
    seqMessage({short_message: 'Seq logging is enabled', a: 1});
}

function seqMessage(msg) {
    if (!SEQ_URL) { return; }
    var shortMessage = msg.short_message || '<No message>';
    var fields = Object.assign({}, msg);
    delete fields.short_message;
    logger.enrich(fields).info(shortMessage);
}

module.exports.seqMessage = seqMessage;