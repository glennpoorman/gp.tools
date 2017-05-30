// Extend the top level "Gp" object.
//
$.extend(Gp, {

    // Internal function creates an email link anchor under the given item using the given
    // user name, domain, and optional link text.
    //
    _emLink : function(item, user, domain, link) {

      // Create the recipient text.
      //
      var recipient = user + "@" + domain;

      // Create the anchor, set the link, and append the new anchor to the input item.
      //
      $("<a>").prop("hr" + "ef", "ma" + "ilto:" + recipient).html(link || recipient).appendTo(item);
    },

    // Internal function sets the url on the given image element and uses the given scale value
    // to size the image.
    //
    // There's a little wierdness here that warrants an explanation.
    //
    // We want to use the width and height from the image itself, scale it using the given scale
    // value, and then use the results to set a new width and height on the input image element.
    // The problem is, you can't just set the image url on the element and then query the width
    // and height expecting to get good results. Until the image is fully loaded, querying the
    // width and/or height property will always return zero.
    //
    // To get around this we'll create a temporary "Image" object, set the url, and then set an
    // "onload" event handling function that won't be called until such time that the image is
    // fully loaded. Inside that event handler, we'll then query the width and height from the
    // temporary image, scale it, and then copy it over to the original input image element
    //
    _sizedImg : function(image, url, scale) {

        // Create the temporary image element.
        //
        var tmpImg = new Image();

        // Set the url on the temporary image.
        //
        tmpImg.src = url;

        // Set the "onload" event handler to query the width and height (guaranteed to be accurate
        // at this point), scale it, and copy it over to the input image element.
        //
        tmpImg.onload = function() {
            $(image).prop("src", tmpImg.src).
                     prop("width", tmpImg.width * scale).
                     prop("height", tmpImg.height * scale);
        }
    },

    // Internal function creates and/or retrieves a container element based on the given container
    // id. If the container element is not found, the given collection id is used to see if maybe
    // the item is supposed to be part of a larger collection. If the collection is found, then a
    // new container element is created using the original container id. In either case, the result
    // is returned.
    //
    // This is used for slide decks and audio albums.
    //
    _getContainer : function(containerId, collectionId, className) {

        // Locate the container element using the container id.
        //
        var container = $("#" + containerId);

        // If the element isn't found, we might be creating a collection. In other words, a single
        // collection of items under one parent identified by the collection id. To see if that's
        // the case, try and locate an element using the collection id. If we find one, create a
        // DIV element using the original container id and add it to the collection element.
        //
        if (container.length === 0)
        {
            var collection = $("#" + collectionId);
            if (collection.length !== 0)
            {
                container = $("<div>").prop("id", containerId).appendTo(collection);
            }
        }

        // Make sure the resulting element has the given class name set on it.
        //
        container.addClass(className);

        // Return the container.
        //
        return container;
    }
});
