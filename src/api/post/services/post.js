'use strict';

/**
 * post service
 */

const { createCoreService } = require('@strapi/strapi').factories;
/**
 * Services are resuable functions whose purpose are to simplify controller logic
 * and perform specific generic task. It promotes the concepts of DRY principle.
 * By default created for each strapi API , however they can be generated or added manually and
 * existing ones can be extended.
 * To manually create a service, export a factory function that returns the service implementation(an object with methods).
 * This factory function receives the strapi instance.
 */
module.exports = createCoreService('api::post.post',({ strapi }) =>  ({
  // Method 1: Creating an entirely new custom service
  async exampleService(...args) {//array of arguments passed
    console.log('I was called',args)
    let response = { okay: true }

    if (response.okay === false) {
      return { response, error: true }
    }

    return response
  },

  // Method 2: Wrapping a core service (leaves core logic in place)
  async find(...args) {  
    // Calling the default core controller
    const { results, pagination } = await super.find(...args);

    // some custom logic
    results.forEach(result => {
      result.counter = 1;
    });

    return { results, pagination };
  },

  // Method 3: Replacing a core service
  async findOne(entityId, params = {}) {
    return strapi.entityService.findOne('api::post.post', entityId, this.getFetchParams(params));
  },

  async findPremium(args){
    const newQuery={
      ...args,
      filters:{
        ...args.filters,
        premium:false
      }
    }
    return strapi.entityService.findMany('api::post.post', this.getFetchParams(newQuery))
  },
  async findOneIfPremium(args){
    let {id, query}=args;
    const post = await strapi.entityService.findOne('api::post.post', id, this.getFetchParams(query))
    return post.premium ?  post : null
 
  },

  async likePost(args){
    const {postId, userId,query}=args;
    //use the underlying entity service API to fetch the post and it's likedBy property
    const postToLike= await strapi.entityService.findOne("api::post.post", postId,{
      populate:['likedBy'] //note by default strapi does not include relations or complex dataStrutures, so we need to state it.
    })
    
    //use the underlying entity service API to update the current post with the new relation
    const updatedPost=await strapi.entityService.update("api::post.post",postId,{
      data:{
        likedBy:[...postToLike.likedBy,userId],
      },
      ...query //include all the query params that are included like populating some specific fields
    })
    return updatedPost
  }

}));

/** Request sent through strap are handled by routes and these routes are generated by default for all content types */

/**
 * Entity services and Query Engine API
 * https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service-api.html
 * https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine-api.html
 * Entity Service API vs. Query Engine API

Strapi v4 offers several layers to interact with the backend and build your queries:

The Entity Service API is the recommended API to interact with your application's database. The Entity Service is the layer that handles Strapi's complex data structures like components and dynamic zones, which the lower-level layers are not aware of.
The Query Engine API interacts with the database layer at a lower level and is used under the hood to execute database queries. It gives unrestricted internal access to the database layer, but should be used only if the Entity Service API does not cover your use case.
If you need direct access to knex functions, use strapi.db.connection.
*/