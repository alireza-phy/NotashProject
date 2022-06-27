// import Cookies from 'universal-cookie';
// import {useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import apiClient from "../apiClient";
import SignUpDialog from "./SignUpDialog";
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';

const url = apiClient.defaults.baseUrl;

let validationSchema = Yup.object().shape({
  email: Yup.string().email().required("please enter your email"),
  password: Yup.string().required("please enter your password"),
});
const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [showPopUp, setpopUp] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const handleClickOpen = () => {
    setpopUp(true);
  };

  const onSubmit = (values) => {
    console.log(values);
    apiClient
      .post(url + "Login", {
        email: values.email,
        password: values.password,
      })
      .then(function (response) {
        // if (response?.status === 200) {
          let userSession = response?.data?.session;
          console.log(userSession);
          cookies.set('session', userSession?.id, {path: '/'})
                    navigate("/");
        // }
      })
      .catch(function (error) {
        console.log(error);
        alert("problem accured during sign in. try again");
      });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({
          errors,
          touched,
          handleSubmit,
          values,
          handleChange,
          handleBlur,
        }) => {
          return (
            <Box
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                my: window.innerHeight < 600 ? "36px" : 0,
              }}
            >
              <Box>
                <Box
                //   sx={{
                //     width: { xs: "260px", sm: "290px", md: "320px" },
                //     height: "580px",
                //     display: "flex",
                //     flexDirection: "column",
                //     paddingY: 4,
                //     alignItems: "center",
                //     justifyContent: "center",
                //     backgroundColor: "white",
                //     borderRadius: 2,
                //   }}
                >
                  <Form
                    onSubmit={handleSubmit}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "full",
                      height: "100%",
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          label="email"
                          variant="outlined"
                          fullWidth
                          //multiline
                          onChange={handleChange}
                          name="email"
                          value={values.email}
                          onBlur={handleBlur}
                          error={!!errors.email && touched.email}
                          helperText={
                            !!errors.email && touched.email ? errors.email : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          label="password"
                          variant="outlined"
                          fullWidth
                          type={"password"}
                          name="password"
                          onChange={handleChange}
                          value={values.password}
                          onBlur={handleBlur}
                          error={!!errors.password && touched.password}
                          helperText={
                            !!errors.password && touched.password
                              ? errors.password
                              : ""
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="Submit"
                          fullWidth
                        >
                          sign in
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleClickOpen}
                          fullWidth
                        >
                          new account
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                </Box>
              </Box>
            </Box>
          );
        }}
      </Formik>

      <SignUpDialog showPopUp={showPopUp} setpopUp={setpopUp} />
    </>
  );
};

export default Login;
