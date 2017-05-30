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
            // Locate the element identified by the input id.
            //
            var container = document.getElementById(id);

            // If the element isn't found, we might be creating an album. In other words, a single
            // collection of audio elements on one container with the id "gp-audio-album". To see if
            // that's the case, try and locate an element in the HTML with that id. If we find one,
            // create a DIV element to hold the audio and add it as a child to the album element.
            //
            if (container == null)
            {
                var album = document.getElementById("gp-audio-album");
                if (album != null)
                {
                    container = document.createElement("DIV");
                    container.id = id;
                    album.appendChild(container);
                }
            }

            // Make sure the element uses the "gp-audio-container" class.
            //
            container.className = "gp-audio-container";

            // Append a span element to hold the title only if a title was specified.
            //
            if (audioFile.title != null)
            {
                var span = document.createElement("SPAN");
                span.className = "gp-audio-title";
                span.innerHTML = audioFile.title;
                container.appendChild(span);
            }

            // Create an HTML5 "audio" element. Set the id using a slightly modified version of the
            // container id, set the url, and set the autoplay property.
            //
            var player = document.createElement("AUDIO");
            player.id = id + "-player";
            player.src = audioFile.url;
            player.controls = "controls";
            player.preload = "metadata";
            if (audioFile.autoplay == "true")
                player.autoplay = true;

            // Append the new audio element to the container.
            //
            container.appendChild(player);

            // Now call into MediaElement to skin the new player.
            //
            $("#" + player.id).mediaelementplayer();

            // One the player has been skinned, we can set the volume but only if there was a
            // volume specified in the input object.
            //
            if (audioFile.volume != null)
                $("#" + player.id).prop("volume", audioFile.volume / 100.0);
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
                var album = document.getElementById("gp-audio-album");
                if (album != null && audioGroup.title != null)
                {
                    var title = document.createElement("DIV");
                    title.className = "gp-audio-album-title";
                    title.innerHTML = audioGroup.title;
                    album.appendChild(title);
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
                    Gp.AudioPlayer.addPlayer(id, audioGroup.data[i]);
                }
            });
        }
    }
});
