'use strict';

angular.module('projectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/rate', {
        template: '<rate></rate>'
      });
  });
