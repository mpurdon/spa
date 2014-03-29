/*
 * SPA Shell Module
 */

spa.shell = (function() {
  //----- Module-Scoped Variables -----//
  var
      configMap = {
        mainHtml  : String()
            + '<div class="spa-shell-head">'
              + '<div class="spa-shell-head-logo"></div>'
              + '<div class="spa-shell-head-account"></div>'
              + '<div class="spa-shell-head-search"></div>'
            + '</div>'
            + '<div class="spa-shell-main">'
              + '<div class="spa-shell-main-nav"></div>'
              + '<div class="spa-shell-main-content"></div>'
            + '</div>'
            + '<div class="spa-shell-footer"></div>'
            + '<div class="spa-shell-chat"></div>'
            + '<div class="spa-shell-modal"></div>'
      },
      stateMap = {
        $container: null
      },
      jqueryMap = {
      },
      setJQueryMap, initModule;

  //----- Utility Methods -----//

  //----- DOM Manipulation Methods -----//

  // Map is used to cache jQuery lookups for performance
  setJQueryMap = function() {
    var $container = stateMap.$container;
    jqueryMap = {$container: $container};
  };

  //----- Event Handlers -----//

  //----- Public Methods -----//
  initModule = function($container) {
    stateMap.$container = $container;
    $container.html(configMap.mainHtml);
    setJQueryMap();
  };

  return {initModule: initModule};

}());
