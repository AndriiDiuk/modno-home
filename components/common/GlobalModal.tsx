"use client";

import React from "react";
import { ModalWrapper } from "../common/ModalWrapper";
import { CallbackForm } from "../forms/CallbackForm";
import { useModal } from "../providers/ModalProvider";

export const GlobalModal: React.FC = () => {
  const { isOpen, closeModal } = useModal();

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal}>
      <CallbackForm />
    </ModalWrapper>
  );
};
