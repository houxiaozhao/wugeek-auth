'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 需要认证的接口，添加can
  const can = app.middleware.can();

  router.get('/', controller.home.index);
  router.post('/api/auth/signup', controller.auth.signup);
  router.post('/api/auth/login', controller.auth.login);

  router.resources('api', '/api/apis', can, controller.api);
  router.resources(
    'permission',
    '/api/permissions',
    can,
    controller.permission
  );
  router.resources('role', '/api/roles', can, controller.role);
  router.resources('user', '/api/users', can, controller.user);
};
