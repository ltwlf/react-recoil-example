import * as React from "react";
import { RecoilRoot } from "recoil";

export const TestApp = ({ children }: React.PropsWithChildren<any>) => (
  <RecoilRoot>
    <React.Suspense fallback={<div>loading</div>}>{children}</React.Suspense>
  </RecoilRoot>
);
