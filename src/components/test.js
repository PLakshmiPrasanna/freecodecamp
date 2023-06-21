 const calcData = [
  {name: "clear", data: 'AC' },
  {name: "divide", data: '/' },
  {name:"multiply", data:'*'} ,

  {name: "seven", data: '7'}  ,
  {name: "eight", data:'8' },
  {name: "nine", data: '9' },
  {name: "subtract", data: '-' } ,

  {name: "four", data: '4' },
  {name: "five", data: '5' },
  {name: "six", data: '6' },
  {name: "add", data: '+' },


  {name: "one", data: '1' },
  {name: "two", data: '2' },
  {name: "three", data: '3' } ,

  {name: "equals", data: '='},

  {name: "zero", data: '0' },
  {name: "decimal", data: '.' }

]



const Buttons = ({setParentInput1})=> {

    
  const userInput = {inputText : '' , result: '' };
  const [input, setInput] = React.useState(userInput);
  const [name, setName] = React.useState('');
  const [data, setData] = React.useState('');
  let count = React.useRef(0);
  let equalClick = React.useRef(false);
  const individualNumbers = React.useRef([]);
  
  const buttonClick = (e, name, data)=>{
      console.log(name, data);
      let {inputText, result} = input;
      const length = individualNumbers.current.length;
      switch(data){
          case "=":  count.current = 0;
                      if(inputText != '' ){
                      try{
                          result = eval(inputText);
                      }catch(err){
                          setInput({
                              ...input, result :"Math error"
                          })
                      }
                     

                      if(result == undefined){
                          setInput({
                              ...input, result :"Math error"
                          })
                      }else{
                          setInput({
                              inputText : '' , result: result
                          })
                      }
                   }
                   equalClick.current = true;
                   break;
          case "AC":  count.current = 0;equalClick.current = false;
                      setInput ({ inputText: '' , result : '' });
                      console.log(input);
                      break;
          case '.':  count.current = 0;equalClick.current = false;
                   console.log(individualNumbers.current);
                    
                   if( individualNumbers.current[length-1].match(/\./g)?.length >= 1){
                      break;  
                   }else{
                   setInput(prev => ( {  result: '', inputText: prev.inputText.concat(data) } ) ) ;
                   }
                      
                      break;
      
          case "delete": count.current = 0; equalClick.current = false;
                      inputText = inputText.substring(0, inputText.length-1);
                           break;
          case '-':
          case '*':  
          case '+':
          case '/':   
                      count.current  = count.current +1;
                      if(count.current > 1 && data!='-'){
                          inputText = inputText.substring(0, inputText.length-1)
                      }
                      if(equalClick.current ){
                          setInput( {  result: '', inputText: result.toString().concat(data) } ) ;
                          count.current = 1;
                          equalClick.current = false;
                     }else{
                      setInput( {  result: '', inputText: inputText.concat(data) } ) ;
                     }
                      
                      break;
          default: count.current = 0;equalClick.current = false;
                  if(inputText.startsWith("0")) {
                      setInput({result: '', inputText : data });
                  }else{
                      setInput(prev => ( {  result: '', inputText: prev.inputText.concat(data) } ) ) ;
                  }
              
                  
      }
  }

  React.useEffect(()=>{
      console.log(input);
      setParentInput1(input);
      individualNumbers.current = input.inputText?.split(/[+\-*/]/);
  },[input]);


  return (
      // <button className="item1">AC</button>
      <>            
       {
          calcData.map(btn =>{ 
              const {name, data} = btn;
              return <button key={name} className={name} 
              onClick={(e)=>buttonClick(e,name, data)} >{data}</button>  
          })            
      } 
      </>
  )

}

const Calculator = ()=>{
  const [parentInput, setParentInput] = React.useState({});
  console.log(parentInput);
  
  

  return (
      <div className="calc-container">
          <div className="calc-box">
              <div id="display">
                  { parentInput.result && <span>{parentInput.result}</span> }
                  {    !parentInput.result && <span>{parentInput.inputText}</span> }
                  
              </div>
               <div className="buttons">
                 <Buttons setParentInput1={setParentInput}/>
              </div> 
               
          </div>
      </div>
  )
}
