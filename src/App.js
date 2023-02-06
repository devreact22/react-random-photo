import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import RandomPhotos from './components/Fetch-data'

function App() {
  return (
    <>
    <div className="App">
      <div className="App-header">
        <h1>
          RANDOM PHOTO APP
        </h1> 
        <RandomPhotos />   
        </div>
    
    </div>
    </>
  );
}

export default App;
