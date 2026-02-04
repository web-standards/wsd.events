/*

	Include:

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<script src="https://raw.github.com/DmitryBaranovskiy/raphael/master/raphael-min.js" type="text/javascript"></script>

	above the graph code.

	Usage:

	This is the CSS styling for the graph holder
	<style type="text/css">
		.holder {
	    text-align: center;
	    width: 200px;
	    height: 200px;
	    float: left;
		}
	</style>

	The series of divs can be created problematically (php/ruby etc) or static as they are here.
	Data in this instance is stored in the HTML5 data attribute tags but for larger data sets the a 2D array for all the data would be more appropriate
	<html>
	<head>
		<title>Multiple Raphael Graphs</title>
	</head>

		<div class="holder" id="holder0" data-firstData="25" data-secondData="75"></div>
		<div class="holder" id="holder1" data-firstData="50" data-secondData="50"></div>
		<div class="holder" id="holder2" data-firstData="17" data-secondData="83"></div>

	</html>

	Credit to the Rapheal pie example for forming the bases of this code and to ronin on stackover flow for the doughnut modification to turn this from pie to doughnut

*/

$(document).ready(function() {
  Raphael.fn.pieChart = function (cx, cy, r, rin, values, labels, stroke) {
    var paper = this,
      rad = Math.PI / 180,
      chart = this.set(),
      colors = new Array("#e8e8f0","#a1c436","#ff9900");
    function sector(cx, cy, r, startAngle, endAngle, params) {
      var x1 = cx + r * Math.cos(-startAngle * rad),
          x2 = cx + r * Math.cos(-endAngle * rad),
          y1 = cy + r * Math.sin(-startAngle * rad),
          y2 = cy + r * Math.sin(-endAngle * rad);
          xx1 = cx + rin * Math.cos(-startAngle * rad),
          xx2 = cx + rin * Math.cos(-endAngle * rad),
          yy1 = cy + rin * Math.sin(-startAngle * rad),
          yy2 = cy + rin * Math.sin(-endAngle * rad);

      return paper.path(["M", xx1, yy1,
                         "L", x1, y1,
                         "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2,
                         "L", xx2, yy2,
                         "A", rin, rin, 0, +(endAngle - startAngle > 180), 1, xx1, yy1, "z"]
                       ).attr(params);
    }
    var angle = 90,
      total = 0,
      start = 0.22,
      process = function (j) {
        var value = values[j],
          angleplus = 360 * value / total,
          popangle = angle + (angleplus / 2),
          color = Raphael.hsb(start, .75, 1),
          ms = 500,
          delta = 30,
          p = sector(cx, cy, r, angle, angle + angleplus, {fill: colors[j], stroke: stroke, "stroke-width": 2}),
          txt = paper.text(100,  100, values[j]+"\n"+labels[j]).attr({fill: colors[j], stroke: "none", opacity: 0, "font-size": 20});
        p.mouseover(function () {
          p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, 100, "linear");
          txt.stop().animate({opacity: 1}, 100, "linear");
        }).mouseout(function () {
          p.stop().animate({transform: ""}, 100, "linear");
          txt.stop().animate({opacity: 0}, ms);
        });
        angle += angleplus;
        chart.push(p);
        chart.push(txt);
        start -= 0.14;
      };
    for (var i = 0, ii = values.length; i < ii; i++) {
      total += values[i];
    }
    for (i = 0; i < ii; i++) {
      process(i);
    }
    return chart;
	};

	$(function () {
    //create the values and labels array
    var values = [],
        labels = ["spent","left"];

    holderCounter = 0;

    while(1){
    	//loop through the holder in the html until one doesn't exist
      //percentage spent is in a data attribute so needs to be converted from string to int
      values[0] = parseInt($('#holder'+holderCounter).attr('data-firstData'));
      //quick sanity check that there is a holder to be used
      if($('#holder'+holderCounter).length <= 0){
            break;
        }

      values[1] = parseInt($('#holder'+holderCounter).attr('data-secondData'));

      Raphael("holder"+holderCounter, 960, 540).pieChart(480, 270, 250, 200, values, labels, "#fff");
      //increment to reference the next pie chart
      holderCounter++;
    }
  });
});