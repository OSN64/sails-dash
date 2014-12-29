/**
* System.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    uptime : { type: 'string' },

    loadavg : { type: 'array' },

    freemem : { type: 'integer' },

    cpus : { type: 'json' }
  }
};

