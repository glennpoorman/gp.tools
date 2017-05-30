// Extend the top level "Gp" object adding the "Basic" property.
//
$.extend(Gp, {

    // The "Basic" property contains all of the useful JS tools for this set.
    //
    Basic : {

        // Function returns true if the browser appears to support HTML5.
        //
        checkForHTML5 : function () {

            // Create a canvas element and then look for a canvas attribute that would only exist
            // if the canvas (introduced in HTML5) were fully supported (i.e. the "getContext"
            // function). Note that the element creation will always succeed but if the attribute
            // isn't there, we can assume we have no HTML5 support.
            //
            return ($("<canvas>")[0].getContext) ? true : false;
        },

        // Function will look for an element on the page identified by a given id and add an email
        // link to that element for display on the page.
        //
        //   id     - id of the element to add the email link to.
        //   user   - user name portion of email address.
        //   domain - domain name portion of email address.
        //   link   - [optional] link text (defaults to email address).
        //
        emailLink : function(id, user, domain, link) {

            // Create the link text and add the email address to the element.
            //
            Gp._emLink("#" + id, user, domain, link);
        },

        // Function will look for all elements in the page that use the class "gp-send-mail". For
        // each element, look for custom data attributes for the user name, domain name, and optional
        // link text and then use those attributes to add an email link to the element for display
        // on the page.
        //
        fixEmailLinks : function() {

            // Loop through all elements using the class "gp-send-mail".
            //
            $(".gp-send-mail").each(function(i, obj) {

                // Extract the user name, domain name, and link text custom attributes.
                //
                var user = $(obj).data("user");
                var domain = $(obj).data("domain");
                var link = $(obj).data("link");

                // Create the link text and add the email address to the element.
                //
                Gp._emLink(obj, user, domain, link);
            });
        },

        // Function checks to see if the browser has basic HTML5 support and it not, looks for an
        // element with the id "gp-upgrade" and displays a message asking the user to upgrade.
        //
        html5Message : function() {

            // First see if the browser supports HTML5. If it does we're done.
            //
            if (this.checkForHTML5() === false)
            {
                // Check to see if the user set a custom attribute specifying the message to
                // display. If not, use the default.
                //
                var msg = $("#gp-upgrade").data("message") || "Please upgrade your browser to support HTML5";

                // Display the message in the element with the id "gp-upgrade" and also make sure
                // the display for that element is set to "block".
                //
                $("#gp-upgrade").html(msg).css("display", "block");
            }
        },

        // Function looks for an element with the id "gp-copyright" and if one exists, inserts a
        // copyright message for display on the page. The message is always based on the current
        // year. The copyright attribution should be specified using the "data-who" attribute spec.
        //
        //     <span id="gp-copyright" data-who="Richard Nixon"></span>
        //
        insertCopyright : function () {

            // The copyright attribute can be specified on the span element by using the attribute
            // spec data-who="whoever holds the copyright". See if that attribute has been specified
            // on the span element. Default to me if it hasn't.
            //
            var who = $("#gp-copyright").data("who") || "Glenn Poorman";

            // Fetch today's date.
            //
            var now = new Date();

            // Create the copyright message using the current year and the attribute and set the
            // message on the span element.
            //
            var msg = "&copy;" + now.getFullYear() + ", " + who + ", All Rights Reserved";
            $("#gp-copyright").html(msg);
        },

        // Function opens up another browser window containing the specified file.
        //
        // url        - url of the file to open in the new browser window.
        // width      - width of the new browser window.
        // height     - height of the new browser window.
        // scrollbars - whether or not to display scrollbars.
        //
        openWindow : function(url, width, height, scrollbars) {

            var s = (scrollbars == true) ? "1" : "0";
            var options = "width=" + width + ",height=" + height + ",resizable=1,scrollbars=" + s;
            window.open(url, "", options);
        },

        // Function displays a random image from a collection of images.
        //
        // id       - id of the <img> element that will display the random image.
        // howmany  - number of images in the collection to choose from.
        // location - location of the images (optional, default = same as page).
        // suffix   - suffix of the image file (optional, default = "jpg").
        //
        // The names of the images must follow a specific criteria in order for this to work. The
        // images are named using the image element id followed by a dash and a 1-based index. For
        // example, if you have a collection of six jpg images and the image element id where you
        // want them displayed is "picture", then the images must be named:
        //
        //     picture-1.jpg
        //     picture-2.jpg
        //     picture-3.jpg
        //     picture-4.jpg
        //     picture-5.jpg
        //     picture-6.jpg
        //
        // If those pictures reside in a sub-folder relative the current folder named "pics", then
        // the call to display the random image would look like:
        //
        //     Gp.Basic.randomImage("picture", 6, "pics", "jpg");
        //
        // Or since the last parameter defaults to "jpg", you could also write:
        //
        //     Gp.Basic.randomImage("picture", 6, "pics");
        //
        // And if the images resided in the same location as the page, you could write:
        //
        //     Gp.Basic.randomImage("picture", 6);
        //
        randomImage : function(id, howmany, location, suffix) {

            var index = (Math.floor(Math.random() * howmany)) + 1;
            var folder = location || ".";
            var sfx = suffix || "jpg";
            var name = folder + "/" + id + "-" + index + "." + sfx;
            $("#" + id).prop("src", name);
        },

        // Function is used to place a simple popup image into a web page.
        //
        // id          - id of the element to contain the image and the relative url of the image file.
        // caption     - caption to display under the thumbnail image.
        // thumbscale  - scale applied to image width and height for thumbnail display.
        // float       - CSS "float" property to set on the element (optional, default = "none").
        // description - text that will appear in the LightBox window when the image is selected.
        //
        // It is assumed that the specified image file is the full sized image file, it will be
        // downsized for the thumbnail, and displayed full size when it is clicked.
        //
        // NOTE: Currently this function uses "lightbox" to display the full sized image and it is
        //       assumed that the lightbox JS file is loaded.
        //
        // The placement itself is done within the element specified by the given id. It is also
        // assumed that the given id is the relative URL of the image file. For example, if you want
        // to display an image called "my_pic.jpg" that resides in a sub-folder named "images", you
        // would put an element such as the following in your page:
        //
        //     <div id="images/my_pic.jpg"></div>
        //
        // The other parameters of the function are a caption that will appear under the thumbnail,
        // the scale that will be applied to the image width and height for thumbnail display, and
        // an optional float property (also for the thumbnail).
        //
        // So going back to the example above, let's say that "my_pic.jpg" is a 450x300 image and
        // we want to display it in the page as a 180x120 thumbnail floated right. The following
        // call would achieve this.
        //
        //     Gp.Basic.simpleImage("images/my_pic.jpg", "My Pic", 0.4, "right");
        //
        // Also note that the file suffix in the id is optional. If no file suffix is given it is
        // assumed that the file is a ".jpg" file. So in the above example, the element and the call
        // could be written:
        //
        //     <div id="images/my_pic"></div>
        //
        //     Gp.Basic.simpleImage("images/my_pic", "My Pic", 0.4, "right");
        //
        // This call can be made inline right after the original element in the HTML or it can be
        // made in a document ready event handler (the latter is recommended).
        //
        simpleImage : function(id, caption, thumbscale, float, description) {

            // Locate the element identified by the input id. Make sure the element uses the
            // "gp-simple-image" class and set the "float" property.
            //
            var container = $("#" + id).prop("className", "gp-simple-image").css("float", float || "none");

            // See if the id contains a commonly supported image file suffix. If not, assume
            // the function was called with no suffix and use ".jpg".
            //
            var fileSuffix = id.substr((id.lastIndexOf(".") + 1)).toUpperCase();
            if (!(fileSuffix == "JPG" ||
                  fileSuffix == "GIF" ||
                  fileSuffix == "PNG" ||
                  fileSuffix == "BMP" ||
                  fileSuffix == "TIF" ||
                  fileSuffix == "TIFF"))
            {
                id = id + ".jpg";
            }

            // Create a lightbox anchor element. Set the image name based on the id and set the
            // "rel" property so that lightbox will be used to display the image when clicked.
            // Append the new anchor to the container.
            //
            var anchor = $("<a>").prop("href", id).
                                  prop("rel", "lightbox").
                                  prop("title", description || "").
                                  appendTo(container);

            // Create an image element and append it to the anchor. This will be the thumbnail.
            //
            var image = $("<img>").prop("title", "Click to enlarge").appendTo(anchor);

            // Set the image name based on the id and set the image width and height.
            //
            Gp._sizedImg(image, id, thumbscale);

            // Lastly, append a line break and a span element to the container to hold the optional
            // short description of the image.
            //
            $("<br>").appendTo(container);
            $("<span>").html(caption || "").appendTo(container);
        }
    }
});
