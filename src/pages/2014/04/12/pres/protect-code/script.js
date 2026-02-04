$(document).ready(function() {
    var prev;

    var slides = $('.slide__div');

    for (var i = 0 ; i < slides.length ; i++) {
        var element = $(slides[i]);

        function get(number) {
            var n = parseInt(number, 10),
                str = n.toString();

            if (str.length == 1) str = '0' + str;

            return str;
        }

        if (prev) {
            $(element).prepend(prev).find('.in').eq(0).removeClass('in').addClass('out').find('.next').addClass('active');
        }
        $(element).prepend('<div class="counter"><div class="counter__number">' + get(i + 1) + '<br/>' + get(i) + '</div></div>');
        prev = $(element).find('.slide__content.in')[0].outerHTML;
    }
});

// Print
// $(document).ready(function() {
//     $('.next').addClass('active');
//     $('.slide').addClass('active');
//     $('#19').removeClass('active');
//     $('#19 *').removeClass('active');
// });