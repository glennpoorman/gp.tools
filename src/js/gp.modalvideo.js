// Extend the top level "Gp" object adding the "ModalVideo" property.
//
$.extend(Gp, {

    ModalVideo : {

        // Function adds a modal video to the page as a child of the given container element using
        // the data in the given JSON video object.
        //
        // id         - id of the container element where the video element will be inserted.
        // modalVideo - JSON modal video object contains the modal video data.
        //
        // The modal video object can contain the following properties.
        //
        //     {
        //       /* [required] YouTube video id.
        //        * @type String
        //        */
        //       "vid" : null,
        //
        //       /* [required] Thumbnail image.
        //        * @type String
        //        */
        //       "thumb" : null,
        //
        //       /* [required] Title.
        //        * @type String
        //        */
        //       "title" : null,
        //
        //       /* [optional] Description.
        //        * @type String
        //        */
        //       "desc" : null
        //     }
        //
        addVideo : function(id, video)
        {
            // Make sure we have an object even if it is empty.
            //
            video = video || {};

            // A thumbnail image is required. Do nothing if none was specified.
            //
            if ("thumb" in video)
            {
                // We want to start by loading the thumbnail image as we need its size to determine
                // how to center the play button. The rest of the code will occur within the "onload"
                // function for the thumbnail image.
                // 80x56 - 40x28
                var img = new Image();
                img.onload = function() {

                  // Determine the ideal width and height of the play button. The default image
                  // is 80x56. That image is 25% in width and 31% in height of a video thumbnail
                  // that measures 320x180. Those are our base numbers then so, no matter what
                  // the width and height of the play button image (which is customizable), we'll
                  // force it's width and height to 25% of the width and 31% of the height of the
                  // video thumbnail (an aspect ration of approximately 1.43 to 1).
                  playX = this.width * 0.25;
                  playY = this.height * 0.31;

                  // Determine the positioning for the play button by cutting the thumbnail in half in
                  // both the vertical and horizontal direction and subtracting half the dimensions of
                  // the play button image.
                  //
                  buttonLeft = (this.width / 2) - (playX / 2);
                  buttonTop  = (this.height / 2) - (playY / 2);

                  // Fetch the container identified by the input id and make sure to add the proper
                  // video container class name.
                  //
                  var container = $("#" + id).addClass("gp-video-container");

                  // Create a div element that will be the video button (made up of the thumbnail
                  // and play button images) and append it to the container. Note the video id
                  // being set as an attribute which the "modal-video" package will use to locate
                  // the desired id.
                  //
                  var videoButton = $("<div>").addClass("gp-video-button").
                                               attr("data-video-id", video.vid).
                                               appendTo(container);

                  // Create an image tag using the input thumbnail image url as content and append
                  // it to the new video button object.
                  //
                  $("<img>").prop("src", video.thumb).appendTo(videoButton);

                  // Create another image tag to represent the "play" button. Set the class on the
                  // tag to assure we can position the button properly. Then use the positioning values
                  // we calculated above to set the absolute left and top values. The CSS spec takes
                  // care of loading the play button image.
                  //
                  $("<img>").addClass("gp-play-button").
                             css("left", buttonLeft).
                             css("top", buttonTop).
                             css("width", playX).
                             css("height", playY).
                             appendTo(videoButton);

                  // Create a header tag (H3) to hold the video title and set the title from the
                  // input video object.
                  //
                  $("<h3>").text(video.title).appendTo(container);

                  // Append the description to the end of the container.
                  //
                  $(container).append(video.desc);

                  // Call the method in the "modal-video" package to activate the button.
                  //
                  $(videoButton).modalVideo();
                }

                // Set the source on the image to trigger the loading and set everything in motion.
                //
                img.src = video.thumb;
            }
        },

        // Function will load a series of modal video objects from the specified JSON file and adds
        // the videos to elements on the current web page.
        //
        // jsonURL = url of the JSON file to load.
        //
        //     {
        //       /* [optional] Common id of all container elements minus the index.
        //        * @type String (default = "gp-modal-video")
        //        */
        //       "prefix" : null,
        //
        //       /* [required] Video data.
        //        * Array of modal video objects
        //        * Same format as objects in "addVideo"
        //        */
        //       "data" :
        //       [
        //         {
        //           modal video 1
        //         },
        //         {
        //           modal video n
        //         }
        //       ]
        //     }
        //
        // It is assumed that there are as many container elements on the web page as there are
        // videos in the array. The elements have the following format:
        //
        //     <div id="prefix-n"></div>
        //
        // Where "prefix" is a JSON property and "n" is the audio object's index in the array.
        //
        fromJSON : function(jsonURL) {

            // Save "this" so we can use it inside our function definition below.
            //
            var _this = this;

            // Use the jQuery function to fetch the json file specified in the input URL and specify
            // the function to be called once the JSON is loaded and parsed.
            //
            $.getJSON(jsonURL, function(videoGroup) {

                // Loop through all of the video objects specified in the json and add modal
                // videos for each one to the page.
                //
                for (var i = 0; i < videoGroup.data.length; i++)
                {
                    // Create the container element id based on the prefix and sequence number
                    //
                    var id = videoGroup.prefix || "gp-modal-video"
                    id = id + "-" + (i + 1);

                    // Add the video element to the page.
                    //
                    _this.addVideo(id, videoGroup.data[i]);
                }
            });
        }
    }
});