import logo from './logo.svg';
import './App.css';
import { Toast } from './Toast';
import { useState, useCallback } from 'react';

// add button to page
// button displays toasts

// move the state into the toast
// add close button on the toast

// show multiple toasts at once (that stack)

function App() {
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState({});

  // counter that represents id of surrent toast message
  const [toastId, setToastId] = useState(0);

  const addMessage = () => {
    console.log('add message')
    const messageToastId = toastId;
    setToastId(current => current + 1);

    setMessages(currentMessages => {
      const draft = {...currentMessages};
      draft[messageToastId] = 'I am a toast';
      return draft;
    });
  }

  const removeMessage = useCallback((id) => {
    setMessages(currentMessages => {
      const draft = {...currentMessages};
      delete draft[id];
      return draft;
    });
  }, []);

  const handleButtonClick = () => addMessage();

  return (
    <div className="App">
      <div className="App-toasts">

      {Object.entries(messages).map(([key, content]) =>
        <Toast show={show} toastId={key} key={key} removeMessage={removeMessage} >{content}</Toast>
      )}
      </div>
      <header className="App-header">
        <button className="App-button" onClick={handleButtonClick}>{show ? 'Hide': 'Show'}</button>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
