'use strict';

/**
 * `check-role` policy
 */

module.exports = (policyContext, config, { strapi }) => {
    // Add your own logic here.
    /** policyContext: This is a wrapper controller context. It includes the information data eg about user
     * Config return configuration added to the route calling this function
     * strapi the entire strapi object is return to help with code resue and modurality
     */ 
    strapi.log.info('In authentication policy.');
    const { userRole }= config;
    const isEligible = policyContext.state.user && policyContext.state.user.name == userRole
    if(isEligible){
      return true
    }
    return false;
};
//before this can be used you need to attach it to existing route