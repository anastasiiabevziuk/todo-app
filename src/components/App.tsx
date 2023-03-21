import Registration from './Registration';
import Login from './Login';
import Main from './Main';
import List from './List';
import Items from './Items';
import Footer from './Footer';
import Header from './Header';

import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <div className='App-Content'>
        <Main />
        <Login />
        <Registration />
        <List />
        <Items />
      </div>
      <div className='App-Footer'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
