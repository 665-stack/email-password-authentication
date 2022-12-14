import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';


const auth = getAuth(app)

function App() {
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false)
  const [name, setName] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const handleNameBlur = event => {
    setName(event.target.value)
  }

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


    // jodi user age thekei registered thake taile login hobe
    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
          setSuccess('Login Success')
        })
        .catch(error => {
          console.error(error);
          setError(error.message)
        })

    }
    // age theke registered na thakle register hobe
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          setSuccess("Register Success")
          console.log(user)
          verifyEmail();

          setUserName();

        })
        .catch(error => {
          setError(error.message)
          console.error(error)
        })
    }


    // page reload hobe na
    event.preventDefault();
  }

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent!")
      })
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('updating name')
      })
      .catch(error => {
        setError(error.message)
      })
  }


  function verifyEmail() {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("Email verification sent!");
      });

  }

  return (
    <div>

      <div className='registration w-50 mx-auto mt-5'>
        <h2 className='text-primary'>Please {registered ? "Login" : "Register"}</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

          {!registered && <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Your Name" required />
            <Form.Control.Feedback type="invalid">
              Please provide a your name.
            </Form.Control.Feedback>
          </Form.Group>}

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
          <p className='text-success'>{success}</p>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          </Form.Group>
          <Button onClick={handlePasswordReset} variant="link">Forget Password?</Button>
          <br />
          <Button variant="primary" type="submit">
            {registered ? "Login" : "Register"}
          </Button>
        </Form>
      </div>




    </div>
  );
}

export default App;
