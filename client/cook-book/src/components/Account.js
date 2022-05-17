import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LoginIcon } from "@heroicons/react/outline";
import Login from "../container/Login";
import Register from "../container/Register";
import { connect } from "react-redux";

const Account = (props) => {
  const [login, setLogin] = React.useState(true);
  const cancelButtonRef = useRef(null);

  return (
    <>
      {props.open ? (
        <>
          <Transition.Root show={props.open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={props.setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <LoginIcon
                              className="h-6 w-6 text-green-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title
                              as="h1"
                              className="text-2xl leading-6 font-bold text-gray-900"
                            >
                              {login ? "Login" : "Register"}
                            </Dialog.Title>
                            <p className="mt-2 text-sm text-gray-500">
                              Login with your account to like, comment and
                              upload recipes.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        {login ? (
                          <>
                            {props.error ? (
                               <div
                               class="flex block mx-6 items-center bg-red-500 rounded text-white text-sm font-bold px-4 py-3"
                               role="alert"
                             >
                               <p>
                                {props.error}
                               </p>
                             </div>
                            ) : null}
                            <Login setLogin={setLogin} />
                          </>
                        ) : (
                          <>
                            {props.registerError ? (
                              <div
                                class="flex block mx-6 items-center bg-red-500 rounded text-white text-sm font-bold px-4 py-3"
                                role="alert"
                              >
                                <p>{props.registerError}</p>
                              </div>
                            ) : null}
                            {props.registered ? (
                              <>
                                <div
                                  class="flex block mx-6 items-center bg-green-500 rounded text-white text-sm font-bold px-4 py-3"
                                  role="alert"
                                >
                                  <p>
                                    Registration succes!
                                    <p
                                      className="cursor-pointer"
                                      onClick={() => setLogin(true)}
                                    >
                                      <u>Click here to login</u>
                                    </p>
                                  </p>
                                </div>
                              </>
                            ) : null}
                            <Register setLogin={setLogin} />
                          </>
                        )}
                      </div>

                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        {/* <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => props.setOpen(false)}
                  >
                    Deactivate
                  </button> */}
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => props.setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Close
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

Account.propTypes = {};

function mapStateToProps(state) {
  return {
    user: state.rootReducer.user,
    loggedIn: state.rootReducer.loggedIn,
    loggingIn: state.rootReducer.loggingIn,
    error: state.rootReducer.error,
    registerError: state.registerReducer.registerError,
    registering: state.registerReducer.registering,
    registered: state.registerReducer.registered,
  };
}
const AccountComponent = connect(mapStateToProps, null)(Account);

export default AccountComponent;
