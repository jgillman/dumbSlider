DumbSlider
=============

A really dumb jQuery plugin for stupid slideshows.

What you need
------------

You will need the following to start using DumbSlider.

* jQuery 1.7
* An element with a few images in it (a `div` will do)
* A few styles for aforementioned `div`
  (height, width, overflow:hidden should be fine)

Usage
------------

Make a block level container (like a div) and put some images in that thing.
```html
<div class="myDumbSlides">
  <img src="/image/0.png">
  <img src="/image/1.png">
  <img src="/image/2.png">
</div>
```

Apply some baseline css.
```css
.myDumbSlides {
  width: 600px;
  height: 400px;
  overflow: hidden;
}
.myDumbSlides img {
  float: left;
}
```

Hook up the JavaScript.
```javascript
$('.myDumbSlides').dumbSlider({
  nextButton: '#next',
  prevButton: '#previous'
});
```

Why I made it
------------

I found myself creating the same dumb slideshow over and over. All I
want is to throw a bunch of dumb images in a stupid div, apply some JS
and be on my way.

### Next and previous buttons?

Make them yourself. Half of the sliders out there try to make buttons
for you or force you to use a specific naming convention. That's dumb.
**Just make them and tell the plugin what the selector is.**

### Fancy transitions?

I wanted a dumb slideshow not a PowerPoint.

### Little dots or page numbers?

Too hard. If you want that fork *this*.

Contributing
------------

Seriously though, if you want to contribute please do! Improvements
are welcome though major features will probably be ignored.

Who are you again?
------------

I'm [Joel Gillman](http://joelgillman.com/).