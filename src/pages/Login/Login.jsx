/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utilities/hooks/useAuth";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

function Login() {
  const { login, user }  = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/pets", { replace: true });
    }
  }, []);

  const loginHandler = () => {
    try {
      login(userName, password);
    } catch (error) {
      console.log('An error has occurred while logging in. Please try again or contact your admin.');
    }
  }

  return (
    <div className="xl:-ml-80">
      <>
        <img
          src="/images/login-background.jpeg"
          className="absolute inset-0 z-0 h-full w-full object-cover"
          alt="login background"
        />
        <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
        <div className="container mx-auto p-4">
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="gray"
              className="mb-4 grid h-20 place-items-center"
            >
              <Typography variant="h3" color="white">
                Swagger Pet Store
              </Typography>
            </CardHeader>
            <CardBody>
              <form className="flex flex-col gap-4">
                <Input type="text" label="Username" name="username" autoFocus size="lg" value={userName} onChange={(event) => setUserName(event.target.value)} />
                <Input type="password" label="Password" name="password" size="lg" autoComplete="on" value={password} onChange={(event) => setPassword(event.target.value)} />
              </form>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth onClick={() => {loginHandler()}}>
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </div>
      </>
    </div>
  );
}

export default Login;
