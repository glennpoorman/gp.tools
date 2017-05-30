// -----------------------------------------------------------------------------
// gp.slideshow.js
//
// JavaScript slideshow tools.
//
// (C)2012, Glenn Poorman, All Rights Reserved
// -----------------------------------------------------------------------------

// "Gp" is the topmost global variable/namespace for the various toolsets under
// poorman.ws. Depending on how many other JS files have already been pulled in,
// the top level object may or may not already exist. If it is undefined, then
// create the initial object now.
//
if (Gp === undefined)
{
    var Gp = {}
}

// Extend the top level "Gp" object adding the "Tools property.
//
$.extend(Gp, {

    Slideshow : {

        // Function puts an image into a slide set. The image is put into the
        // specified slide group. The placement is done within the element that
        // is identified by the given id. The last parameter is the slide object
        // representing the data used for placement.
        //
        // The slide object can contain the following properties.
        //
        //     {
        //         "caption"     - Thumbnail caption.
        //         "description" - Full description to appear in popup.
        //         "align"       - Thumbnail alignment. Values can be:
        //
        //                             "left"    - align left
        //                             "right"   - align right
        //                             "none"    - no alignment (default)
        //                             "inherit" - inherit from parent.
        //                             "hidden"  - no thumbnail display.
        //     }
        //
        // Note that the slide can be empty or any of the fields can be left off
        // in which case the strings default to empty and the alignment defaults
        // to "none".
        // 
        addSlide : function(group, id, slide) {

            // Make sure we have an object even if it is empty.
            //
            slide = slide || {};

            // Locate the element identified by the input id. We'll call this the
            // slide element. Make sure the element uses the "slide_image" class.
            //
            var slideElement = document.getElementById(id);
            slideElement.className = "slide_image";

            // Create a lightbox anchor element. Set the image name based on the
            // id and set the title based on the description from the slide
            // object.
            //
            var anchor = document.createElement("A");
            anchor.href = id + ".jpg";
            anchor.rel = "lightbox[" + group + "]";
            anchor.title = slide.description || "";

            // Add the anchor to the slide element.
            //
            slideElement.appendChild(anchor);

            // If the align property is "hidden", that means we're creating an
            // anchor in order to get a photo into the collection but we're not
            // actually displaying the anchor on the page so set the slide
            // element's display to "none".
            //
            if (slide.align === "hidden")
            {
                slideElement.style.display = "none";
            }

            // If the align property is anything else, then we want to display
            // a thumbnail image in the anchor.
            //
            else
            {
                // Create an image element. Set the image name based on the slide
                // id and add the image to the anchor element.
                //
                var image = document.createElement("IMG");
                image.title = "Click to enlarge";
                image.src = id + "_tn.jpg";
                anchor.appendChild(image);

                // Create span element so we can add the caption property to the
                // thumbnail image.
                //
                var span = document.createElement("SPAN");
                span.innerHTML = slide.caption || "";

                // Add the new span to the slide element and also add a line
                // break so the caption appears underneath the thumbnail.
                //
                slideElement.appendChild(document.createElement("BR"));
                slideElement.appendChild(span);

                // Set the slide "float" property based on the align property
                // from the slide.
                //
                slideElement.style.float = slide.align || "none";
            }
        },

        // Function will load a series of slide data objects from the specified
        // JSON file and add the slides to elements on the current web page. This
        // needs to be setup just right using the following criteria.
        //
        // 1. The object in the JSON file uses the following format:
        //
        //        {
        //            "group" : "group name string",
        //            "data"  : [{
        //                          "caption"     : "Thumbnail caption for slide 1.
        //                          "description" : "Description of slide 1",
        //                          "align"       : "Alignment for slide 1"
        //                       },
        //                       {
        //                          "caption"     : "Thumbnail caption for slide n",
        //                          "description" : "Description of slide n",
        //                          "align"       : "Alignment for slide n"
        //                       }]
        //        }
        //
        //    The "data" array can contain any number of slides. The slides
        //    objects are the same as the ones in the description of the
        //    "addSlide" method. As was the case with that method, any of the
        //    properties for any given slide object in the JSON can be left off
        //    in which case the caption and descriptions default to empty
        //    strings and the align defaults to "none". Note that for any slide
        //    where the desire is to leave off all three properties, an empty
        //    object must still be present in the array.
        //
        // 2. For each slide, it is assumed that there is an image file on the
        //    disk named "prefix_n.jpg" where "prefix" is a function parameter
        //    and "n" is the slide's index in the array. For example, the 1st
        //    image file in a collection whose prefix is "slide" would be
        //    "slide_1.jpg".
        //
        // 3. For any slide whose align property is not "hidden", it is assumed
        //    that there is a thumbnail image file on the disk named
        //    "prefix_n_tn.jpg" where "prefix" is a function function parameter
        //    and "n" is the slide's index in the array.
        //
        // 4. In the web page itself, it is assumed that there are as many div
        //    elements as there are slides in the array. The elements have the
        //    format:
        //
        //        <div id="prefix_n"></div>
        //
        //    Where "prefix" is a function parameter and "n" is the slide's
        //    index in the array.
        //
        fromJSON : function(jsonURL, idPrefix) {

            // Use the jQuery function to fetch the json file specified in the
            // input URL and specify the function to be called once the JSON is
            // loaded and parsed.
            //
            $.getJSON(jsonURL, function(slides) {

                // Loop through all of the slides specified in the json and add
                // them to the page.
                //
                for (var i = 0; i < slides.data.length; i++) {

                    var id = idPrefix + "_" + (i + 1);
                    Gp.Slideshow.addSlide(slides.group, id, slides.data[i]);
                }
            });
        }
    }
});

// On document load, look for a JSON file in the current folder named
// "slides.json" and attempt to load the slides into the current page.
//
$(function () {

    Gp.Slideshow.fromJSON("slides.json", "slide");
});
