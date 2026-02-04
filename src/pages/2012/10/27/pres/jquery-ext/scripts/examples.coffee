jQuery.cssHooks.kittyness =
  get: (elem, computed, extra) ->
    data = jQuery.data elem, 'css_cats'
    data && data.length || 0

  set: (elem, value) ->
    num = parseInt value, 10
    cats = data = jQuery.data(elem, 'css_cats') || []
    num -= cats.length

    if num >= 0
      while num--
        cats.push "url(pictures/kitty.svg) #{(Math.random()*100).toFixed()}% #{(Math.random()*100).toFixed()}% / 10% no-repeat"
    else
      cats.splice num, -num

    jQuery.data elem, 'css_cats', cats

    jQuery.style elem, 'background', cats.join()
    jQuery.style elem, 'background-color', cats.length && '#fff' || ''

jQuery.cssNumber.kittyness = true

jQuery.easing.bumble = (percent, current, start, stop, duration) ->
  percent * (10 - percent * 9)

jQuery.attrHooks.superprop =
  get: (elem) ->
    console.log 'get superprop', jQuery.data(elem, 'superprop')
    jQuery.data elem, 'superprop'
  set: (elem, value) ->
    console.log 'set superprop', value
    jQuery.data elem, 'superprop', value

jQuery.event.special.custom =
  noBubble: true
  # this == elem
  setup: (data, ns, eventHanle) ->
  teardown: (ns, eventHandle) ->
  add: (handleObj) -> #handleObj.handle
  remove: (handleObj) ->
  trigger: (data) ->
  handle: (event) ->
  _default: (data) -> #custom events only
  preDispatch: (data) ->
  postDispatch: (event) ->

jQuery.event.special.beforeunload =
  setup: ( data, namespaces, eventHandle ) ->
    if jQuery.isWindow( this )
      this.onbeforeunload = eventHandle

  teardown: ( namespaces, eventHandle ) ->
    if this.onbeforeunload == eventHandle
      @onbeforeunload = null

jQuery.event.special.empty =
  setup: ( data, namespaces, eventHandle ) ->
    jQuery.data(elem = @, data = {})
    data.timer = setInterval(=>
      if elem.innerHTML.length == 0
        data.triggered || $(@).trigger 'empty'
        data.triggered = true
      else if data.triggered
        data.triggered = false
    , 100)
  teardown: ( namespaces, eventHandle ) ->
    clearInterval jQuery.data(@, 'empty_event').timer

jQuery.ajaxPrefilter "data types", (s, originalSettings, jqXHR) ->
  #prepare stuff
  "transport"

jQuery.ajaxTransport "transport", (s) ->
  if condition
    # return transport
    send: (headers, callback) ->
      #do stuff
    abort: () ->
      #omg, abort
  else
    #return fallback transport optionaly

jQuery.ajaxSetup
  accepts:
    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
  contents:
    script: /javascript|ecmascript/
  converters:
    "text script": ( text ) -> jQuery.globalEval text

jQuery.expr[':'].mailto = (node, index, props, nodes) ->
  if node.href && node.href.match /^mailto:/
    unless props[3]
      true
    else
      node.href.replace(/^.*@/, '') == props[3]

class Cat extends Animal
	contstructor(@color='brown')->

	getNames: () ->
		[ 'Missy', 'Crissy'
		  'Jessy', 'Lessy' ]

	getBand: () ->


class Javascript extends Language
	constructor: (@dialect='ecma') ->
	getKeywords: (which='used') ->
		keywords =
			used: [ 'var', 'const', 'in', 'for' ]
			unused: ['class', 'export', 'import' ]

		keywords[which] || null
	echo: () ->
		console.log "#{word} is reserved" for word in getKeywords 'unused'
	
