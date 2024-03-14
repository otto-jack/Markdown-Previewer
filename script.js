import React, {useState, useEffect} from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import {Container, Card} from "https://esm.sh/react-bootstrap";
import {Provider, connect, useSelector, useDispatch} from "https://esm.sh/react-redux";
import { createStore, combineReducers, applyMiddleware } from "https://esm.sh/redux";
import {marked} from "https://esm.sh/marked";

//redux
//intial state
//const initialState= {textareaValue: "textareaValue:"}

const initialState= {
  textareaValue: `  # Welcome to my React Markdown Previewer! 

## This is a sub-heading... 
### And here's some other cool stuff: 

Heres some code, \`<div></div>\`, between 2 backticks. 

\`\`\`
// this is multi-line code: 

function anotherExample(firstLine, lastLine) { 
  if (firstLine == \`\`\` && lastLine == \`\`\`) { 
    return multiLineCode; 
  } 
} 
\`\`\` 

You can also make text **bold**... whoa! 
Or _italic_. 
Or... wait for it... **_both!_** 
And feel free to go crazy ~~crossing stuff out~~. 

There's also [links](https://www.freecodecamp.org), and 
> Block Quotes! 

And if you want to get really crazy, even tables: 

Wild Header | Crazy Header | Another Header? 
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here.... 
And here. | Okay. | I think we get it. 

- And of course there are lists. 
  - Some are bulleted. 
     - With different indentation levels. 
        - That look like this. 

1. And there are numbered lists too. 
1. Use just 1s if you want! 
1. And last but not least, let's not forget embedded images: 

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg) 
`
};

//Action
const updateTextarea = (value) => ({
  type: 'UPDATE_TEXTAREA',
  value: value
})
//reducer
const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'UPDATE_TEXTAREA':
      return {
        ...state, textareaValue: action.value
      }
    default:
      return state;
  }
  
  
}

const store = createStore(reducer);

//react

const MarkdownPreviewer = () => {
  const dispatch = useDispatch();
  const textareaValue  = useSelector(state => state.textareaValue);
  
  const updatePreviewer = (event) => {
    
    dispatch(updateTextarea(event.target.value));
  }
  
  return (
    <div className="wrapper">
      <div className="text-center" > 
        
        <textarea id="editor" className="custom-textarea" value={textareaValue} onChange={updatePreviewer}/>
        
        
        <Card className="custom-card">
          <Card.Body> 
            <Card.Title className="title"> Preview </Card.Title>
            <Card.Text  id="preview" className="text" dangerouslySetInnerHTML={{ __html: marked(textareaValue) }} />
          </Card.Body>

        </Card>
      </div>
    </div>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <MarkdownPreviewer /> 
  </Provider>,
  document.getElementById("markdownPreviewer")
)
