import React, { useState } from "react";
import { quotes } from "../data/quotes";


const RandomQuote =()=>{

    const [quote, setQuote] = useState(quotes[0]);

    const generateRandomQuote = () =>{
        const randomQuote = quotes[Math.floor(Math.random() * 10)];
        setQuote(randomQuote);
    }

    const {text, author} = quote;
    const twitterUrl = "twitter.com/intent/tweet?text="+`${quote.text}`+"&&author="+`${quote.author}`;

    return (
        <div className="qt-container"> 
            <div id="quote-box">
                   
                       
                        <div id="text">{text}</div>
                        <div id="author">{author}</div>
                        <button id="new-quote" onClick={generateRandomQuote}>Generate random quote</button>
                        <a id="tweet-quote" target="_blank" href={twitterUrl}>Link to twitter</a>
                        
                
                
            </div>
        </div>
    )

}

export default RandomQuote;