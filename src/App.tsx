import React, { Suspense } from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import { Comments, Posts } from "./components";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<h2>loading...</h2>}>
        <Posts />
        <React.Suspense fallback={<h3>loading comments...</h3>}>
          <Comments />
        </React.Suspense>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
