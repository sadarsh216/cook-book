import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { LockClosedIcon } from "@heroicons/react/outline";
import { connect } from "react-redux";
import { register } from "../actions/registerUser";

function mapDispatchToProps(dispatch) {
  return { register: (userData) => dispatch(register(userData)) };
}

const signupSchema = Yup.object().shape({
  firstname: Yup.string().min(6).max(25).required(),
  lastname: Yup.string().min(3).max(25).required(),
  email: Yup.string().min(6).required().email(),
  password: Yup.string().required().min(6),
});

const Register = (props,{ setLogin }) => {
  return (
    <div className="min-h-full flex items-center justify-center py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
          }}
          validationSchema={signupSchema}
          onSubmit={(values, actions) => {
            props.register(values)
          }}
        >
          {(props) => (
            <form className="mt-2 space-y-2" onSubmit={props.handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md -space-y-px">
                <div>
                  <label htmlFor="first-name" className="sr-only">
                    Firstname
                  </label>
                  <input
                    id="first-name"
                    name="firstname"
                    type="text"
                    autoComplete="firstname"
                    value={props.values.firstname}
                    onChange={(e) =>
                      props.setFieldValue("firstname", e.target.value)
                    }
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Firstname"
                  />
                  {props.errors.firstname && props.touched.firstname ? (
                    <p className="italic text-red-400 text-sm">
                      {props.errors.firstname}
                    </p>
                  ) : (
                    <p>{""}</p>
                  )}
                </div>
                <br />
                <div>
                  <label htmlFor="last-name" className="sr-only">
                    Lastname
                  </label>
                  <input
                    id="last-name"
                    name="lastname"
                    type="text"
                    autoComplete="lastname"
                    value={props.values.lastname}
                    onChange={(e) =>
                      props.setFieldValue("lastname", e.target.value)
                    }
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Lastname"
                  />
                  {props.errors.lastname && props.touched.lastname ? (
                    <p className="italic text-red-400 text-sm">
                      {props.errors.lastname}
                    </p>
                  ) : (
                    <p>{""}</p>
                  )}
                </div>
                <br />
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
                  {props.errors.email && props.touched.email ? (
                    <p className="italic text-red-400 text-sm">
                      {props.errors.email}
                    </p>
                  ) : (
                    <p>{""}</p>
                  )}
                </div>
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
                  {props.errors.password && props.touched.password ? (
                    <p className="italic text-red-400 text-sm">
                      {props.errors.password}
                    </p>
                  ) : (
                    <p>{""}</p>
                  )}
                </div>
                <br />
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
                  Register
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className="text-sm text-center" onClick={() => props.setLogin(true)}>
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Create here to login
          </a>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {};

function mapStateToProps(state) {
  return {
    registering: state.registerReducer.registering,
    registered: state.registerReducer.registered,
    error: state.registerReducer.error,
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(Register);
