module.exports = [
  {
    method: 'GET',
    path: '/repos',//github-projects/repos
    handler: 'gitHubController.index',
    config: {
      policies: [],
      auth:false //Change this later to allow only authenticated users to have access
    },
  },
];
