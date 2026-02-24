"use client";

import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  title?: string;
  buttonLabel?: string;
  openModal: (title?: string, buttonLabel?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [buttonLabel, setButtonLabel] = useState<string | undefined>(undefined);

  const openModal = (
    modalTitle?: string | unknown,
    modalButtonLabel?: string,
  ) => {
    if (typeof modalTitle === "string") {
      setTitle(modalTitle);
    } else {
      setTitle(undefined);
    }
    setButtonLabel(modalButtonLabel);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setTitle(undefined);
    setButtonLabel(undefined);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, title, buttonLabel, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
