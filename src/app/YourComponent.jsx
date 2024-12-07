import { useContext } from 'react';
import YourContext from './YourContext'; // Import your context

export default function YourComponent() {
  return (
    <YourContext.Consumer>
      {(value) => (
        // Render something based on the context value
        <div>{value}</div>
      )}
    </YourContext.Consumer>
  );
}
