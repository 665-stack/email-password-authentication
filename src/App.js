import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';


const auth = getAuth(app)

function App() {

  const handleEmailBlue = (event) => {
    console.log(event.target.value)
  }

  const handlePasswordBlur = (event) => {
    console.log(event.target.value)

  }
  return (
    <div className="App">
      <form action="">
        <input onBlur={handleEmailBlue} type="email" name="" id="" />
        <input onBlur={handlePasswordBlur} type="password" name="" id="" />
      </form>
    </div>
  );
}

export default App;
