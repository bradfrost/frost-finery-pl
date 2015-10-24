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

//Click on jewelry thumbnail
$('.jewelry-image > a').click(function(event) {
	event.preventDefault();
	var thisHref = $(this).attr('href').substring(1);
	openPanel(thisHref);
});

function jewelryPanelPosition() {
	var xOffsetFromWindow = getOffsetLeft($('.jewelry-item.active')[0]);
		$('.jewelry-item.active').find('.jewelry-panel').css("left",(xOffsetFromWindow * -1)+"px");
}

$(window).resize(function() {
	jewelryPanelPosition();
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
}

$('.jewelry-gallery').click(function(event) {
	event.preventDefault();
	clearInterval(isLooping);
	isLooping = false;
	advanceImage();
});

function startInterval() {
	isLooping = setInterval(function() {
		advanceImage();
	}, 4000);
}

if(window.location.hash) {
	var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
	openPanel(hash);
 }

//Open the jewelry details for the selected piece
function openPanel(id) {
	var jewelryId = $('#' + id);
	var jewelryCurrent = jewelryId.parents('.jewelry-item');

	jewelryCurrent.find('.jewelry-gallery img').each(function() {
		var changeSource = $(this).attr('data-src');
		$(this).attr("src", changeSource);
	});

	history.pushState(null, null, '#' + id);

	$('.jewelry-item').not(jewelryCurrent).removeClass('active');

	if(jewelryCurrent.hasClass('active')) { //If the jewelry panel is open
		jewelryCurrent.removeClass('active');
	}
	else { //The jewelry panel is closed
		jewelryCurrent.addClass('active');
		jewelryPanelPosition();
		var yOffset = getOffsetTop(jewelryId[0]); //Find the ypos of the selected jewerly item
		window.scrollTo(0, (yOffset-($('.jewelry-thumb').height()))); //Scroll window to yOffset
	}

	//Set gallery image back to the first image
	current = 1;
	$('.jewelry-item.active .jewelry-gallery li').removeClass("active");
	$(".jewelry-item.active .jewelry-gallery li:nth-of-type(1)").addClass("active");
	if (isLooping === false) {
		startInterval();
	}
}

//Testimonials carousel
var currentCarousel = 1;
var carouselItems = $('.testimonial-list li').length;
function advanceCarousel() {
	$('.testimonial-list li').removeClass("active");
	if (currentCarousel===carouselItems) {
	currentCarousel = 1;
	}
	else {
		currentCarousel++;
	}
	$('.testimonial-list li:nth-child('+(currentCarousel)+')').addClass("active");
}
advanceCarousel();

setInterval(function() {
	advanceCarousel();
}, 10000);

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

function getOffsetTop( elem )
{
    var offsetTop = 0;
    do {
      if ( !isNaN( elem.offsetTop ) )
      {
          offsetTop += elem.offsetTop;
      }
    } while( elem = elem.offsetParent );
    return offsetTop;
}
