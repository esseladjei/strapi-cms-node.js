
/** 
 * using this approach is the declarative hook
 * You can use it to automate some process when strapi queries are called.
 * 
 * see docs  
 * https://docs.strapi.io/dev-docs/backend-customization/models#declarative-and-programmatic-usage
 * 
 */

module.exports ={
  beforeCreate: async ({params})=>{
    const adminUserId=params.data.createdBy
   console.log(`BeforeCreatedHook fired: ${adminUserId}`)
  },
  beforeDelete: async ({params})=>{
    const postId= params.where.id
    console.log(`BeforeDeleteHook fired: ${postId}`)

  }

}