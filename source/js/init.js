(function(w){
	
	$('.nav-toggle').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('#nav').toggleClass('active');
	});
	
})(this);

var isLooping = false;
var current = 1;
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
	
	//Set gallery image back to the first image
	current = 1;
	$('.jewelry-item.active .jewelry-gallery li').removeClass("active");
	$(".jewelry-item.active .jewelry-gallery li:nth-of-type(1)").addClass("active");
	if (isLooping === false) {
		startInterval();
	}
});

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


