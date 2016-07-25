module.exports = {


  friendlyName: 'Parse JSON string',


  description: 'Parse data from a JSON-encoded string.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    json: {
      friendlyName: 'JSON string',
      description: 'The JSON string to parse.',
      example: '{"some json": "like this"}',
      required: true
    },

    schema: {
      friendlyName: 'Expected schema',
      description: 'A representative example (RTTC exemplar) of what the resulting data should look like.',
      moreInfoUrl: 'http://github.com/node-machine/rttc',
      example: '*',
      isExemplar: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Parsed JSON',
      outputDescription: 'The resulting Javascript object, array or literal from parsing the input string.',
      like: 'schema'
    },

    couldNotParse: {
      description: 'Could not parse provided string- must be a valid JSON string.',
      extendedDescription: 'Oftentimes this error is a result of not using double-quotes.  Refer to the official JSON specification at http://www.json.org/ for more information.'
    },


  },


  fn: function(inputs, exits) {

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
