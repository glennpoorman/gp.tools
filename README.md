# gp.tools

Miscellaneous JavaScript Tools for Client Side Web Development

This is just a smattering of JS tools I've put together while authoring my own websites.

## Building the distribution

The toolkit uses the Node Package Manager (**npm**) to download all of the components
required to build and distribute the toolkit and uses **Grunt** to build the distribution.

#### Installing **npm**

**npm** is installed with **Node.js**. You can download and install **Node.js** from the
main webpage at http://nodejs.org.

#### Installing the Grunt command line interface

Before using **Grunt** with the local project, you need to install the global command
line interface. Assuming you've installed **npm**, you can install the **Grunt** cli
using the following command.

> `npm install -g grunt-cli`

#### Install the **gp.tools** components

To fetch all of the components required to build the toolkit, open a command prompt,
make sure you're in the top level folder where *package.json* resides, and run the
following command.

> `npm install`

#### Build the distribution

The easiest way to build the distribution is by running **Grunt** from a command
prompt as follows.

> `grunt`

This creates a new folder named *dist* where the results of the build reside. This
folder can be copied into your website folder and referenced.

Another useful command is the *watch* command that can be run as follows:

> `grunt watch`

This will run **Grunt** continuously and will automatically rebuild the distribution
every time a source file is edited. It's handy to have this running if you're working
on the scripts and editing/testing.

## Viewing the demo pages

The bundle contains a series of demo web pages inside a folder appropriately named **demo**.
The demo folder lies just under the top level folder and the web pages are setup as though
they're being served from a web server where the root folder is the top level folder (*gp.tools*).
The demo pages also serve as documentation regarding how to use the toolkit.

Any web server will do for viewing the demo files but if you're not currently running a
local web server, the easiest way to do so is via **python**.

You can find tips on setting up a local server for testing at:

https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server

You can download the latest version of Python at:

http://python.org

For my own testing, I am currently running Python 3.6.1 in Windows 10. Running the demo pages
involved the following steps:

1. Opened a CMD prompt.
2. Ran **python -m SimpleHTTPServer** (for Python older than version 3)
3. Ran **python -m http.server** (for Python version 3)
3. Ran my Chrome browser.
4. In the address bar, typed **localhost:8000/demo**