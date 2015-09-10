'use strict';

/**
 * @ngdoc directive
 * @name tweadsApp.directive:ModalDirective
 * @description
 * # ModalDirective
 */
angular.module('tweadsApp')
  .directive('customModal', function ($compile, $controller, $injector, $q, $templateRequest, ModalService) {

    var options = null;

    function create(scope, element) {
      var template = options.template;
      var templateUrl = options.templateUrl;

      if (angular.isUndefined(template)) {
        template = $templateRequest(templateUrl);
      }

      $q.when(template).then(function (template) {
        var html = $compile(template)(scope);
        element.append(html);

        html.openModal({
          complete: ModalService.destroy
        });
      });
    }

    function getDependencies() {
      var resolve = options.resolve;

      var promises = {};
      if (angular.isDefined(resolve)) {
        for (var key in resolve) {
          if (!resolve.hasOwnProperty(key)) {
            continue;
          }

          var value = resolve[key];

          var dependency;
          if (angular.isString(value)) {
            dependency = $injector.get(value);
          } else {
            dependency = $injector.invoke(value);
          }

          promises[key] = $q.when(dependency);
        }
      }

      return promises;
    }

    function link(scope, element) {
      options = ModalService.getOptions();

      var controller = options.controller;
      var controllerAs = options.controllerAs;

      if (angular.isDefined(controller)) {
        $q.all(getDependencies()).then(function (dependencies) {
          dependencies.$scope = scope;

          var instance = $controller(controller, dependencies);

          if (angular.isDefined(controllerAs)) {
            scope[controllerAs] = instance;
          }

          create(scope, element);
        });
      } else {
        create(scope, element);
      }
    }

    return {
      restrict: 'E',
      scope: {},
      link: link
    };
  });