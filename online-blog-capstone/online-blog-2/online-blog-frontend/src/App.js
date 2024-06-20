import React from 'react';
import './App.css';
import RouterComponent from './components/routes/Router';
import { BrowserRouter } from 'react-router-dom';
class App extends React.Component{
  render(){
  return( 
    <BrowserRouter>
      <div><RouterComponent /></div>
    </BrowserRouter>
  )
  }
}
export default App;
