# react-deso-protocol

This package provides a pre-defined context and context provider for using DeSo
Identity with in react applications. Removes a lot of the typical boilerplate
needed to sync DeSo Identity state.

## Installation
```sh
npm i react-deso-protocol
```

### Usage
Wrap your app in the `DeSoIdentityProvider`. NOTE: this may be a little different
depending on how the root of your application is set up.

```tsx
// index.ts
import { DeSoIdentityProvider } from 'react-deso-protocol';
import { App } from './App';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DeSoIdentityProvider>
      <App />
    </DeSoIdentityProvider>
  </React.StrictMode>

```

Now you can use `DeSoIdentityContext` anywhere in your app.
```tsx
import { useContext } from 'react';
import { DeSoIdentityContext } from 'react-deso-protocol';

// MyCoolComponent.tsx
const MyCoolComponent = () => {
  // ... use any of these context properties anywhere in your app
  const { currentUser, alternateUsers, isLoading } = useContext(DeSoIdentityContext);

  ...
};
```
