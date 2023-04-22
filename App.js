import * as React from "react";
import { Provider } from "react-redux";
import { Navigation } from "./src/screens/Navigation";
import { setupStore } from "./src/store/store";
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const store = setupStore();

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
