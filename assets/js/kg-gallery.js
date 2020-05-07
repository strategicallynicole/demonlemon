	$(document).ready(function() {
	    $("article").fitVids();
	    $("table").wrap("<div class='table-responsive'></div>");
	    $(".kg-gallery-image > img").wrap("<a data-gallery='collection-gallery' data-toggle='lightbox' class='lb-item' href=''></a>");
	    $(".lb-item").each(function(e, t) {
	        $(this).attr("href", $(this).children("img").attr("src"))
	    });
	    $(document).on("click", '[data-toggle="lightbox"]', function(e) {
	        e.preventDefault(), $(this).ekkoLightbox()
	    });
	    document.querySelectorAll(".kg-gallery-image img").forEach(function(e) {
	        var t = e.closest(".kg-gallery-image"),
	            a = e.attributes.width.value / e.attributes.height.value;
	        t.style.flex = a + " 1 0%"
	    })
	});