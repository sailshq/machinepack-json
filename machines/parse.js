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
      getExample: function (inputs, env){
        var _ = env._;

        // If we don't have a schema yet, the best we can do is send back "*"
        // to indicate that this machine will respond with something JSON-serializable.
        if (_.isUndefined(inputs.schema)) {
          return '*';
        }

        // Otherwise we can use the provided schema.
        return inputs.schema;
      }
    }

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
