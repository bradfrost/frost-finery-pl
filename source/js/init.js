(function(w){
	
	$('.nav-toggle').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('#nav').toggleClass('active');
	});
	
})(this);

var isLooping = false;

flyoutMode = false;
var jewelryFlyout = document.querySelectorAll('.jewelry-image > a');
$('.jewelry-image > a').click(function(event) {
	event.preventDefault();
	if (isLooping === false) {
		startInterval();
	}
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



var current = 1;
function advanceImage() {
	var panelImage = $('.jewelry-item.active .jewelry-gallery li');
	var num = $(".jewelry-item.active .jewelry-gallery li").length;
	panelImage.removeClass("active");
	if (current<(num)) {
		current++;
	}
	else {
		current = 1;
	}
	$(".jewelry-item.active .jewelry-gallery li:nth-of-type("+current+")").addClass("active");
	console.log(current);
}

$('.jewelry-gallery').click(function(event) {
	clearInterval(isLooping);
	isLooping = false;
	advanceImage();
});

function startInterval() {
	isLooping = setInterval(function() {
		advanceImage();
	}, 4000);
}


	
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


