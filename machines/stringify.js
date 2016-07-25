module.exports = {


  friendlyName: 'Stringify as JSON',


  description: 'Encode the specified value into a JSON string.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    value: {
      friendlyName: 'Data',
      description: 'The data to encode as a JSON string.',
      example: '*',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'JSON string',
      outputDescription: 'The resulting JSON from stringifying from stringifying the input.',
      outputExample: '{"some stringified json": "like this"}',
    },

    couldNotStringify: {
      description: 'Could not stringify provided value into a JSON string.',
      extendedDescription: 'Oftentimes this error results from attempting to stringify a circular object (i.e. has a key or array item which points back to the parent object).  Refer to the official JSON specification at http://www.json.org/ for more information.'
    },


  },


  fn: function(inputs, exits) {
    var jsonString;
    try {
      jsonString = JSON.stringify(inputs.value);
    }
    catch (e){
      return exits.couldNotStringify(e);
    }
    return exits.success(jsonString);
  }

};
