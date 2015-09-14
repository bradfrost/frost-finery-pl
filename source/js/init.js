(function(w){
	
	$('.nav-toggle').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('#nav').toggleClass('active');
	});
	
})(this);

flyoutMode = false;
var jewelryFlyout = document.querySelectorAll('.jewelry-image > a');
$('.jewelry-image > a').click(function(event) {
	event.preventDefault();
	var jewelryId = $(this).attr('href');
	var jewelryCurrent = $(this).parents('.jewelry-item');
	console.log(jewelryCurrent);
	var xOffsetFromWindow = getOffsetLeft($(this)[0]);
	$('.jewelry-item').not(jewelryCurrent).removeClass('active');
	if(jewelryCurrent.hasClass('active')) {
		jewelryCurrent.removeClass('active');
	}
	else {
		jewelryCurrent.addClass('active');
		jewelryCurrent.find('.jewelry-panel').css("left",(xOffsetFromWindow * -1)+"px");
	}
});

function getOffsetLeft( elem )
{
    var offsetLeft = 0;
    do {
      if ( !isNaN( elem.offsetLeft ) )
      {
          offsetLeft += elem.offsetLeft;
      }
    } while( elem = elem.offsetParent );
    return offsetLeft;
}