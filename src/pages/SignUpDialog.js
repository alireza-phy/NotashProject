import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import apiClient from "../apiClient";
import { Navigate } from "react-router-dom";

const url = apiClient.defaults.baseUrl;
const initialValues = {
  userName: "",
  password: "",
  Email: "",
};
let validationSchema = Yup.object().shape({
  userName: Yup.string().required("please enter your username"),
  password: Yup.string().required("please enter your password"),
  Email: Yup.string().email().required("please enter your valid Email"),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SignUpDialog = (props) => {
  const { showPopUp, setpopUp } = props;

  const handleClose = () => {
    setpopUp(false);
  };

  const onSubmit = (values) => {
    apiClient
      .post(url + "Create", {
        email: values?.Email,
        id: null,
        password: values?.password,
        username: values?.userName,
      })
      .then(function (response) {
        if (response?.status === 200)
          alert("your acount created successfully!");
        setpopUp(false);
      })
      .catch(function (error) {
        alert("problem accured during submit. try again");
      });
  };

  return (
    <Dialog
      open={showPopUp}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Create new account..."}</DialogTitle>
      <DialogContent>
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
              //   sx={{
              //     width: "100vw",
              //     height: "100vh",
              //     display: "flex",
              //     flexDirection: "column",
              //     alignItems: "center",
              //     justifyContent: "center",
              //     my: window.innerHeight < 600 ? "36px" : 0,
              //   }}
              >
                <Box>
                  <Box
                    sx={{
                      width: { xs: "260px", sm: "290px", md: "320px" },
                      height: "full",
                      display: "flex",
                      flexDirection: "column",
                      paddingY: 4,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                      borderRadius: 2,
                    }}
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
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            //multiline
                            onChange={handleChange}
                            name="Email"
                            value={values.Email}
                            onBlur={handleBlur}
                            error={!!errors.Email && touched.Email}
                            helperText={
                              !!errors.Email && touched.Email
                                ? errors.Email
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            label="username"
                            variant="outlined"
                            fullWidth
                            //multiline
                            onChange={handleChange}
                            name="userName"
                            value={values.userName}
                            onBlur={handleBlur}
                            error={!!errors.userName && touched.userName}
                            helperText={
                              !!errors.userName && touched.userName
                                ? errors.userName
                                : ""
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

                        <Grid item xs={12} sm={12}>
                          <Button
                            variant="contained"
                            color="secondary"
                            type="Submit"
                            fullWidth
                          >
                            sign up
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
      </DialogContent>
    </Dialog>
  );
};
export default SignUpDialog;
