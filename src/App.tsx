import React, { Suspense } from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Posts } from "./pages";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Suspense fallback={() => <div>loading...</div>}>
        <Switch>
          <Route path="/">
            <Posts />
          </Route>
        </Switch>
        </Suspense>
      </Router>
    </RecoilRoot>
  );
}

export default App;
