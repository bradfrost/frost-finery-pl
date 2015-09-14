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
	var jewelryCurrent = $(jewelryId);	
	$('.jewelry-panel').not(jewelryCurrent).removeClass('active');
	if(jewelryCurrent.hasClass('active')) {
		jewelryCurrent.removeClass('active');
	}
	else {
		jewelryCurrent.addClass('active');
	}

});



