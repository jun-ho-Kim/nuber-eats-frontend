import { gql, useQuery, useReactiveVar } from '@apollo/client';
import React from 'react';
import { isLoggedInVar } from './apollo';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';

// const IS_LOGGED_IN = gql`
//   query isLoggedIn {
//     isLoggedIn @client
//   }
// `

function App() {
  // const {data: {isLoggedIn}} = useQuery(IS_LOGGED_IN);
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  return isLoggedIn? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
