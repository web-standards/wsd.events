/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
var symbols = {
"stage": {
   version: "0.1.3",
   baseState: "Base State",
   initialState: "Base State",
   content: {
      dom: [
        {
            id:'bg',
            className:'stage_bg_id',
            type:'image',
            tag:'div',
            rect:[0,0,1024,640],
            fill:['rgba(0,0,0,0)','images/bg.png'],
            transform:[[4.59109,5.68096]]
        },
        {
            id:'Rectangle',
            className:'stage_Rectangle_id',
            type:'rect',
            tag:'div',
            rect:[254,411,206,23],
            fill:['rgba(0,0,0,1.00)'],
            stroke:[0,"rgba(0,0,0,1)","none"]
        },
        {
            id:'pacman-right',
            className:'stage_Rectangle3_id',
            type:'rect',
            tag:'div',
            rect:[507.33331298828,470.66668701172,9.6666793823242,23],
            borderRadius:[0,20,20,0],
            fill:['rgba(255,236,0,1)'],
            stroke:[0,"rgb(0, 0, 0)","none"],
            transform:[[-1.47527]]
        },
        {
            id:'pacman-top',
            className:'stage_Rectangle4_id',
            type:'rect',
            tag:'div',
            rect:[494.66665649414,468,14,15],
            borderRadius:[20,0,0,0],
            fill:['rgba(255,236,0,1)'],
            stroke:[0,"rgb(0, 0, 0)","none"],
            transform:[[-0.44919,0.00891],,,[0.99,0.99]]
        },
        {
            id:'pacman-bottom',
            className:'stage_Rectangle5_id',
            type:'rect',
            tag:'div',
            rect:[496.33331298828,484.66668701172,16,13],
            borderRadius:[0,0,0,20],
            fill:['rgba(255,236,0,1)'],
            stroke:[0,"rgb(0, 0, 0)","none"],
            transform:[[-2.13019,-3.17943],,,[1.01,1.01]]
        }],
      symbolInstances: [
      ]
   },
   states: {
      "Base State": {
         "${_pacman-bottom}": [
            ["style", "height", '13px'],
            ["style", "border-bottom-left-radius", [20,20],{valueTemplate:'@@0@@px @@1@@px'}],
            ["transform", "translateX", '-2.13019px'],
            ["transform", "rotateZ", '0deg'],
            ["transform", "scaleX", '1.01'],
            ["transform", "scaleY", '1.01'],
            ["transform", "translateY", '-3.17943px'],
            ["style", "width", '16px']
         ],
         "${_pacman-right}": [
            ["transform", "translateX", '-1.47527px'],
            ["style", "border-bottom-right-radius", [20,20],{valueTemplate:'@@0@@px @@1@@px'}],
            ["style", "height", '25px'],
            ["transform", "translateY", '-1.47527px'],
            ["style", "border-top-right-radius", [20,20],{valueTemplate:'@@0@@px @@1@@px'}],
            ["style", "width", '15px']
         ],
         "${_pacman-top}": [
            ["transform", "scaleY", '0.99'],
            ["style", "border-top-left-radius", [20,20],{valueTemplate:'@@0@@px @@1@@px'}],
            ["transform", "translateX", '-0.44919px'],
            ["transform", "rotateZ", '0deg'],
            ["transform", "scaleX", '0.99'],
            ["style", "height", '15px'],
            ["transform", "translateY", '0.00891px'],
            ["style", "width", '14px']
         ],
         "${_Rectangle}": [
            ["color", "background-color", 'rgba(0,0,0,1.00)'],
            ["transform", "translateX", '0'],
            ["style", "height", '23px'],
            ["transform", "translateY", '0'],
            ["style", "width", '1px']
         ],
         "${_stage}": [
            ["color", "background-color", 'rgba(0,0,0,1.00)'],
            ["style", "overflow", 'hidden'],
            ["style", "height", '640px'],
            ["style", "width", '960px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 2000,
         labels: {

         },
         timeline: [
            { id: "eid834", tween: [ "transform", "${_pacman-right}", "translateX", '-137.8646px', { fromValue: '-1.47527px'}], position: 0, duration: 2000 },
            { id: "eid822", tween: [ "transform", "${_pacman-top}", "translateY", '-2.37077px', { fromValue: '0.00891px'}], position: 0, duration: 134 },
            { id: "eid837", tween: [ "transform", "${_pacman-top}", "translateY", '0.5706px', { fromValue: '-2.37077px'}], position: 134, duration: 115 },
            { id: "eid843", tween: [ "transform", "${_pacman-top}", "translateY", '-2.35761px', { fromValue: '0.5706px'}], position: 250, duration: 135 },
            { id: "eid852", tween: [ "transform", "${_pacman-top}", "translateY", '-0.30593px', { fromValue: '-2.35761px'}], position: 385, duration: 114 },
            { id: "eid861", tween: [ "transform", "${_pacman-top}", "translateY", '-2.3657px', { fromValue: '-0.30593px'}], position: 500, duration: 136 },
            { id: "eid867", tween: [ "transform", "${_pacman-top}", "translateY", '0.54275px', { fromValue: '-2.3657px'}], position: 636, duration: 1363 },
            { id: "eid814", tween: [ "style", "${_pacman-right}", "width", '15px', { fromValue: '15px'}], position: 0, duration: 0 },
            { id: "eid820", tween: [ "transform", "${_pacman-top}", "rotateZ", '38.17237deg', { fromValue: '0deg'}], position: 0, duration: 134 },
            { id: "eid838", tween: [ "transform", "${_pacman-top}", "rotateZ", '0deg', { fromValue: '38.17237deg'}], position: 134, duration: 115 },
            { id: "eid850", tween: [ "transform", "${_pacman-top}", "rotateZ", '40deg', { fromValue: '0deg'}], position: 250, duration: 135 },
            { id: "eid857", tween: [ "transform", "${_pacman-top}", "rotateZ", '0deg', { fromValue: '40deg'}], position: 385, duration: 114 },
            { id: "eid862", tween: [ "transform", "${_pacman-top}", "rotateZ", '40deg', { fromValue: '0deg'}], position: 500, duration: 136 },
            { id: "eid835", tween: [ "transform", "${_pacman-right}", "translateY", '-1.61721px', { fromValue: '-1.47527px'}], position: 0, duration: 2000 },
            { id: "eid815", tween: [ "style", "${_pacman-right}", "height", '25px', { fromValue: '25px'}], position: 0, duration: 0 },
            { id: "eid825", tween: [ "transform", "${_pacman-bottom}", "translateY", '-1.62794px', { fromValue: '-3.17943px'}], position: 0, duration: 134 },
            { id: "eid841", tween: [ "transform", "${_pacman-bottom}", "translateY", '-3.34938px', { fromValue: '-1.62794px'}], position: 134, duration: 115 },
            { id: "eid847", tween: [ "transform", "${_pacman-bottom}", "translateY", '-1.94387px', { fromValue: '-3.34938px'}], position: 250, duration: 135 },
            { id: "eid855", tween: [ "transform", "${_pacman-bottom}", "translateY", '-3.60168px', { fromValue: '-1.94387px'}], position: 385, duration: 114 },
            { id: "eid859", tween: [ "transform", "${_pacman-bottom}", "translateY", '-2.22816px', { fromValue: '-3.60168px'}], position: 500, duration: 136 },
            { id: "eid865", tween: [ "transform", "${_pacman-bottom}", "translateY", '-3.40208px', { fromValue: '-2.22816px'}], position: 636, duration: 1363 },
            { id: "eid821", tween: [ "transform", "${_pacman-top}", "translateX", '-3.62977px', { fromValue: '-0.44919px'}], position: 0, duration: 134 },
            { id: "eid836", tween: [ "transform", "${_pacman-top}", "translateX", '-17.73666px', { fromValue: '-3.62977px'}], position: 134, duration: 115 },
            { id: "eid842", tween: [ "transform", "${_pacman-top}", "translateX", '-20.58529px', { fromValue: '-17.73666px'}], position: 250, duration: 135 },
            { id: "eid851", tween: [ "transform", "${_pacman-top}", "translateX", '-33.96346px', { fromValue: '-20.58529px'}], position: 385, duration: 114 },
            { id: "eid860", tween: [ "transform", "${_pacman-top}", "translateX", '-36.58528px', { fromValue: '-33.96346px'}], position: 500, duration: 136 },
            { id: "eid866", tween: [ "transform", "${_pacman-top}", "translateX", '-137.47658px', { fromValue: '-36.58528px'}], position: 636, duration: 1363 },
            { id: "eid823", tween: [ "transform", "${_pacman-bottom}", "rotateZ", '-38.77215deg', { fromValue: '0deg'}], position: 0, duration: 134 },
            { id: "eid840", tween: [ "transform", "${_pacman-bottom}", "rotateZ", '0deg', { fromValue: '-38.77215deg'}], position: 134, duration: 115 },
            { id: "eid853", tween: [ "transform", "${_pacman-bottom}", "rotateZ", '-40deg', { fromValue: '0deg'}], position: 250, duration: 135 },
            { id: "eid858", tween: [ "transform", "${_pacman-bottom}", "rotateZ", '0deg', { fromValue: '-40deg'}], position: 385, duration: 114 },
            { id: "eid863", tween: [ "transform", "${_pacman-bottom}", "rotateZ", '-40deg', { fromValue: '0deg'}], position: 500, duration: 136 },
            { id: "eid824", tween: [ "transform", "${_pacman-bottom}", "translateX", '-6.0221px', { fromValue: '-2.13019px'}], position: 0, duration: 134 },
            { id: "eid839", tween: [ "transform", "${_pacman-bottom}", "translateX", '-19.25334px', { fromValue: '-6.0221px'}], position: 134, duration: 115 },
            { id: "eid846", tween: [ "transform", "${_pacman-bottom}", "translateX", '-22.92381px', { fromValue: '-19.25334px'}], position: 250, duration: 135 },
            { id: "eid854", tween: [ "transform", "${_pacman-bottom}", "translateX", '-36.25336px', { fromValue: '-22.92381px'}], position: 385, duration: 114 },
            { id: "eid856", tween: [ "transform", "${_pacman-bottom}", "translateX", '-39.10319px', { fromValue: '-36.25336px'}], position: 500, duration: 136 },
            { id: "eid864", tween: [ "transform", "${_pacman-bottom}", "translateX", '-138.96474px', { fromValue: '-39.10319px'}], position: 636, duration: 1363 }]
      }
   }
}};

var comp;
Edge.registerCompositionDefn(compId, symbols);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     comp = new Edge.Composition(compId, {stage: "." + compId}, {});
	   /**
 * Adobe Edge Timeline Launch
 */
     comp.ready(function() {
         comp.play();
     });
});
})(jQuery, jQuery.Edge, "EDGE-4956254");
