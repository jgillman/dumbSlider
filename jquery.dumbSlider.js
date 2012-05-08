
;(function( $, window, undefined ){

	var DumbSlider = function( element, options ){
			this.element = element;
			this.$element = $(element);
			this.options = options;

			// this next line takes advantage of HTML5 data attributes
			// to support customization with the plugin on a per-element
			// basis. eg
			// <div class=item' data-plugin-options='{"message":"Goodbye World!"}'></div>
			this.metadata = this.$element.data( 'plugin-options' );
		};

	// the plugin prototype
	DumbSlider.prototype = {
		defaults: {
			duration: 3000,
			nextButton: null,
			prevButton: null
		},

		init: function() {
			// Introduce defaults that can be extended either globally or using an
			// an object literal.
			this.config = $.extend({}, this.defaults, this.options, this.metadata);

			console.log(this.element, this.options)
			this.initContent();
			this.initEvents();

			// this.sampleMethod();
			return this;
		},

		initContent: function() {
			// wrapInner so we have a slide container that can move
			$(this.element).wrapInner('<div class="' + this.getIdentifier(this.element) + 'Wrapper" />');
		},

		initEvents: function() {
			// if nextButton isn't null add event
			// if prevButton isn't null add event
		},

		getIdentifier: function(element) {
			return this.element.id || this.element.className.split(' ')[0]
		}
	}

	DumbSlider.defaults = DumbSlider.prototype.defaults;

	$.fn.dumbSlider = function(options) {
		return this.each(function() {
			new DumbSlider(this, options).init();
		});
	};

})( jQuery, window );