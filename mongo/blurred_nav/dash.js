$(document).ready(function () {


	$('#gp').hover(sourceSwap, sourceSwap);
	$('#ms').hover(sourceSwap, sourceSwap);

})

var sourceSwap = function () {
	var $this = $(this);
    var newSource = $this.data('alt-src');
    $this.data('alt-src', $this.attr('src'));
    $this.attr('src', newSource);
}






