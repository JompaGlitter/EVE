/**
 * A chat bot
 *
 */

document.addEventListener("DOMContentLoaded", function(){
    
    /*
     ******************************************************
     *
     * "Backend" functionality, file loading etc.
     *
     ******************************************************
     */
    
    // Path to JSON data file
    var file = 'data.json';

    
    /**
     * Load content from JSON file
     *
     * Borrowed code from
     * http://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
     * and
     * http://youmightnotneedjquery.com/#json
     */
    function loadJSON(callback) {   
    
        var xobj = new XMLHttpRequest();
        //xobj.overrideMimeType("application/json");
        xobj.open('GET', file, true);
        xobj.onload = function () {
            if (xobj.status >= 200 && xobj.status < 400) {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            } else {
                document.getElementById('log').innerHTML = "ERROR: Could not find data storage file or file is invalid.";
            }
        };
        xobj.onerror = function() {
            alert('ERROR: Could not connect to server.');
        };
        xobj.send(null);  
    }
    
    
    /**
     * Dump object content as string.
     * for debugging purpose
     *
     * @param {object} obj - the object to dump
     */
    function dumpAsString(obj) {
      var s = '\n';
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          s += prop + ' : ' + obj[prop] + '<br />';
        }
      }
      return s;
    }

    
    /*
     ******************************************
     *
     * UI logic starts here...
     *
     ******************************************
     */
    
    
    /**
     * Simple htmlentities function for sanitation purpose
     * https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
     *
     * @param {string} str - string to sanitize
     * @returns a lightly sanitized string
     */
    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    
    
    /**
     * Display properties of an object
     * 
     * @param {object} obj - the object to show
     * @returns a string with all properties
     */
    function getProperties(obj) {
        if(typeof obj !== 'object') {
            console.log('Not an object.');
        } else {
            var keywords = '';
            for (var prop in obj) {
                //console.log(prop + ' : ' + obj[prop]);
                keywords += prop + " | ";
            }
            return keywords;
        }
    }
    
    
    /**
     * Add row to a table
     *
     * @param {element} table - the table to add the row to
     * @param {string} str1 - text for the first row cell
     * @param {string} str2 - text for the second row cell
     */
    function addTableRow(table, str1, str2) {
        var newRow = table.insertRow(table.rows.length);
        var firstCell = newRow.insertCell();
        var secondCell = newRow.insertCell();
        
        firstCell.innerHTML = str1;
        secondCell.innerHTML = str2;
    }
    
    
    /**
     * Generate a random number
     *
     * @param {int} min - the smallest possible number
     * @param {int} max - the largest possible number
     *
     * @returns a random number where min >= number <= max
     */
    function getRandomNumber(min, max) {
        return Math.floor(Math.random()*(max+1-min)+min);
    }
    
    
    /**
     * Google something
     *
     * @param {string} adress - the google adress
     * @param {string} search - the generated search string
     *
     * @returns the full google search string adress
     */
    function getGoogleUrl(adress, search) {
        return "<a href='" + adress + search + "'>" + adress + search + "</a>";
    }
    
    
    /*
     * Initiate bot chat
     *
     * @param {object} data - data from JSON file
     */
    function initChat(data) {
    
        var send = document.getElementById('send');
        var log = document.getElementById('log'),
            inputField = document.getElementById('input'), // For event listening
            input,
            returnMessage;
    
        /**
        * Get return message
        *
        * @param {object} functions, the functions storage variable
        * @param {string} input, the input message/search string
        *
        */
        function getReturnMessage(functions, data, input) {
            // Sanitize, convert and split string
            var str = input.replace(/[^\w\s]/gi, '').toLowerCase();
            str = str.split(" ");
            len = str.length;
        
            for (var i = 0; i < len; i++) {
                if (functions.hasOwnProperty(str[i])) {
                    
                    // Does the user want to google something?
                    if (str[i] === 'google') {
                        var searchUrl = '';
                        for (var j = i+1; j < len; j++) {
                            searchUrl += "+" + str[j];
                        }
                        return "Try this link: " + getGoogleUrl(functions[str[i]], searchUrl);
                    }
                    
                    // Is the function property an array?
                    if (functions[str[i]] instanceof Array) {
                        var x = getRandomNumber(0, functions[str[i]].length-1);
                        return functions[str[i]][x];
                    }
                    
                    // Get properties/keywords in JSON data file?
                    if (str[i] === 'knowledge') {
                        return functions[str[i]] + getProperties(data);
                    }
                    
                    return functions[str[i]];
                } 
                else if (data.hasOwnProperty(str[i])) {
                    return data[str[i]];
                }
            }
            return "Sorry, I did not get that...";
        }
    
        // Event listener for send button
        send.addEventListener('click', function(){
        
            // Fetch input and clear textfield
            input = document.getElementById('input').value;
            document.getElementById('input').value = '';
            
            // Send message to log
            input = htmlEntities(input);
            addTableRow(log, "Me: ", input);
            
            logContainer = document.getElementById('log-container');
            logContainer.scrollTop = logContainer.scrollHeight;
        
            // Send answer to log with a slight delay
            setTimeout(function() {
                returnMessage = getReturnMessage(data1, data, input);
                addTableRow(log, "EVE: ", returnMessage);
                
                logContainer.scrollTop = logContainer.scrollHeight;
            }, 600);
            
        });
        
        // Event listener for input field
        inputField.addEventListener('keypress', function(e) {
            var keynum = e.keyCode||e.which;
            
            // Listen for 'enter' keypress
            if(keynum == 13) {
                send.click();
            }
        });
        
        
        // Add welcome message to log
        addTableRow(log, "EVE:", "Hello! My name is EVE. How may I help you today?");
    
    }
    
    
    /*
     ************************************************
     *
     * On JSON content load, initiate the chat bot!
     *
     ************************************************
     */
    loadJSON(function(response) {
        // Parse JSON string into object
        var fileData = JSON.parse(response);
        //console.log(fileData);
    
        initChat(fileData);
    });
    
    
});