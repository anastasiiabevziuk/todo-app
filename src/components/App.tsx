import { Provider } from "react-redux";
import { setupStore } from "../store/store";
import Registration from './Registration';
import Login from './Login';
import Main from './Main';
import Lists from './Lists';
import Items from './Items';
import Footer from './Footer';
import Header from './Header';

import './App.css';
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../utils/privateRoute";

const store = setupStore();

function App() {
  return (

    <Provider store={store}>
      <div className="App">
        <Header />
        <div className='App-Content'>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route element={<PrivateRoute />}>
              <Route path="lists" element={<Lists />} />
              <Route path="items" element={<Items />} />
            </Route>
          </Routes>

        </div>
        <div className='App-Footer'>
          <Footer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
