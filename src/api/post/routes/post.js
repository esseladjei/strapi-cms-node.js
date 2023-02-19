'use strict';

/**
 * post router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::post.post'/** This is a way to customise a core route */,{
  prefix:'', //tags => /test/tags
  only:[] ,// allows you to specify which methods you want to include
  except:['create'],
  config:{
    find:{
      auth:false,// setting it to false, disables the strapi JWT auth system for this route
      policies:[], //can be added to the route to which are added to the default policies 
      middleware:[]// middleware can be added to the routes to perform special functions
    },
    findOne:{},
    create:{},
    update:{},
    delete:{}
  }
});
