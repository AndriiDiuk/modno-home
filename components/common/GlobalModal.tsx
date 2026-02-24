"use client";

import React from "react";
import { ModalWrapper } from "../common/ModalWrapper";
import { CallbackForm } from "../forms/CallbackForm";
import { useModal } from "../providers/ModalProvider";

interface GlobalModalProps {
  socials?: {
    vk?: string;
    youtube?: string;
  };
}

export const GlobalModal: React.FC<GlobalModalProps> = ({ socials }) => {
  const { isOpen, closeModal, title, buttonLabel } = useModal();

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={closeModal}
      className='max-w-[460px]'
    >
      <CallbackForm title={title} buttonLabel={buttonLabel} socials={socials} />
    </ModalWrapper>
  );
};
