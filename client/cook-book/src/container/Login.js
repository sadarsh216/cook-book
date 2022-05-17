import React from "react";
import { Formik } from "formik";
import { LockClosedIcon } from "@heroicons/react/outline";
import * as Yup from "yup";
import { connect } from "react-redux";
import { login } from "../actions";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6),
});

function mapDispatchToProps(dispatch) {
  return {
    login: (userData) => dispatch(login(userData)),
  };
}

const Login = (props, { setLogin }) => {
  const handleLogin = data => {
    props.login(data)
  }
  return (
    <div className="min-h-full flex items-center justify-center py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => handleLogin(values)} 
        >
          {(props) => (
            <form className="mt-2 space-y-2" onSubmit={props.handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={props.values.email}
                    onChange={(e) =>
                      props.setFieldValue("email", e.target.value)
                    }
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                {props.errors.email ? (
                  <p className="italic text-red-400 text-sm">
                    {props.errors.email}
                  </p>
                ) : (
                  <p>{""}</p>
                )}
                <br />
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={props.values.password}
                    onChange={(e) =>
                      props.setFieldValue("password", e.target.value)
                    }
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
                {props.errors.password ? (
                  <p className="italic text-red-400 text-sm">
                    {props.errors.password}
                  </p>
                ) : (
                  <p>{""}</p>
                )}
                <br />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-white-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className="text-sm text-center" onClick={() => props.setLogin(false)}>
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Don't have an account? Create here to register
          </a>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

function mapStateToProps(state) {
  return {
    user: state.rootReducer.user,
    loggedIn:state.rootReducer.loggedIn,
    loggingIn:state.rootReducer.loggingIn,
    error:state.rootReducer.error
  };
}
const LoginForm = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginForm;
