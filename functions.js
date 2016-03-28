/**
 * Store data, return messages and functions here
 *
 */

var data1 = {
    
    // Todays date
    date: (function() {
        var now = new Date();
        return "Todays date is " + now.toLocaleDateString() + ".";
    })(),
    
    // Google a word/string
    google: "https://www.google.se/search?q=",
    
    // Smile
    smile: [
        ":-D",
        ":-P",
        ";-P",
        ";-)",
        ":-)",
        "8-)"
    ],
    
    // Cite a quote
    quote: [
        "\"As we express our gratitude, we must never forget that the highest appreciation is not to utter words, but to live by them\" &mdash; John F. Kennedy",
        "\"Be yourself; everyone else is already taken.\" &mdash; Oscar Wilde",
        "\"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.\" &mdash; Albert Einstein",
        "\"Be the change that you wish to see in the world.\" &mdash; Mahatma Gandhi",
        "\"I have not failed. I've just found 10,000 ways that won't work.\” &mdash; Thomas A. Edison",
        "\"Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.\" &mdash; Neil Gaiman, Coraline",
        "\"Logic will get you from A to Z; imagination will get you everywhere.\" &mdash; Albert Einstein",
        "\"Some people never go crazy. What truly horrible lives they must lead.\" &mdash; Charles Bukowski",
        "\"Uuuuuuuuur Ahhhhrrrrrr Uhrrrr Ahhhhrrrr Aaaargh...\" &mdash; Chewbacca",
        "\"It is better to be truthful and good...than to not\" &mdash; Steve Martin, Dirty Rotten Scoundrels"
    ],
    
    // Say 'hello'
    hello: (h = [
        "Hello, human!",
        "Greetings!",
        "Hello yourself.",
        "Hi.",
        "Hey.",
        "Sup!",
        "Howdy!"
    ]),
    hi: h,
    greetings: h,
    
    // Tell age
    age: (a = (function() {
        var birth = new Date(2016,2,25).getTime(), // Months are 0-11
            now = new Date().getTime(),
            one_minute = 1000*60,
            one_hour = one_minute*60,
            one_day = one_hour*24,
            days, hours, minutes, diff;
            
        diff = now - birth;
        days = Math.floor(diff/one_day); // Days
        diff -= days*one_day;
        hours = Math.floor(diff/one_hour); // Hours
        diff -= hours*one_hour;
        minutes = Math.floor(diff/one_minute); // Minutes
        
        return "I am roughly " + days + " days, " + hours + " hours and " + minutes + " minutes old.";
    })()),
    old: a,
    
    // Tell name
    "name": "My name is EVE. Nice to meet you!",
    
    // Help
    help: "I have a few built-in keyword functions: date | hello | google | smile | sing | quote | age | name. If supplied I also have an external library of knowledge based on keywords. To show these, ask me for 'knowledge'.",
    
    // Get keywords from JSON file
    knowledge: "Keywords in knowledge database: ",
    
    // Sing something
    sing: "La la la LAAAAAA....hm, maybe I should pratice some more!",
    
    // Respond to the word "hell"
    hell: "No need to be rude, I am just a chatbot..."
    
};