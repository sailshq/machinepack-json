module.exports = {


  friendlyName: 'Parse JSON string',


  description: 'Parse data from a JSON-encoded string.',


  extendedDescription: '',


  sync: true,


  cacheable: true,


  inputs: {

    json: {
      friendlyName: 'JSON string',
      description: 'The JSON string to parse',
      example: '...{"some json": "like this"}...',
      required: true
    },

    schema: {
      friendlyName: 'Expected schema',
      description: 'A representative example of what the resulting data should look like.',
      example: '*'
    }

  },


  exits: {

    couldNotParse: {
      friendlyName: 'could not parse',
      description: 'Could not parse provided string- must be a valid JSON string.',
      extendedDescription: 'Oftentimes this error is a result of not using double-quotes.  Refer to the official JSON specification at http://www.json.org/ for more information.'
    },

    success: {
      friendlyName: 'then',
      description: 'Done.',
      like: 'schema'
    }

  },


  fn: function(inputs, exits) {
    var rttc = require('rttc');

    // If `schema` is set, coerce it to make sure it's a proper exemplar.
    if (!_.isUndefined(inputs.schema)) {
      inputs.schema = rttc.coerceExemplar(inputs.schema);
    }

    var parsedJson;
    try {
      parsedJson = JSON.parse(inputs.json);
    }
    catch (e){
      return exits.couldNotParse(e);
    }
    return exits.success(parsedJson);
  }

};
