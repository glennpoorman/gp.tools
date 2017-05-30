// -----------------------------------------------------------------------------
// gp.tools.js
//
// Miscellaneous JavaScript tools created for the poorman.ws websites.
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

    // The "Tools" property contains a handful of tools used throughout the
    // various web pages.
    //
    Tools : {

        // Function checks to see if the page is being viewed via a mobile web
        // browser.
        //
        isMobileBrowser : function() {

            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        },

        // Function will check to see if the browser is mobile and redirect to
        // the specified url if it is.
        //
        mobileRedirectTo : function(url) {

            if (Gp.Tools.isMobileBrowser())
            {
                window.location = url;
            }
        },

        // Function checks for very basic HTML5 support.
        //
        // We do this by creating a canvas element and then looking for a canvas
        // attribute that would only exist if the canvas was supported (i.e. the
        // "context" attribute). The element creation will always succeed but if
        // the attribute isn't there, we can assume we have no HTML5 support. 
        //
        checkForHTML5 : function () {

            return (document.createElement("canvas").getContext) ? true : false
        },

        // Function checks to see if the browser has basic HTML5 support and it
        // not, looks for an element with the id "upgrade" and displays a message
        // asking the user to upgrade.
        //
        html5Message : function() {

            if (Gp.Tools.checkForHTML5() === false)
            {
                $("#upgrade").html("<br><br><b>Please upgrade your browser to support HTML5</b>");
            }
        },

        // Function will insert a copyright message into the page if an element
        // exists with a specific id for it. The copyright message is always
        // based on the current year.
        //
        insertCopyright : function () {

            var now = new Date();
            $("#copyright").html("&copy;" + now.getFullYear() + ", Glenn Poorman, All Rights Reserved");
        },

        // Function will look for an element on the page identified by the given
        // id and add an email link to that element using the named user, domain,
        // and link text. If no link text is specified, we use the email address
        // as the link text.
        //
        emailLink : function(id, user, host, link) {

            var linkText = link || user + "@" + host;
            $(id).html("<a hre" + "f=ma" + "ilto:" + user + "@" + host + ">" + linkText + "</a>");
        },

        // Function is used to place a simple popup image into a web page. It is
        // assumed that only a single image file exists and it will be downsized
        // for the thumbnail and then displayed full size when it is clicked.
        //
        // NOTE: Currently this function uses "lightbox" to display the image and
        //       and it is assumed that the lightbox JS file is loaded.
        //
        // The placement itself is done within the element specified by the
        // given id. It is also assumed that the given id is the relative URL of
        // the image file minus the ".jpg" suffix. For example, if you want to
        // display an image called "my_pic.jpg" that resides in a sub-folder
        // named "images", you would put an element such as the following in your
        // page:
        //
        //     <div id="images/my_pic"></div>
        //
        // The other parameters of the function are an optional caption that will
        // appear under the thumbnail, a thumbnail width and height property, and
        // an alignment property (also for the thumbnail).
        //
        // So going back to the example above, to display a 180x120 thumbnail of
        // the image aligned right, you would make a call that looks like:
        //
        //     Gp.Tools.simpleImage("images/my_pic", "My Pic", 180, 120, "right);
        //
        // This call can be made inline right after the original element in the
        // HTML or it can be made in a document ready event handler (the latter
        // is recommended).
        //
        simpleImage : function(id, caption, width, height, align) {

            // Locate the element identified by the input id. We'll call this the
            // image element. Make sure the element uses the "slide" class. Also
            // go ahead and set the "float" property.
            //
            var imageElement = document.getElementById(id);
            imageElement.className = "simple_image";
            imageElement.style.float = align || "none";

            // Create a lightbox anchor element. Set the image name based on the
            // id and set the "rel" property so that lightbox will be used to
            // display the image when clicked.
            //
            var anchor = document.createElement("A");
            anchor.href = id + ".jpg";
            anchor.rel = "lightbox";

            // Append the anchor to the slide element.
            //
            imageElement.appendChild(anchor);

            // Create an image element. This will be the thumbnail. Set the image
            // named based on the id and set the image width and height.
            //
            var image = document.createElement("IMG");
            image.title = "Click to enlarge";
            image.src = id + ".jpg";
            image.width = width;
            image.height = height;

            // Append the image to the anchor element.
            //
            anchor.appendChild(image);

            // Create span element so we can add the short description to the
            // thumbnail image.
            //
            var span = document.createElement("SPAN");
            span.innerHTML = caption || "";

            // Add the new span to the iamge and also add a line break to the
            // text displays on a new line.
            //
            imageElement.appendChild(document.createElement("BR"));
            imageElement.appendChild(span);
        },

        // Function displays a random image from a collection. The image element
        // to display the image in is identified by the "id" parameter. The
        // "howmany" parameter specified how many images are contained in the
        // collection. The "location" parameter specifies the location of the
        // images.
        //
        // The names of the images must follow the criteria in order for this to
        // work. The images are named using the element id followed by a 1-based
        // index. For example, if you have a collection of six images and the
        // image element id where you want them displayed is "picture", then the
        // images must be named:
        //
        //     picture1.jpg
        //     picture2.jpg
        //     picture3.jpg
        //     picture4.jpg
        //     picture5.jpg
        //     picture6.jpg
        //
        // If those pictures reside in a sub-folder relative the current folder
        // named "pics", then the call to display the random image would look
        // like:
        //
        //     Gp.Tools.randomImage("picture", 6, "pics");
        //
        randomImage : function(id, howmany, location) {

            var index = (Math.floor(Math.random() * howmany)) + 1;
            var name = location + "/" + id + index + ".jpg";
            $("#" + id).prop("src", name);
        },

        // Function opens up another browser window containing the specified
        // file. The added parameters are the width and height of the window as
        // well as a boolean stating whether or not to display scrollbars.
        //
        openWindow : function(file, width, height, scrollbars) {

            var s = (scrollbars === true) ? "1" : "0";
            var options = "width=" + width + ",height" + height + ",resizable=1,scrollbars=" + s;
            window.open(file, "", options);
        }
    }
});

// On document load, try to insert a copyright message into the current page.
//
$(function () {

    // Insert the copyright notice.
    //
    Gp.Tools.insertCopyright();
});
