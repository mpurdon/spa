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
            + '<div class="spa-shell-modal"></div>',
        chat_extended_title: 'Click to retract.',
        chat_extend_time: 1000,
        chat_extend_height: 450,
        chat_retracted_title: 'Click to extend.',
        chat_retract_time: 300,
        chat_retract_height: 15
      },
      stateMap = {
        $container: null,
        is_chat_retracted : true
      },
      jqueryMap = {
      },
      // Utility Method Declarations
      // DOM Method Declarations
      setJQueryMap,
      toggleChat,
      // Event Handler Declarations
      onClickChat,
      // Public Method Declarations
      initModule;

  //----- Utility Method Definitions -----//

  //----- DOM Manipulation Method Definitions -----//

  // Map is used to cache jQuery lookups for performance
  setJQueryMap = function() {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $chat: $container.find('.spa-shell-chat')
    };
  };

  toggleChat = function(do_extend, callback) {
    var
        px_chat_height = jqueryMap.$chat.height(),
        is_open = px_chat_height == configMap.chat_extend_height,
        is_closed = px_chat_height == configMap.chat_retract_height,
        is_sliding = !is_open && !is_closed;

    if (is_sliding) {
      return false;
    }

    // Attempt to extend the chat slider
    if (do_extend) {
      jqueryMap.$chat.animate(
          {height: configMap.chat_extend_height},
          configMap.chat_extend_time,
          function() {
            jqueryMap.$chat.attr(
              'title',
              configMap.chat_extended_title
            );
            stateMap.is_chat_retracted = false;
            if (callback) {
              callback(jqueryMap.$chat);
            }
          });

      return true;
    }

    jqueryMap.$chat.animate(
        {height: configMap.chat_retract_height},
        configMap.chat_retract_time,
        function() {
          jqueryMap.$chat.attr(
              'title',
              configMap.chat_retracted_title
          );
          stateMap.is_chat_retracted = true;
          if (callback) {
            callback(jqueryMap.$chat);
          }
        });

    return true;
  };

  //----- Event Handler Definitions -----//
  onClickChat = function() {
    toggleChat(stateMap.is_chat_retracted);
    return false;
  };

  //----- Public Method Definitions -----//
  initModule = function($container) {
    stateMap.$container = $container;
    $container.html(configMap.mainHtml);
    setJQueryMap();

    stateMap.is_chat_retracted = true;
    jqueryMap.$chat.attr('title', configMap.chat_retracted_title)
                   .click(onClickChat);
  };

  return {initModule: initModule};

}());
