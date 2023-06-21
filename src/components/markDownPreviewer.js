import React, { useState } from "react";
import { marked } from "marked";

const MarkdownPreviewer = ()=>{

    const data = `Let's do some headers!
  # I AM A H1 HEADER!
  ## I AM A H2 HEADER!
  
  How about a link to [Google!](http://google.com)

  Anybody want a \`<div></div>\`?

  Nope? Okay here's an ES5 function to cheer you up!

  \`\`\`
    function sayHi() {
       console.log("HI!");
    }
  \`\`\`

  Let's count to three!
  
  * One
  * Two
  * Three

  What about a quote that is **not** relevant at all!
  
  > Block Quotes!
  
    As Kanye West said:
    > We're living the future so the present is our past.
  
  Still not good? Okay here's an image of React!

  ![React Logo w/ Text](https://goo.gl/Umyytc)
`  
  
  // Line breaks allowed 
marked.setOptions({
  breaks: true,
});
  

    const [text, setText] = useState(data);

    const handleChange = (e) =>{
        setText(e.target.value);
    }
    const markedtext = () =>{
        return {
            __html: marked.parse(text)
        }
    }

    return (
        <div className="markdownContainer">
            <h1>Mark down previewer</h1>
            <div className="editor">
                <h2>Editor</h2>
                <textarea id="editor" onChange={handleChange} value={text} rows="6" cols="60"> </textarea>
            </div>
            
            <div className="preview">
                <h2>Preview</h2>
                <div id="preview" dangerouslySetInnerHTML={markedtext()}></div>
            </div>
            
        </div>

    )
}

export default MarkdownPreviewer;