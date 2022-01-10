import logo from './logo.svg';
import './App.css';
function App() {

  //TODO Implement Routing over different Sites
  return (
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;
