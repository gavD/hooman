// class:           hOOmanTest
// version:         0.9
// dependencies:    mootools 1.2.3 core, 1.2.3 more (Drag.js)
// tested on:       FireFox 3, IE7, Safari 4 (beta), Opera 9.60
// last updated:    26/06/2009
// url:             http://fragged.org/
// author:          dimitar chrostoff <christoff@gmail.com>
// authorised use:  modify and use as you deem fit. any link back appreciated :)

var hOOmanTest = new Class({
    Implements: [Events,Options],
    initialize: function(el, options) {
        // set default options...
        this.setOptions($merge({
            messageHtml: "Prove you're human and drag the <strong>[what]</strong> below into the BOX",
            messageClass: "botMessage", // needed in css
            images: [{              // images to be dragged and their names
                name: "CUBES",
                src: "images/cubes.png"
            },
            {
                name: "PAPER",
                src: "images/news.png"
            },
            {
                name: "PLUS",
                src: "images/plus.png"
            },
            {
                name: "CONE",
                src: "images/cone.png"
            }],
            background: {
                url: "images/nobots.gif",
                width: 289,
                height: 118
            },
            callback: $empty // a function to run after drop, args: human(bool), this(bound object instance)
        }, options));


        this.element = $(el); // the target element
        this.createTest();
    },
    createTest: function() {
        // figure out what to move first
        if (this.container)
            this.container.dispose();

        this.human = false;

        if (!this.element)
            return false;

        // need two that show
        this.mover = this.options.images.getRandom();
        this.dummy = this.options.images.erase(this.mover).getRandom();

        this.container = new Element("div", {
            styles: {
                background: "url("+this.options.background.url+") no-repeat",
                width: this.options.background.width,
                height: this.options.background.height
            }
        });

        this.instructions = new Element("div", {
            html: this.options.messageHtml.replace("[what]", this.mover.name)
        }).addClass(this.options.messageClass).inject(this.container);

        this.dropper = new Element("div", {
            "class": "dropper"
        }).inject(this.container);


        this.container.inject(this.element);
        (function() {
            var coords = this.dropper.getCoordinates();

            this.mover.object = new Element("div", {
                styles: {
                    background: "url("+this.mover.src+") no-repeat",
                    width: 48,
                    height: 48,
                    position: "absolute",
                    top: coords.top,
                    left: coords.left - 120,
                    cursor: "move"
                }
            }).injectAfter(this.dropper);

            this.dummy.object = new Element("div", {
                styles: {
                    background: "url("+this.dummy.src+") no-repeat",
                    width: 48,
                    height: 48,
                    position: "absolute",
                    top: coords.top,
                    left: coords.left - 65
                }
            }).injectAfter(this.dropper);


            if (Browser.Engine.trident)
                this.mover.object.setOpacity(1);
            else
                this.mover.object.fade(0,1);

            var myDrag = new Drag.Move(this.mover.object, {
                droppables: [this.dropper],
                container: this.container,
                onDrop: function(el, droppable, event) {
                    if (!droppable) {
                        this.options.callback.run(false, this);
                        return false;
                    }

                    droppable.adopt(el.clone().setStyles({
                        top: 0,
                        left: 0,
                        position: "relative",
                        cursor: "default"
                    }));

                    this.human = true;
                    this.mover.object.dispose();
                    this.options.callback.run(true, this);
                    this.fireEvent("passed");
                }.bind(this),
                onEnter: function(el, droppable) {


                }
            });
        }).delay(1000, this);
    },
    passed: function() {
        this.fireEvent("passed");
    }

});