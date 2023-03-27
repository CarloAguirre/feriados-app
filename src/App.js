import { MyApi } from "./component/MyApi";

import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css'

function App() {
  return (
    <>
    <div className="principal">
      <div className='title'>
        <img src='title.png'  alt={"titulo"}></img>
      </div>
      <MyApi/>
    </div>

  </>
  );
}
export default App;
