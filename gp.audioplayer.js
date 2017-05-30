// -----------------------------------------------------------------------------
// gp.audioplayer.js
//
// JavaScript audio player tools.
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

// Extend the top level "Gp" object adding the "AudioPlayer" property.
//
$.extend(Gp, {

    AudioPlayer : {

        // Function will load a series of audio file objects from the specified
        // JSON file and call the method to add an audio player for each audio
        // file in the array. The JSON needs to be setup just right using the
        // following criteria.
        //
        // 1. The object in the JSON file uses the following format:
        //
        //        {
        //            "title" : "Group title string (currently unused)",
        //            "data"  : [{
        //                           "title" : "Title for audio file 1",
        //                           "url"   : "Url for audio file 1"
        //                       },
        //                       {
        //                           "title" : "Title for audio file n",
        //                           "url"   : "Url for audio file n"
        //                       }]
        //        }
        //
        //    The "data" array can contain any number of audio file objects. The
        //    objects are the same as the one in the "addAudioPlayer" method.
        //
        // 2. In the web page, it is assumed that there are as many div elements
        //    as there are objects in the array. The elements should have the
        //    format:
        //
        //        <div id="audioContainer_n">Optional error message</div>
        //
        //    Note that "n" is the audio object's index on the page (1-based) and
        //    the error message is what will display is scripting is turned off.
        //
        fromJSON : function(jsonURL) {

            // Use the jQuery function to fetch the json file specified in the
            // input URL and specify the function to be called once the JSON is
            // loaded and parsed.
            //
            $.getJSON(jsonURL, function(audioGroup) {

                // Loop through all of the audio file objects specified in the
                // json and add audio players for each one to the page.
                //
                for (var i = 0; i < audioGroup.data.length; i++)
                {
                    Gp.AudioPlayer.addPlayer(i + 1, audioGroup.data[i]);
                }
            });
        },

        // Function adds and audio player to the page for the given audio file.
        // The given id should be a number corresponding to the index of the
        // audio file on the page (treating the total collection of files as a
        // 1-based array).
        //
        // The audio file object should contain the following properties.
        //
        //     {
        //         "title" - The title of the audio (i.e. song title).
        //         "url"   - The URL of the audio file.
        //     }
        //
        // We assume that a container element exists corresponding to the input
        // id. Remembering that the id itself is just a number, the id of the
        // containing element should be "audioContainer_id".
        //
        addPlayer : function(id, audioFile)
        {
            // Using the input id, create the id of the container element and
            // then locate that element on the page.
            //
            var containerId = "audioContainer_" + id;
            var container = document.getElementById(containerId);

            // Set the classname of the element to "audio_container" in order to
            // make sure we pick up any special formatting. Also clear out the
            // inner HTML so as to remove any default error messages that should
            // only display when scripting isn't working.
            //
            container.className = "audio_container";
            container.innerHTML = "";

            // Create a paragraph element inside the container and specify the
            // audio player id on that element using the input id (note that this
            // is a requirement of the Wordpress audio player). Add the new
            // element as a child of the container.
            //
            var playerId = "audioplayer_" + id;
            var para = document.createElement("P");
            para.id = playerId;
            container.appendChild(para);

            // Call into Wordpress to embed the audio player into the container.
            //
            AudioPlayer.embed(playerId,
            {
                titles        : audioFile.title,
                soundFile     : audioFile.url,
                autostart     : audioFile.autostart || "no",
                initialvolume : audioFile.initialvolume || 60
            });
        }
    }
});

// On document load, load the Wordpress audio player script, call the audio
// player setup code specifying our custom colors, and the call our method to
// load the JSON information for this page and add the audio players.
//
$(function() {

    // Fetch the Wordpress audio script. Note that we do this here instead of the
    // HTML pages containing the script so as to leave the option of changing the
    // underlying audio player later.
    //
    // Define the function to be called when the script is successfully loaded.
    //
    $.getScript("/scripts/wpaudio-player/audio-player.js", function() {

        // Call into the Wordpress audio setup code to specify the player to use
        // and also to specify our custom colors and dimensions.
        //
        AudioPlayer.setup("/scripts/wpaudio-player/player.swf",
        {
            width             : 400,
            transparentpagebg : "yes",
            animation         : "no",
            bg                : "9090B0",
            leftbg            : "707090",
            rightbg           : "707090",
            track             : "202030",
            text              : "FFFFFF"
        });

        // Call our code to load "audio.json" from the local folder and add
        // the audio players to the page.
        //
        Gp.AudioPlayer.fromJSON("audio.json");
    });
});
