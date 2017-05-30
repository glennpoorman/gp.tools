// Extend the top level "Gp" object adding the "Slideshow" property.
//
$.extend(Gp, {

    Slideshow : {

        // Function inserts an image into a container element specified by id. That image is also
        // put into a named LightBox collection so that all of the images under the same collection
        // name will display as a set.
        //
        // id    - id of the container element where the image will be inserted.
        // group - the name of the collection the image is part of.
        // slide - JSON slide object.
        //
        // The slide object can contain the following properties.
        //
        //     {
        //       /* [optional] Url to image file.
        //        * @type String (default = "id.jpg")
        //        * Default is created by using the input id and assuming the file type is JPG.
        //        */
        //       "url" : null,
        //
        //       /* [optional] Thumbnail caption.
        //        * @type String
        //        */
        //        "caption" : null,
        //
        //       /* [optional] Full window description.
        //        * @type String
        //        */
        //       "description" : null,
        //
        //       /* [optional] Thumbnail float property.
        //        * @type String (default = "none")
        //        * Possible values: "left", "right", "none", "inherit", "hidden"
        //        * If "hidden", then no thumbnail is displayed.
        //        */
        //       "float" : null,
        //
        //       /* [optional] Scale applied to original image for thumbnail.
        //        * @type Number (default = none).
        //        * If no thumbscale is given, it is assumed that the thumbnail image will be in a
        //        * separate file named the same as the original with "-tn" appended to the filename.
        //        */
        //       "thumbscale" : null
        //     }
        //
        // If "float" is anything other than "hidden", a thumbnail image will be displayed on the
        // page. the displayed thumbnail will either be the original image scaled or a separate
        // image file. If the slide object has a "thumbscale" property, that property will be used
        // to scale the original image and display the thumbnail. If the "thumbscale" property is
        // not present, the function will attempt to locate a separate image file named the same
        // as the original image with "-tn" appended to the file name.
        //
        addSlide : function(id, group, slide) {

            // Make sure we have an object even if it is empty.
            //
            slide = slide || {};

            // Locate or create the slide element identified by the input id.
            //
            var slideElement = Gp._getContainer(id, "gp-slide-deck", "gp-slide-image");

            // Setup the url. If a url was specified in the slide object, use it. Otherwise
            // use the id and assume the file is a jpg file.
            //
            var url = slide.url || id + ".jpg";

            // Create a lightbox anchor element. Set the url, the group, and set the title based
            // on the description from the slide object. Append the anchor to the slide element.
            //
            var anchor = $("<a>").prop("href", url).
                                  prop("rel", "lightbox[" + group + "]").
                                  prop("title", slide.description || "").
                                  appendTo(slideElement);

            // If the float property is "hidden", that means we're creating an anchor in order to
            // get a photo into the collection but we're not actually displaying the thumbnail on
            // the page so set the slide element's display to "none".
            //
            if (slide.float === "hidden")
            {
                slideElement.css("display", "none");
            }

            // If the float property is anything else, then we want to display a thumbnail image in
            // the anchor.
            //
            else
            {
                // Create an image element and append it to the anchor.
                //
                var image = $("<img>").prop("title", "Click to enlarge").appendTo(anchor);

                // If the slide has a "thumbscale" property, then use the original image as the
                // thumbnail and scale the width/height using that value.
                //
                if (slide.thumbscale)
                {
                    Gp._sizedImg(image, url, slide.thumbscale);
                }

                // Otherwise assume there is a thumbnail image on disk. Use the original filename
                // as the thumbnail image filename but tack the string "-tn" between the filename
                // and the suffix.
                //
                else
                {
                    fileSuffix = url.substr((url.lastIndexOf(".") + 1));
                    filePrefix = url.substr(0, url.lastIndexOf("."));
                    image.prop("src", filePrefix + "-tn." + fileSuffix);
                }

                // Append a line break and a span element to the slide element to hold the optional
                // slide caption.
                //
                $("<br>").appendTo(slideElement);
                $("<span>").html(slide.caption || "").appendTo(slideElement);

                // Set the slide "float" property based on the align property from the slide.
                //
                slideElement.css("float", slide.float || "none");
            }
        },

        // Function will load a series of slide data objects from the specified JSON file and adds
        // the slides to elements on the current web page.
        //
        // jsonURL - URL of the JSON file to load.
        //
        //     {
        //       /* [required] Group/collection title.
        //        * @type String
        //        * Will be used as the LightBox collection name.
        //        */
        //       "title" : null,
        //
        //       /* [optional] Group/collection description.
        //        * @type String
        //        */
        //       "description" : null,
        //
        //       /* [optional] Common id of all container elements minus the index.
        //        * @type String (default = "slide")
        //        */
        //       "prefix" : null,
        //
        //       /* [optional] Scale applied to all slides for thumbnail display.
        //        * @type Number (default = none)
        //        * Will apply to any slide that doesn't have its own "thumbscale".
        //        */
        //       "thumbscale" : null,
        //
        //       /* [required] Slide data.
        //        * @type Array slide objects
        //        * Same format as slide object in <i>addSlide</i>
        //        */
        //       "data" :
        //       [
        //         {
        //           slide object 1
        //         },
        //         {
        //           slide object n
        //         }
        //       ]
        //     }
        //
        // It is assumed that the page contains as many container elements as there are slides in
        // the array. The elements have the format:
        //
        //        <div id="prefix-n"></div>
        //
        // Where "prefix" is a JSON parameter and "n" is the slide's index in the array.
        //
        fromJSON : function(jsonURL) {

            // Save "this" so we can use it inside our function definition below.
            //
            var _this = this;

            // Use the jQuery function to fetch the json file specified in the input URL and specify
            // the function to be called once the JSON is loaded and parsed.
            //
            $.getJSON(jsonURL, function(slides) {

                // Loop through all of the slides specified in the json.
                //
                for (var i = 0; i < slides.data.length; i++) {

                    // Create the slide id based on the sequence number.
                    //
                    var id = slides.prefix || "gp-slide";
                    id = id + "-" + (i + 1);

                    // If the slide doesn't have a suffix property but there is one for the entire
                    // group, use the group value.
                    //
                    if (slides.data[i].suffix == null && slides.suffix != null)
                        slides.data[i].suffix = slides.suffix;

                    // If the slide doesn't have a thumbscale value but there is one for the entire
                    // group, use the group value.
                    //
                    if (slides.data[i].thumbscale == null && slides.thumbscale != null)
                        slides.data[i].thumbscale = slides.thumbscale;

                    // Add the slide to the page.
                    //
                    _this.addSlide(id, slides.title, slides.data[i]);
                }
            });
        }
    }
});
