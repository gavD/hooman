var formID = 'hoomans';

var noBots = new hOOmanTest($(formID), {
    callback: function(state) {
        if (state) {
            // success! 
            this.instructions.set("html", "We appreciate it, you can now continue and submit your form.");

            // add a field to the form that can show the processor the test has passed. 
            $(formID).adopt(new Element("input", {
                "type": "hidden",
                "name": "foobarbaz", // nb I would change this to something unusual. GD.
                "value": this.mover.name
            }));

            // do something else like, enable the submit button. 
        }
        else // dropped it elsewhere, tease / lead them. 
            this.instructions.set("html", "No, no, no! Drag and drop the <strong>"+this.mover.name+"</strong> into the BOX!");
    }
});