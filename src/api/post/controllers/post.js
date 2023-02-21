'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  /**  We create a function with the strapi object parameter which returns an object of all actions 
   an exampleActions is a custom action which takes the context and set the body to ok
   And because it is a custom controller, it is actached to a custom route , since core routes don't attached this custom controller actions 
   
   So this is a custom action which takes the context and it just sets the body to, okay, I want to activate somehow this action.
   Of course an action must be tied to a route.And because the core routes don't include this action, of course we usually attach custom actions to
   
   Each action aside from the parent strapi Object also recieves the ctx object*/
   
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },

  // Method 2: Wrapping a core action (leaves core logic in place)
  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: 'en' };

    // Calling the default core action , extending the core find
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    meta.date = Date.now();
    console.log(ctx.query)
    return { data, meta };
  },

  // Method 3: Replacing a core action
  async findOne(ctx) { '/posts/:id /posts/1?....'
    const { id } = ctx.params; //gets the id parameter
    const { query } = ctx; // gets the query strings

  /** controller leverages services from the strapi object and use the findOne service in the post API */
    const entity = await strapi.service('api::post.post').findOne(id, query); 
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));

