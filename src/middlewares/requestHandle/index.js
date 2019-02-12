module.exports = function() {
  return async (ctx, next) => {
    let method = ctx.method.toUpperCase();
    if (["GET", "DELETE"].includes(method)) {
      ctx.params = ctx.query;
    } else if (["POST", "PUT"].includes(method)) {
      ctx.params = ctx.request.body;
    }
    await next();
  };
};
