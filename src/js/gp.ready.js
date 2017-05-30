// Function runs on document load and performs several tasks.
//
$(function() {

    // Automatically add the message to upgrade to HTML5 only if the page contains the element
    // where this message should be displayed. 
    //
    Gp.Basic.html5Message();

    // Automatically insert the copyright notice into the page only if the page contains the
    // element where this notice should be displayed.
    //
    Gp.Basic.insertCopyright();

    // Search for any automatic email link elements in the page and display the email link
    // based on custom element data.
    //
    Gp.Basic.fixEmailLinks();

    // Look for a JSON file in the current page location named "slides.json" and, if found,
    // attempt to load up the slide show utilities with the data.
    //
    Gp.Slideshow.fromJSON("slides.json");

    // Look for a JSON file in the current page location named "audio.json" and, if found,
    // attempt to load up the audio player utilities with the data.
    //
    Gp.AudioPlayer.fromJSON("audio.json");
});
