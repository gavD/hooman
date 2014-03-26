    var noBots = new hOOmanTest($("demo"), {
    callback: function(state) {
    if (state) {
    // success!
    this.instructions.set("html", "We appreciate it, you can now continue and submit your form.");
    // add a field to the form that can show the processor the test has passed.
    $("someForm").adopt(new Element("input", {
    "type": "hidden",
    "name": "captcha",
    "value": this.mover.name
    }));
    // do something else like, enable the submit button.
    }
    else // dropped it elsewhere, tease / lead them.
    this.instructions.set("html", "No, no, no! Drag and drop the <strong>"+this.mover.name+"</strong> into the BOX!");
    }
    });
	
	