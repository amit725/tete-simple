 $(document).ready(function() {

      $('#fullpage').fullpage({
          fadingEffect: true,
          loopBottom: true,
          keyboardScrolling: false,
            anchors: ['firstPage', 'secondPage', 'thirdPage', 'lastpage'],

           onLeave: function(index, nextIndex, direction){
            var leavingSection = $(this);

            if(index == 3 && direction =='down'){
                        $('.contact-us-list').hide();
            }
            else if((index == 4 && direction == 'up') || (index == 4 && direction == 'down')){
                          $('.contact-us-list').show();
            }
        }
      });

      $.fn.fullpage.setAllowScrolling(false);
      $.fn.fullpage.setLockAnchors(true);

      var initialLoad = true;

      $('.bg-image').on("touchstart, tap, click", function(){
            $('#navigation').removeClass("hidden");
            $('#navigation').show(1500);
            $.fn.fullpage.setAllowScrolling(true);
            $('.bg-image').hide("slow");
      });

       $('body').keydown(function(e){
            $('.bg-image').click();
            if(initialLoad){
                e.stopImmediatePropagation();
                initialLoad = false;
            }
            $.fn.fullpage.setKeyboardScrolling(true);
       });

      $('#contact-anchor').on("click", function(e){
          $('.contact-us-list').hide();
          $('.header-logo').show();
          $('#navigation').show();
                  $.fn.fullpage.moveTo(4);

      });

        $('#contactForm').on("click", 'button', function(e){
          e.preventDefault();
          emailjs.send("gmail", "template_L0ZizAoT",{
              from_name: $(this).closest('form').find('#name').val(), 
              from_email: $(this).closest('form').find('#email').val(),
              from_phone: $(this).closest('form').find('#phone').val(),
              message_contact: $(this).closest('form').find('#message').val()
            })
            .then(
              function(response) {
                $('#error').addClass("hidden");
                $('#success').removeClass("hidden");
                $('#contactForm').trigger("reset");
                console.log("SUCCESS", response);
              }, 
              function(error) {
               $('#success').addClass("hidden");

               $('#error').removeClass("hidden");

                console.log("FAILED", error);
              }
            );
                  });
      $('.header-logo').on("click", function(){
        $.fn.fullpage.moveTo(1);
      });

    var removeHash = function(){
      var hash = location.hash.replace('#','');

      if(hash != ''){

          location.hash = '';
      }
    };
        removeHash();

    
  });