if (switcherActive) {

    /* Defining Primary & Secondary Colors. */

    var secondaryColors = ["brown", "green", "red", "blue"];
    var primaryColors = ["dark", "light"];
    
    /* Getting Colors from Local Storage. */
    
    var localSecondaryColor = localStorage.getItem("sec-color");
    var localPrimaryColor = localStorage.getItem("pri-color");

    /* Adding Classes to Body if colors were found in Local Storage. */

    $("body").addClass(null == localSecondaryColor ? "brown" : localSecondaryColor);
    $("body").addClass(null == localPrimaryColor ? "dark" : localPrimaryColor);
    
    /* Adding Click Event to Color Selectors. */

    $(".secondary-colors .circular-selector").on("click", function(e) {

        secondaryColors.forEach(function(e) {
            $("body").hasClass(e) && $("body").removeClass(e)
        });

        var a = $(e.delegateTarget).data("value");
        $("body").addClass(a);
        localStorage.setItem("sec-color", a);

    });
    
    $(".primary-colors .circular-selector").on("click", function(e) {

        primaryColors.forEach(function(e) {
            $("body").hasClass(e) && $("body").removeClass(e)
        });

        var a = $(e.delegateTarget).data("value");
        $("body").addClass(a);
        localStorage.setItem("pri-color", a);

    });
    
} else {
    $("body").addClass(themeColors);
};

/* Calculating Height for post loop squares. */

function recalculatePostHeight() {
    var divWidth = $("#main .post-square").width();
    $("#main .post-square").height(divWidth);
};

recalculatePostHeight();

/* Lazy Load Configuration. */

cssBackgrounds = new LazyLoad({
    elements_selector: ".lazy"
});

articleImages = new LazyLoad({
    container: document.getElementById("main")
});

/* Fix for placeholder on old browsers. */

$("input, textarea").placeholder();

/* Search Functionality Configuration */

$("#search-field").ghostHunter({
    results: "#results",
    onKeyUp: !0,
    onPageLoad: !1,
    result_template: '<a href="{{link}}" id="gh-{{ref}}" class="gh-search-item result post-presentation"><h3>{{title}}<span>{{pubDate}}</span></h3></a>',
    info_template: '<div class="result-info"><span>Found {{amount}} posts.</span></div>',
    indexing_start: function() {
        $(".fa-spinner").addClass("spinner-active");
        $("#search-field").prop("disabled", !0);
    },
    indexing_end: function() {
        $(".fa-spinner").removeClass("spinner-active");
        $("#search-field").prop("disabled", !1);
    }
});

/* Enabling Touch Support for Carousel. */

$(".carousel").each(function() {

    var e = $(this);
    var a = new Hammer(this, {
        recognizers: [
            [Hammer.Swipe, {
                direction: Hammer.DIRECTION_HORIZONTAL
            }]
        ]
    });

    a.on("swipeleft", function() {
        e.carousel("next")
    });

    a.on("swiperight", function() {
        e.carousel("prev")
    });

});

/* Initializing the rest of the Plugins. */

$(document).ready(function() {

    /* Sticky State Config. */

    $("#main-navbar.sticky-ok").sticky({
        topSpacing: 0
    });

    $(".paged .latest-post").css("margin-top", $("#main-navbar").height() + 30);

    /* Changing the Search Panel State. */

    $(".search-panel-toggle").click(function(e) {
        $("#search-section").toggleClass("is-visible");
        $("body").toggleClass("custom-modal-open");
        e.preventDefault();
    });

    /* Load More */

    $(function($) {

        var currentPage = 1;
        var pathname = window.location.pathname;
        var $document = $(document);
        var isLoading = false;

        function sanitizePathname(path) {
            var paginationRegex = /(?:page\/)(\d)(?:\/)$/i;
            path = path.replace(/#(.*)$/g, '').replace('////g', '/');
            if (path.match(paginationRegex)) {
                currentPage = parseInt(path.match(paginationRegex)[1]);
                path = path.replace(paginationRegex, '');
            }
            return path;
        }

        function infiniteScroll() {

            if (currentPage === maxPages) {
                $('#load-more').text(endMessage);
                return;
            }

            pathname = sanitizePathname(pathname);

            isLoading = true;
            currentPage += 1;
            var nextPage = pathname + 'page/' + currentPage + '/';

            if (isLoading) {
                $('#load-more').html('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');
            }

            $.get(nextPage, function(content) {
                var parse = document.createRange().createContextualFragment(content);
                var posts = parse.querySelectorAll('#post-loop-wrapper > div');
                if (posts.length) {
                    [].forEach.call(posts, function(post) {
                        $('#post-loop-wrapper').append(post);
                        cssBackgrounds.update();
                    });
                    recalculatePostHeight();
                }
            }).fail(function(xhr) {
                if (xhr.status === 404) {
                    $('#load-more').text(endMessage);
                }
            }).always(function() {
                isLoading = false;
                if(currentPage === maxPages) {
                    $('#load-more').text(endMessage);
                } else {
                    $('#load-more').html(Message + '<i class="fas fa-arrow-down"></i>');
                }
            });

        }
        $("#load-more").on("click", infiniteScroll);
    });

});

// Recalculate Height on Window's resize.

$(window).resize(function() {
    recalculatePostHeight();
});