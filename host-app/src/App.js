import React from "react";
const RemoteApp = React.lazy(() => import("remote/RemoteApp"));

export default function App() {
  return (
    <div>
      <h1 style={{color:'blue'}}>Host App</h1>

      <React.Suspense fallback={<div>Loading Remote...</div>}>
        <RemoteApp />
      </React.Suspense>
    </div>
  );
}