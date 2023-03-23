import { MyApi } from "./component/MyApi";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

function App() {
  return (
    <>
    <div className="principal">
      <img src='title.png' className='title' alt={"titulo"}></img>
      <MyApi/>
    </div>

  </>
  );
}
export default App;
