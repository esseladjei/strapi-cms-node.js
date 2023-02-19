module.exports={
  routes:[
    {
      method:"GET",
      path:"/post/example",
      handler:"post.findByName",
      config:{
        //some configuration
      }
    }
  ]
}