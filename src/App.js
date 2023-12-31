import logo from './logo.svg';
import './App.css';
import RandomQuote from './components/randomQuote';
import MarkdownPreviewer from './components/markDownPreviewer';
import DrumMachine from './components/drumMachine/drumMachine';
import Calculator from './components/calculator/calculator';
import Clock from './components/25+5clock/clock';

function App() {
  return (
    <div className="App">
       {/* <RandomQuote />  
      <MarkdownPreviewer/>
      <DrumMachine />
      <Calculator/> */}
      <Clock/>
    </div>
  );
}

export default App;
