'use strict';

/**
 * @ngdoc service
 * @name tweadsApp.ModalService
 * @description
 * # ModalService
 * Factory in the tweadsApp.
 */
angular.module('tweadsApp')
  .factory('ModalService', function ($compile, $document, $rootScope) {
    // Service logic
    // ...

    var modal = null;

    function close() {
      if (modal === null) {
        return;
      }
      console.log('modalservice close');
      modal.element.children().closeModal({
        complete: destroy
      });
    }

    function destroy() {
      console.log('modalservice destroy');
      modal.scope.$destroy();
      modal.element.remove();

      modal = null;
    }

    function getOptions() {
      return modal.options;
    }
 
    function open(options) {
      if (modal !== null) {
        return;
      }
      modal = {
        options: options
      };

      var scope = $rootScope.$new(true);
      var element = $compile('<custom-modal></custom-modal>')(scope);
      console.log($document.find('body'));
      $document.find('body').append(element);

      modal.element = element;
      modal.scope = scope;
    }

    return {
      close: close,
      destroy: destroy,
      getOptions: getOptions,
      open: open
    };
  });