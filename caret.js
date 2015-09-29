(function($){
  'use strict';

  var fakeCaretInput = '#input',
      fakeCaretInputGhost = '.search-input__caret-container span',
      fakeCaret = '.search-input__caret';

  function init() {
    fakeCaretInit();
  }

  function fakeCaretInit() {
    if($(fakeCaretInput).length) {

      // Inject required markup before input
      $('<div class="search-input__caret-container"><span id="search-input__ghost" class="search-input__ghost"></span></div><div class="search-input__caret"></div>').insertBefore($(fakeCaretInput));

      // Be sure the fake caret is in the right starting position
      var fakeInputOffset = $(fakeCaretInput).offset(),
          fakeCaretInputGhostOffset = $(fakeCaretInputGhost).offset(),
          fakeCaretOffset = (fakeCaretInputGhostOffset.left - fakeInputOffset.left);
      //$(fakeCaret).css('margin-left',fakeCaretOffset);

      // Copy styles from input to ghost input
      // var receiver = document.querySelector('.search-input__caret-container');
      // var styles   = getComputedStyle(fakeCaretInput);
      // var cssText = '';
      // for(var style in styles){
      //     cssText += style+':'+styles[style];
      // }
      // receiver.style.cssText = cssText;

      function setCaretXY(elem, real_element, caret) {
        var rects = document.getElementById("search-input__ghost").getClientRects();
        var lastRect = rects[rects.length - 1];
        var realElementOffset = $(real_element).offset();

        var x = lastRect.left + lastRect.width - realElementOffset.left + document.body.scrollLeft;
        // y = lastRect.top - real_element.scrollTop - offset[1] + document.body.scrollTop;
        $(caret).css('left',x);
      }

      function moveCaret() {
        $(fakeCaretInputGhost).text($(fakeCaretInput).val().substring(0, $(fakeCaretInput)[0].selectionStart).replace(/\n$/, '\n\u0001'));
        setCaretXY(fakeCaretInputGhost, fakeCaretInput, fakeCaret);
      }

      $(fakeCaretInput).on("input keydown keyup propertychange click paste cut copy mousedown mouseup change", function () {
        moveCaret();
      });

    } else {

    }

  }

  $(function() {
    $(document).on('ready', init);
  });

})(jQuery);
