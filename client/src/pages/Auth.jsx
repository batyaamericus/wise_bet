import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Button, Container } from "react-bootstrap";
import Login from "../components/Login";
import Registration from "../components/Registration/Registration";
import useAuth from "../hooks/useAuth.js";
import Alert from "../components/Alerts";

const Auth = () => {
  const [isMember, setIsMember] = useState(true);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const { isLoading, showAlert, displayAlert, onSignUp, onLogIn } = useAuth();

  function handleLogIn() {
    if (!email || !pwd) {
      displayAlert("Please, provide all values", "danger");
    }
    onLogIn({ email, pwd });
  }
  function handleSignUp() {
    if (!name || !lastName || !pwd || !email || !confirmPwd) {
      displayAlert("Please, provide all values", "danger");
    }
    if (pwd !== confirmPwd) {
      displayAlert("Password doesn't match", "danger");
    }
    onSignUp({ name, lastName, pwd, email, confirmPwd });
  }
  return (
    <Container className="mt-5">
      <h2 className="display-3">{isMember ? "LogIn" : "Register"}</h2>
      <p className="c-modal-toggle center">
        {isMember ? (
          <>
            Are you not registered?{" "}
            <Button variant="warning" onClick={() => setIsMember(false)}>
              {" "}
              Register here{" "}
            </Button>{" "}
          </>
        ) : (
          <>
            Are you registered?{" "}
            <Button variant="warning" onClick={() => setIsMember(true)}>
              {" "}
              Log In here{" "}
            </Button>{" "}
          </>
        )}
      </p>
      {isMember ? (
        <Login
          email={email}
          setEmail={(e) => setEmail(e.target.value)}
          pwd={pwd}
          setPwd={(e) => setPwd(e.target.value)}
        />
      ) : (
        <Registration
          email={email}
          setEmail={(e) => setEmail(e.target.value)}
          pwd={pwd}
          setPwd={(e) => setPwd(e.target.value)}
          name={name}
          setName={(e) => setName(e.target.value)}
          lastName={lastName}
          setLastName={(e) => setLastName(e.target.value)}
          confirmPwd={confirmPwd}
          setConfirmPwd={(e) => setConfirmPwd(e.target.value)}
        />
      )}
      <div className="d-flex center">
        <Button
          variant="warning"
          onClick={isMember ? handleLogIn : handleSignUp}
          disabled={isLoading}
        >
          {isMember ? "Log In" : "Register"}
          {isLoading && (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Loading...</span>
            </>
          )}
        </Button>
      </div>
      {showAlert && <Alert />}
    </Container>
  );
};

export default Auth;
