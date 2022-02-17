import './App.css';
import { BrowserRouter as Router, Routes, Route} from  'react-router-dom'
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
import { makeStyles } from '@material-ui/core';
import ErrorPage from './Pages/ErrorPage';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "#fff",
    minheight: "100vh"
  }
}))

function App() {
  const classes = useStyles()
  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} exact/>
          <Route path='/coins/:id' element={<Coinpage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
