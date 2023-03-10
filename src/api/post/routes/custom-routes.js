module.exports={
  routes:[
     {
      method:"GET",
      path:"/posts/example",
      handler:"api::post.post.exampleAction",
      config:{
        //some configuration
      }
    },
    {
      method:"GET",
      path:"/posts/getonepremium/:id",
      handler:"api::post.post.findOnePremium",
      config:{
        auth:false
      }
    },
     {
      method: "PUT",
      path:"/posts/:id/like",
      handler:"api::post.post.likePost"
     }
  ]
} 