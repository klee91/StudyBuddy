$(document).ready(function(){
  $('[has-ripple="true"]').click(function () {
    $(this).toggleClass('clicked');
    $('.menu').toggleClass('open');
    console.log("I got here")
  });

  $('.menu a').each(function (index) {
    console.log("I maybe got here")
    var thismenuItem        = $(this);
    
    thismenuItem.click(function (event) {
      event.preventDefault();
      
      $('.menuitem-wrapper').eq(index).addClass('spin');
      
      var timer = setTimeout(function () {
        $('body').removeAttr('class').addClass('bg-'+index);
        $('.menuitem-wrapper').eq(index).removeClass('spin');
        $('.menu').removeClass('open');
        $('.menu-btn').removeClass('clicked');
      }, 800);
    });
  });
});