/*
 *  Project: dumbSlider
 *  Description: A really dumb slideshow
 *  Author: Joel Gillman
 *  License: whatever
 */

;(function ( $, window, undefined ) {

    var dumbSlider = 'dumbSlider',
        document = window.document,
        defaults = {
            duration: 3000,
            nextButton: null,
            prevButton: null
        };

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = dumbSlider;

        this.init();
    }

    Plugin.prototype.init = function () {
        console.log(this.element, this.options)
        this.initContent();
        this.initEvents();
    };

    Plugin.prototype.initContent = function () {
        // wrapInner so we have a slide container that can move
        $(this.element).wrapInner('<div class="' + this.getIdentifier(this.element) + 'Wrapper" />')
    };

    Plugin.prototype.getIdentifier = function (element) {
        return this.element.id || this.element.className.split(' ')[0]
    }

    Plugin.prototype.initEvents = function () {
        // if nextButton isn't null add event
        // if prevButton isn't null add event
    };

    $.fn[dumbSlider] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + dumbSlider)) {
                $.data(this, 'plugin_' + dumbSlider, new Plugin( this, options ));
            }
        });
    };

}(jQuery, window));