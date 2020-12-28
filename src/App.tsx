import React, { Suspense } from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { PostList } from './components/PostList';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={ ()=> <div>loading...</div>}>
        <PostList/>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
