// I just had to add some divs and formatting and server side processing to make it all work.

// I have these CSS styles defined:

.displayinline {display: inline;}
.fontsize10pt {font-size: 10pt; }
#addcb {width: 20px;} 

// This is the HTML to contain the checkbox and text shown to the visitor:

<div class=”fontsize10pt” align=”center”> <div id=”addcb” class=”displayinline”></div> I am not a spam bot. </div> 

// Here’s the javascript to create the checkbox:

<script language=”JavaScript” type=”text/javascript”> var checkbox = document.createElement(“input”); checkbox.type = “checkbox”; checkbox.name = “verifycheckbox”; checkbox.value= “1?;

var div = document.getElementById(“addcb”); div.appendChild(checkbox);

checkbox.checked = false; </script>

// All you have to do once the form is submitted is to check for the existence of form.verifycheckbox. If this variable doesn’t exist, the user didn’t click the checkbox so redirect them back to the form.

// Pretty simple solution. This is much easier for a human visitor and spambots won’t see the checkbox.

// I’ll monitor the performance of this technique and let you know how it goes on our live web site.