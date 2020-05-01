(function () {
  "use strict";

  var jamesAuth = angular.module("jamesAuth", ["ui.router", "ngCookies"]);

  // Static data constant.
  var staticData = {};

  /*
    var userRoles = staticData.userRoles = {
        guest: 1,
        user: 2,
        admin: 4
    };

    staticData.accessLevels = {
        guest: userRoles.guest | userRoles.user | userRoles.admin,
        user: userRoles.user | userRoles.admin,
        admin: userRoles.admin
    };*/

  jamesAuth.constant("staticData", staticData);

  // Config block.
  jamesAuth.config([
    "$stateProvider",
    "$urlRouterProvider",
    "$httpProvider",
    "$locationProvider",
    "staticData",
    authConfig,
  ]);

  function authConfig(
    $stateProvider,
    $urlRouterProvider,
    $httpProvider,
    $locationProvider,
    staticData
  ) {
    // Index route
    $stateProvider.state("index", {
      url: "/",
      templateUrl: "app/views/partials/partial-index.html",
    });

    $locationProvider.html5Mode(true);
  }
})();
