##EVE &mdash; A lightweight pure JavaScript chatbot
EVE (**E**ssential **V**irtual **E**ntity) is a lightweight pure JavaScript chatbot built as a final exam in a JavaScript course at Blekinge Tekniska Högskola the spring of 2016. It focuses on simplicity and is easily extendable.

##Setup
To get EVE, simply clone the repo with `git clone https://github.com/JompaGlitter/EVE.git` and point your browser to the folder and chatbot.html and ta-da, you have a ugly looking basic version of EVE running. To spice up the look a bit, just add some more CSS to it.

##How it works
**main.js** is the heart of EVE, it's where the main code and logic is. But to use EVE you need some som data and functionality attached to it. Otherwise EVE is more or less just an empty shell without presentation or content. Here is what it needs:

####User interface
**chatbot.html** contains the visual presentation of EVE. It's basically just a simple HTML file that the EVE:s logic interacts with. It imports the necessary logic and basic functionality and sets up a simple user interface.

#####Want your own user interface?
If you want to create your own interface there are some naming of id tags to take into consideration:

* _input_: This is the inputfield. Everything involving processing the text input is linked to this id.
* _send_: This is the send button. Event listeners for both click and 'enter' keypress are linked to this id.
* _log_: This is the chat field where input and output text is printed. Everything connected to outputting text to screen is linked to this id.
* _log-container_: This is the container for the log tabel. It makes it possible to auto scroll the log when adding text to it.

Also, it's **important** to include the functions.js and main.js files in the document and _in this order_ because the main.js uses the variable in functions.js without including the file itself. An update further on might fix this dependency flaw.

####Functionality
**functions.js** contains the basic responses and functions of EVE, which means things like helping the user to know what to do, presentating itself, citing a quote, smiling and a few other neat things. This file is necessary for EVE to work properly. To extend functionality you can put some more functions or reponses here. But if you want to store a lot of text content it is recommended that you put this in the data.js file where all EVE:s "knowledge" is stored.

####"Knowledge"
**data.json** is where all EVE:s "knowledge" is stored. It contains a JSON object to store information and texts in, and each object property is treated as a keyword to get the content as a respons.

**Tip:**If you put links in the object, add target='_blank' to it to open it in a new window or tab. Othwerwise the user might leave the chat upon clicking the link if their browser is set to open links in the same browser window.


##Limits

For the moment EVE can access **only one layer of properties** and content, so setting arrays of properties and content within properties will not do you any good.

Also, EVE:s search for keywords to respond to is limited to one word at a time, so using a **sentence as a property** will only end up in **failure**.
