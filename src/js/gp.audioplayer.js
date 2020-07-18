// Extend the top level "Gp" object adding the "AudioPlayer" property.
//
$.extend(Gp, {

    AudioPlayer : {

        // Function adds an audio player to the page as a child of the given container element using
        // the data in the given JSON audio object.
        //
        // id        - id of the container element where the audio element will be inserted.
        // audioFile - JSON audio file object contains the audio file data.
        //
        //
        // The audio file object can contain the following properties.
        //
        //     {
        //       /* [required] Audio file url.
        //        * @type String
        //        */
        //       "url" : null,
        //
        //       /* [optional] Title.
        //        * @type String
        //        */
        //       "title" : null,
        //
        //       /* [optional] Artist.
        //        * @type String
        //        */
        //       "artist" : null,
        //
        //       /* [optional] Album.
        //        * @type String
        //        */
        //       "album" : null,
        //
        //       /* [optional] Play on load.
        //        * @type Boolean (default = "false")
        //        */
        //       "autoplay" : null,
        //
        //       /* [optional] Initial volume.
        //        * @type Integer (0 to 100, default = 80)
        //        */
        //       "volume" : null
        //     }
        //
        addPlayer : function(id, audioFile)
        {
            // Locate or create the audio element identified by the input id.
            //
            var container = Gp._getContainer(id, "gp-audio-album", "gp-audio-container");

            // Append a span element to hold the title only if a title was specified.
            //
            if (audioFile.title != null)
            {
                $("<span>").prop("className", "gp-audio-title").
                            html(audioFile.title).
                            appendTo(container);
            }

            // Create an HTML5 "audio" element. Set the id using a slightly modified version of the
            // container id, set the url, and set the autoplay property.
            //
            var player = $("<audio>").prop("id", id + "-player").
                                      prop("src", audioFile.url).
                                      prop("controls", "controls").
                                      prop("preload", "metadata").
                                      prop("autoplay", (audioFile.autoplay === "true") ? true : false).
                                      appendTo(container);

            // Get the starting volume. We accept a value between 0 and 100 and will default
            // to 80 if no volume is given.
            //
            var volume = audioFile.volume || 80;

            // Now call into MediaElement to skin the new player.
            //
            $("#" + player.prop("id")).mediaelementplayer({
                startVolume : volume / 100.0
            });
        },

        // Function will load a series of audio file objects from the specified JSON file and adds
        // the audio elements to elements on the current web page.
        //
        // jsonURL = url of the JSON file to load.
        //
        //     {
        //       /* [optional] Collection/album title.
        //        * @type String
        //        */
        //       "title" : null,
        //
        //       /* [optional] Artist.
        //        * @type String
        //        */
        //       "artist" : null,
        //
        //       /* [optional] Common id of all container elements minus the index.
        //        * @type String (default = "gp-audio-container")
        //        */
        //       "prefix" : null,
        //
        //       /* [required] Audio file data.
        //        * Array of audio file objects
        //        * Same format as audio object in "addPlayer"
        //        */
        //       "data" :
        //       [
        //         {
        //           audio object 1
        //         },
        //         {
        //           audio object n
        //         }
        //       ]
        //     }
        //
        // It is assumed that there are as many container elements on the web page as there are
        // audio object in the array. The elements have the following format:
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
            $.getJSON(jsonURL, function(audioGroup) {

                // Before running through the audio files, see if we're creating an album. Look for
                // an element on the page with the id "gp-audio-album", if we find it and if the
                // incoming JSON has specified a "title" property, then create an internal DIV
                // element to contain the title. Make sure the title uses the "gp-audio-album-title"
                // class name.
                //
                var album = $("#gp-audio-album");
                if (album.length !== 0 && audioGroup.title != null)
                {
                    $("<div>").prop("className", "gp-audio-album-title").
                               html(audioGroup.title).
                               appendTo(album);
                }

                // Loop through all of the audio file objects specified in the json and add audio
                // players for each one to the page.
                //
                for (var i = 0; i < audioGroup.data.length; i++)
                {
                    // Create the container element id based on the prefix and sequence number
                    //
                    var id = audioGroup.prefix || "gp-audio-container"
                    id = id + "-" + (i + 1);

                    // Add the audio element to the page.
                    //
                    _this.addPlayer(id, audioGroup.data[i]);
                }
            });
        }
    }
});
