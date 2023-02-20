'use strict';

/**
 * post router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::post.post'/** This is a way to customise a core existing route */,{
  prefix:'', //tags => /test/post
  only:['find'] ,// allows you to specify which methods you want to include
  except:[],
  config:{
    find:{
      auth:false,// setting it to false, disables the strapi JWT auth system for this route
      policies:[{name:"check-role", config:{userRole:"Author"}}], //can be added to the route to which are added to the default policies 
      middleware:[]// middleware can be added to the routes to perform special functions
    },
    findOne:{},
    create:{},
    update:{},
    delete:{}
  }
});
