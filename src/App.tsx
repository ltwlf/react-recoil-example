import React, { Suspense } from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import { Posts } from "./components";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<h2>loading...</h2>}>
        <Posts />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
