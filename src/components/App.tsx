import { useEffect } from "react";
import { Provider } from "react-redux";
import { setupStore } from "../store/store";
import Main from './Main';
import Lists from './Lists';
import Items from './Items';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "../utils/privateRoute";
import { useAuth0 } from "@auth0/auth0-react";

import './App.css';


const store = setupStore();


function App() {

  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) loginWithRedirect()
  }, [isAuthenticated]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <Router >
      <Provider store={store}>
        <div className="App">
          <Header />
          <div className='App-Content'>
            <Routes>
              <Route path="/" element={<Main />} />

              <Route element={<PrivateRoute />}>

                <Route path="items" element={<Items />} />
                <Route path="lists" element={<Lists />} />
              </Route>
            </Routes>

          </div>
          <div className='App-Footer'>
            <Footer />
          </div>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
