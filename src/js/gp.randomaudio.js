// Extend the top level "Gp" object adding the "RandomAudio" property.
//
$.extend(Gp, {

    RandomAudio : {

        // Function adds an audio player to the page as a child of the given container element
        // and randomly selects the audio file from an input list of audio files to choose from.
        //
        // id   - id of the container element where the audio element will be inserted.
        // data - JSON data containing the data required to create the audio player.
        //
        // The data object can contain the following properties.
        //
        //     {
        //       /* [optional] Play on load.
        //        * @type Boolean (default = "false")
        //        */
        //       "autoplay" : "false",
        //
        //       /* [optional] Initial volume.
        //        * @type Integer (0 to 100, default = 80)
        //        */
        //       "volume" : null,
        //
        //       /* [required] Audio file data.
        //        * Array of audio file objects.
        //        */
        //       "data" :
        //       [
        //         {
        //           /* [required] Audio file url.
        //            * @type String
        //            */
        //           "url" : null,
        //
        //           /* [optional] Title.
        //            * @type String
        //            */
        //           "title" : null,
        //
        //           /* [optional] Artist.
        //            * @type String
        //            */
        //           "artist" : null,
        //
        //           /* [optional] Album.
        //            * @type String
        //            */
        //           "album" : null,
        //         }
        //       ]
        //     }
        //
        addPlayer : function(id, data)
        {
            // Calculate an index into the array of files to choose from based on the length
            // of that array and a random number.
            //
            var index = (Math.floor(Math.random() * data.data.length));

            // Fetch the file object from the array and add the "autoplay" and "volume" properties
            // specified in the parent object. Note that we don't have to check if these were
            // specified as they are also optional in the function we call to actually add the
            // player to the page.
            //
            var file = data.data[index];
            file.autoplay = data.autoplay;
            file.volume = data.volume;

            // Call the audio player function to add the player to the page.
            //
            Gp.AudioPlayer.addPlayer(id, file);
        },

        // Function will load data for adding a random audio player to the page from the specified
        // JSON file.
        //
        // jsonURL - url of the JSON file to load.
        //
        // Note that the format of the data in the file shown below is virtually identical to the
        // format of the "data" object in the "addPlayer" function except that the JSON object in
        // the file must also contain the "id" of the element that will contain the audio player.
        //
        //     {
        //       /* [required] id of the element that will contain the audio player.
        //        * @type String
        //        */
        //       "id" : null,
        //
        //       /* [optional] Play on load.
        //        * @type Boolean (default = "false")
        //        */
        //       "autoplay" : "false",
        //
        //       /* [optional] Initial volume.
        //        * @type Integer (0 to 100, default = 80)
        //        */
        //       "volume" : null,
        //
        //       /* [required] Audio file data.
        //        * Array of audio file objects.
        //        */
        //       "data" :
        //       [
        //         {
        //           /* [required] Audio file url.
        //            * @type String
        //            */
        //           "url" : null,
        //
        //           /* [optional] Title.
        //            * @type String
        //            */
        //           "title" : null,
        //
        //           /* [optional] Artist.
        //            * @type String
        //            */
        //           "artist" : null,
        //
        //           /* [optional] Album.
        //            * @type String
        //            */
        //           "album" : null,
        //         }
        //       ]
        //     }
        // 
        fromJSON : function(jsonURL)
        {
            // Save "this" so we can use it inside our function definition below.
            //
            var _this = this;

            // Use the jQuery function to fetch the json file specified in the input URL and specify
            // the function to be called once the JSON is loaded and parsed.
            //
            $.getJSON(jsonURL, function(data) {
                _this.addPlayer(data.id, data);
            });
        }
    }
});
