// -----------------------------------------------------------------------------
// gp.menu.js
//
// JavaScript menu tools present a simple single layer menu with optional
// pulldowns.
//
// (C)2012, Glenn Poorman, All Rights Reserved
// -----------------------------------------------------------------------------

// Wrap the initialization in a closure to privatize the details.
//
(function() {

    // "Gp" is the topmost global variable/namespace for the various toolsets
    // under poorman.ws. Depending on how many other JS files have already been
    // pulled in, the top level object may or may not already exist. If it is
    // undefined, then create the initial object now.
    //
    if (Gp === undefined) {

        var Gp = {}
    }

    // Extend the top level "Gp" object adding the "MenuManager" constructor.
    //
    $.extend(Gp, {

        // The menu manager constructor will initialize the module and setup the
        // HTML elements when called.
        //
        MenuManager : function() {

            // When a timer is set on a window, a unique identifier is returned
            // that identifies that timer. Hang onto that id when we set the
            // timer to a submenu so that we can later use the id to cancel the
            // timer if we need to.
            //
            this.closeTimer = null;

            // While a given submenu is visible, hang onto the submenu element
            // so we can close it up when we're ready.
            //
            this.openSubMenu = null;

            // Go ahead and setup the HTML elements.
            //
            this.initialize();
        }
    });

    // The only additional method we will add to the "gpmenu_manager" will be
    // this initialization method. This method will define all of the other
    // functions and setup the ids and event handlers on the HTML elements.
    //
    Gp.MenuManager.prototype.initialize = function() {

        // Save a reference to the menu manager object for use in the inline
        // function definitions.
        //
        var _this = this;

        // Show the submenu (div element) associated with the list element. We
        // determine the id of the submenu by inspecting the idea of the list
        // element anchor that triggered the event. This function will be set
        // for "mouseover" events on the main menu bar anchors.
        //
        function showSubMenu(event) {

            // If a hide timer is in progress, stop it.
            //
            cancelHideTimer();

            // If another submenu is showing, hide it immediately (no timer).
            //
            hideOpenSubMenu();

            // The only element that should be able to trigger this event is the
            // first anchor element within a main menu list item. That anchor
            // will have an id containing the index of the list item followed by
            // the string "_menuItem". By parsing the number out of that string
            // and concatenating the string "_subMenu" onto it, we determine the
            // id of the submenu (div element) that we want to show.
            //
            var id = parseInt(event.target.id) + "_subMenu";

            // Now fetch the submenu identified by the id we just created and set
            // its visibility style to visible.
            //
            _this.openSubMenu = document.getElementById(id);
            if (_this.openSubMenu)
                $(_this.openSubMenu).slideToggle(120);
        };

        // If a submenu is open, hide it immediately by setting its visibility
        // style to hidden.
        //
        function hideOpenSubMenu() {

            if (_this.openSubMenu)
            {
                $(_this.openSubMenu).slideToggle(120);
                _this.openSubMenu = null;
            }
        }

        // Start a timer that will wait a 10th of a second and then call the
        // function to hide the currently open submenu. This function will be set
        // for "mouseout" events on the main menu bar's anchors as well as the
        // submenu.
        //
        function startHideTimer() {

            _this.closeTimer = window.setTimeout(hideOpenSubMenu, 100);
        }

        // If a timer to hide a submenu is in progress, cancel it.
        //
        function cancelHideTimer() {

            if (_this.closeTimer)
            {
                window.clearTimeout(_this.closeTimer);
                _this.closeTimer = null;
            }
        }

        // With the inline functions defined, cycle through each list item (li)
        // element that is a direct descendant of the element id "menubar".
        //
        $("#menubar > li").each(function(idx) {

            // Assign each anchor that is the first direct child of the list
            // element an id based on the index of the list element itself. Also
            // assign "mouseover" and "mouseout" event handlers to that same
            // anchor.
            //
            $("a:first", this).attr("id", idx + "_menuItem");
            $("a:first", this).hover(showSubMenu, startHideTimer);

            // Assign each div that the first direct child of the list element an
            // id based on the index of the list element itself. Also assign
            // "mouseover" and "mouseout" event handlers to that same div.
            //
            $("div:first", this).attr("id", idx + "_subMenu");
            $("div:first", this).hover(cancelHideTimer, startHideTimer);
        });
    };

    // Document ready function is called when the document is fully loaded.
    //
    $(function() {

        // Here all we do is to create a new menu manager object. We don't even
        // need to save the result. Just the act of creating the object will kick
        // off the initialization code above and set everything up.
        //
        new Gp.MenuManager();
    });
}());