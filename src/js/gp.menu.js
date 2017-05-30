// Wrap the initialization in a closure to privatize the details.
//
(function() {

    // Extend the top level "Gp" object adding the "MenuManager" constructor.
    //
    $.extend(Gp, {

        // The menu manager constructor will initialize the module and setup the HTML elements when
        // called.
        //
        MenuManager : function() {

            // Go ahead and setup the HTML elements.
            //
            this.initialize();
        },

        // The active banner manager will initialize the responsive parts of the module and setup
        // the HTML elements when called.
        //
        ActiveBannerManager : function() {

            this.initialize();
        }
    });

    // The only additional method we will add to the menu manager will be this initialization
    // method. This method will define all of the other functions and setup the ids and event
    // handlers on the HTML elements.
    //
    Gp.MenuManager.prototype.initialize = function() {

        // Event handling function will be set to handle "mouseover" and "mouseout" events on all
        // of the top level list items. The event handler operates under the assumption that the
        // id of the submenu can be arrived at by taking the id of the item that triggered the
        // event and adding the string "-submenu" to it.
        //
        function toggleSubMenu(event)
        {
            // Use the jQuery "slideToggle" function to animate the toggling of the display.
            //
            // It should be noted here that this could have been done purely in CSS with no JS
            // at all but I like the animation. Unfortunately the "display" property cannot be
            // changed using CSS transitions.
            //
            $("#" + event.currentTarget.id + "-submenu").slideToggle(120);
        }

        // With the inline functions defined, cycle through each (li) element that is a direct
        // descendant of the list element with the id "gp-menu-bar".
        //
        $("#gp-menu-bar > li").each(function(idx) {

            // Assemble the id based on the input index.
            //
            var id = "gp-menu-item-" + idx;

            // Set the id on the list item and set the event handler to be used for "mouseover"
            // and "mouseout" events to toggle visibility of the submenu (if there is one).
            //
            $(this).prop("id", id).hover(toggleSubMenu, toggleSubMenu);

            // Decorate the list item id with the string "-submenu" and add it as the id on the
            // item sub-menu (if there is one).
            //
            $("div:first", this).prop("id", id + "-submenu");
        });
    };

    // The initialization code for the active banner manager adds the hidden menu icon for mobile
    // screens to the title section of the banner. Additionally, needed ids are added to the "nav"
    // and "ul" elements inside of the nav section.
    //
    Gp.ActiveBannerManager.prototype.initialize = function() {

        // Create an anchor that will serve as the menu toggle on mobile devices and append the
        // anchor to the title section. Note that the appearance of the anchor is controlled by
        // by the style "gp-menu-icon".
        //
        $("<a>").prop("href", "#").
                 prop("id", "gp-menu-icon").
                 click(function() { $('ul#gp-menu-bar').slideToggle('slow'); }).
                 appendTo("#gp-title-section");

        // When using the active banner, it is assumed that the only elements with ids assigned in
        // the HTML are the two sections title and nav. So here we add additional required ids to
        // the nav element in the nav section "gp-active-nav" and the ul element within that nav
        // "gp-menu-bar".
        //
        $("#gp-nav-section nav:first").prop("id", "gp-active-nav");
        $("#gp-nav-section ul:first").prop("id", "gp-menu-bar");
    };

    // Document ready function is called when the document is fully loaded.
    //
    $(function() {

        // Create the active banner manager object kicking off the initialization code. Note that
        // if the page is only using the menu and doesn't contain the active banner sections, this
        // will essentially be a no-op. Also note that if the page does contain the active banner
        // sections, it is crucial this initialization take place prior to the menu initialization
        // below.
        //
        new Gp.ActiveBannerManager();

        // Create the menu manager object kicking off the initialization code.
        //
        new Gp.MenuManager();
    });
}());
