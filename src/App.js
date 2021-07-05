import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Card, Image, Alert, Button, Form, Row, Col} from 'react-bootstrap';
import { Text } from 'react-native-web'
import { ApiUtils } from './ApiUtils'
import './App.css';


function App() {

  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');
  const [apiToken, setApiToken] = useState('');

  const [text1, setText1] = useState('');

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    const apiU = new ApiUtils();
    //apiU.trialFunction();
    const statement = apiU.trialFunction()
    console.log("statement: " + statement)
    if (response.accessToken) {
      //console.log(response.accessToken)
      const requestOptions = {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "identity_token": response.accessToken })
      };
      try {
        fetch('https://my-react.local:3000/v1/authorize', requestOptions)
            .then(response => response.json())
            .then(data => setApiToken(data.api_token));
        setLogin(true);
      } catch (e) {
        console.log("Exception found: :" + e);
        setLogin(false);
        return;
      }
    } else {
      setLogin(false);
    }
  }

  const logout = () => {
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' }
    };

    fetch('https://my-react.local:3000/v1/logout/?apiToken=' + apiToken, requestOptions)
        .then(response => response.json())
        .then(data => console.log("DATER: " + JSON.stringify(data)));

    setLogin(false)
  }

  const mySubmit = () => {
    console.log("start mySubmit()")
    console.log("text 1 is " + text1)
  }
//               callback={responseFacebook}

  return (
      <div className="container">
        <Card style={{ width: '600px' }}>
          <Card.Header>
            { !login &&
            <FacebookLogin
                appId="1004027110356208"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile email"
                callback={responseFacebook}
                icon="fa-facebook" />
            }
            { login &&
            <Alert key="4" variant="dark">
              <Image src={picture} roundedCircle /> <Text style={{ fontSize : 35 }}>{data.name}</Text>
            </Alert>
            }
          </Card.Header>
          { login &&
          <>
            <Card.Body>
              <Card.Title><Alert key="5" variant="dark">Display Name: {data.name}</Alert></Card.Title>
              <Card.Text>
                Email Address:{data.email} <br/><br/>
                Access Token:{data.accessToken} <br/><br/>
                Signed Request:{data.signedRequest}
              </Card.Text>
            </Card.Body>

            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Lable One
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Normal text"
                                value={text1.value}
                                onChange={e => setText1(e.target.value)}/>
                </Col>
              </Form.Group>
              <Button variant="primary" type="button" onClick={mySubmit} size="sm">
                Submit
              </Button>

            </Form>
          </>

          }
        </Card>
        { login &&
        <div>
          <Button variant="primary" type="button" onClick={logout} size="sm">
            logout
          </Button>
        </div>
        }
      </div>
  );
}

export default App;