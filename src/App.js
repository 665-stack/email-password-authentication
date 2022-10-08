import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';


const auth = getAuth(app)

function App() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleEmailBlur = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordBlur = (event) => {
    setPassword(event.target.value)

  }


  // for checkbox
  const handleRegisteredChange = (event) => {
    setRegistered(event.target.checked);
  }

  // For register button
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    // reglar expressoin for password validation
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Password should contain at least one special character ')
      return;
    }

    setValidated(true);
    setError('');

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user)
        // register button e click korle input field empty hoye jabe
        setEmail('')
        setPassword('')
      })
      .catch(error => {
        setError(error.message)
        console.error(error)
      })


    // page reload hobe na
    event.preventDefault();
  }



  return (
    <div>

      <div className='registration w-50 mx-auto mt-5'>
        <h2 className='text-primary'>Please {registered ? "Login" : "Register"}</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>

          </Form.Group>

          <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already registered?" />

          <p className='text-danger'>{error}</p>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          </Form.Group>
          <Button variant="primary" type="submit">
            {registered ? "Login" : "Register"}
          </Button>
        </Form>
      </div>




    </div>
  );
}

export default App;
