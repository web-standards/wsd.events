$(function() {
    var obj = $('.lab-child'),
        obj_p = $('.lab-parent'),
        go_btn = $('.control-go'),
        res1 = $('.container-prop'),
        res2 = $('.obj-prop');

    go_btn.click(function() {
        var w = $('#width').val(),
            h = $('#height').val(),
            m = $('#margin').val(),
            p = $('#padding').val(),
            w_u = $('#w_units').val(),
            h_u = $('#h_units').val(),
            m_u = $('#m_units').val(),
            p_u = $('#p_units').val();

        obj.css({
            'width': w + w_u,
            'height': h + h_u,
            'margin': m + m_u,
            'padding': p + p_u
        });

        res1.html('width: ' + obj_p.css('width') + ';<br> height: ' + obj_p.css('height') + ';<br> margin: ' + obj_p.css('margin') + ';<br> padding: ' + obj_p.css('padding') + ';<br> font-size: ' + obj_p.css('font-size') + ';');
        res2.html('width: ' + obj.css('width') + ';<br> height: ' + obj.css('height') + ';<br> margin: ' + obj.css('margin') + ';<br> padding: ' + obj.css('padding') + ';<br> font-size: ' + obj.css('font-size') + ';');
    });

    go_btn.click();
});