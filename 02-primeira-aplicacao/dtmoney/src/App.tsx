import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header.tsx";

import { GlobalStyle } from "./styles/global";

import Modal from 'react-modal';
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";

Modal.setAppElement('#root');

export function App() {

  const [isNewModalTransactionOpen, setIsNewModalTransactionOpen] = useState(false);

    function handleOpenNewTransactionModal(){
        setIsNewModalTransactionOpen(true);
    }

    function handleCloseNewTransactionModal(){
        setIsNewModalTransactionOpen(false);
    }

  return (
    <>
      <Header 
        onOpenNewTransactionModal={handleOpenNewTransactionModal}
      />

      <NewTransactionModal 
        isOpen={isNewModalTransactionOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <Dashboard />
      <GlobalStyle/>
    </>
  );
}

