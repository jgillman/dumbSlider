
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

		wrapper: null,
		slideCount: 0,
		currentSlide: 0,

		init: function() {
			// Introduce defaults that can be extended either globally or using an
			// an object literal.
			this.config = $.extend({}, this.defaults, this.options, this.metadata);

			console.log(this.element, this.options)
			this.initContent();
			this.initEvents();
			
			return this;
		},

		initContent: function() {
			var thisContext = this;

			// Wrap children with a wrapper so we can move the slides.
			this.wrapper = $(this.element)
				.wrapInner('<div class="' + this.getIdentifier(this.element) + 'Wrapper" />')
				.children().first();

			// Store the number of slides for later use
			this.slideCount = this.wrapper.children().length;

			// Make wrapper wide enough for all the images.
			this.wrapper.width(function() {
				return thisContext.$element.width() * $(this).children().length;
			});

			this.prefixify('user-select', this.wrapper);
		},

		initEvents: function() {
			// Set the 'next' button event if nextButton exists
			if ( this.options.nextButton ) {
				$(this.options.nextButton).click(this, this.onNextClick);
			}

			// Set the 'previous' button event if nextButton exists
			if ( this.options.prevButton ) {
				$(this.options.prevButton).click(this, this.onPrevClick);
			}
		},

		updatePosition: function() {
			// Set margin-left 
			this.wrapper.css('margin-left', (-1 * this.$element.width() * this.currentSlide));
		},

		onNextClick: function(event) {
			var thisContext = event.data;

			thisContext.currentSlide++;

			if ( thisContext.currentSlide > thisContext.slideCount - 1 ) {
				thisContext.currentSlide = 0;
			}

			thisContext.updatePosition();
		},

		onPrevClick: function(event) {
			var thisContext = event.data;

			thisContext.currentSlide--;

			if ( thisContext.currentSlide < 0 ) {
				thisContext.currentSlide = thisContext.slideCount - 1;
			}

			thisContext.updatePosition();
		},

		getIdentifier: function(element) {
			return this.element.id || this.element.className.split(' ')[0]
		},

		prefixify: function(style, $element) {
			var prefixes = ['-webkit-','-moz-','-ms-','-o-'];
			
			for ( i in prefixes ) {
				prefix = prefixes[i];
				console.log(prefix, style, $element);
				// $element.css();
			}
		}
	}

	DumbSlider.defaults = DumbSlider.prototype.defaults;

	$.fn.dumbSlider = function(options) {
		return this.each(function() {
			new DumbSlider(this, options).init();
		});
	};

})( jQuery, window );
