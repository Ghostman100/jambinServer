$(document).ready(function () {

  $('.user-filter_item').click(function(){

    if ( $(this).hasClass('active') ) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }
    
  });

  $('.complaint-filter_item').click(function(){

    if ( $(this).hasClass('active') ) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }
    
  });

  $(".drop-filter").click(function(event) { 
      event.stopPropagation();
  });

  $('.btn-more').click(function(){
    $(this).parent().find('.drop-table').toggleClass('active');
  });

  $('.toolbar__user a').click(function(e){
    e.preventDefault();
    $('.user-dropdown').slideToggle('slow');
  });

  $(function(){
      $("td.user-type").mousemove(function (eventObject) {
          $data_tooltip = $(this).text();
          $("#tooltip").html($data_tooltip)
              .css({ 
                "top" : eventObject.pageY + 5,
                "left" : eventObject.pageX + 5
              })
              .show();
          }).mouseout(function () {
            $("#tooltip").hide()
              .html("")
              .css({
                  "top" : 0,
                  "left" : 0
              });
      });
  });

  $('.toolbar').append('<button type="button" class="open-menu"></button>');

  $('.open-menu').click(function(){
    $('.toolbar__navigation').slideToggle('slow');
  });

  $(window).resize(function(){
    if($(window).width() > 767) {
      $('.toolbar__navigation').removeAttr('style');
    }
  });

  $(function(){

    $('#age-range').slider({
        step:1,
        min: 18,
        max: 100,
        values: [18,99],
        range: true,

        change: function(event, ui) {
            $('#minCost').val(ui.values[0]);
            $('#maxCost').val(ui.values[1]);
          },
         slide: function(event, ui){
            $('#minCost').val(ui.values[0]);
            $('#maxCost').val(ui.values[1]);
          }
        });

        
        });


        
   


});