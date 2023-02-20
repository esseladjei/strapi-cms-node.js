module.exports = () => {
  return async (ctx, next) => {
    const start = Date.now();

    await next();

    const delta = Math.ceil(Date.now() - start);
    ctx.set('X-Response-Time', delta + 'ms');
  };
};
/** This middleware must now be added to the config middleware array 
 *  The scope must be specified and the name must be specifed.Usually the name 
 * is the filename
 * eg: global::timer-header as a global middleware
 * 
*/