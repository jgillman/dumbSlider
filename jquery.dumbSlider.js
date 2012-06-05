
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
			autoSlideInterval: 6000,
			duration: 600,
			nextButton: null,
			prevButton: null,
			callback: null
		},

		wrapper: null,
		slideCount: 0,
		currentSlide: 0,

		init: function() {
			// Introduce defaults that can be extended either globally or using an
			// an object literal.
			this.config = $.extend({}, this.defaults, this.options, this.metadata);

			this.initContent();

			// No buttons? Better advance automatically.
			if ( !this.config.nextButton && !this.config.prevButton ) {
				this.initInterval();
			}
			else {
				this.initEvents();
			}
			
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

			this.prefixify('transition', ['margin-left ',this.config.duration,'ms'].join(''), this.wrapper);
		},

		initInterval: function() {
			var thisContext = this;

			this.slideInterval = setInterval(function() {
				thisContext.nextSlide();
			}, this.config.autoSlideInterval);
		},

		initEvents: function() {
			// Set the 'next' button event if nextButton exists
			if ( this.config.nextButton ) {
				$(this.config.nextButton).click(this, this.onNextClick);
				this.prefixify('user-select', 'none', $(this.config.nextButton));
			}

			// Set the 'previous' button event if nextButton exists
			if ( this.config.prevButton ) {
				$(this.config.prevButton).click(this, this.onPrevClick);
				this.prefixify('user-select', 'none', $(this.config.prevButton));
			}
		},

		updatePosition: function() {
			// Set margin-left 
			this.wrapper.css('margin-left', (-1 * this.$element.width() * this.currentSlide));

			if ( this.config.callback ) {
				this.config.callback(this);
			}
		},
		
		nextSlide: function() {
			this.currentSlide++;

			if ( this.currentSlide > this.slideCount - 1 ) {
				this.currentSlide = 0;
			}

			this.updatePosition();
		},

		prevSlide: function() {
			this.currentSlide--;

			if ( this.currentSlide < 0 ) {
				this.currentSlide = this.slideCount - 1;
			}

			this.updatePosition();
		},

		onNextClick: function(event) {
			var thisContext = event.data;
			thisContext.nextSlide();
		},

		onPrevClick: function(event) {
			var thisContext = event.data;
			thisContext.prevSlide();
		},

		getIdentifier: function(element) {
			return this.element.id || this.element.className.split(' ')[0]
		},

		prefixify: function(style, value, $element) {
			var prefixes = ['-webkit-','-moz-','-ms-','-o-'];
			
			for ( i in prefixes ) {
				prefix = prefixes[i];
				$element.css([prefix,style].join(''), value);
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
