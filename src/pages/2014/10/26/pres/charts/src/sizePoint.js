(function () {
    /** @class sizePoint
     * @extends Plugin */
    var Legend = {
        /**
         * @param {RenderContext} context
         * @param {ChartTools} tools
         */
		init:function(scale){
			this.scale = scale || 5;
			this._super();
		},
        render: function (context, tools) {
			var points = context.selectAll('.dot');
			var that = this;
			points.each(function() {
				var r = this.getAttribute('r');
				this.setAttribute('r',r*that.scale);
			})
        }
    };

    tau.plugins.add('sizePoint', Legend);
})();
