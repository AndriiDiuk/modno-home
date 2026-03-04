"use client";

import React, { useState } from "react";
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    closeModal();
    setTimeout(() => setIsSubmitted(false), 250);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={handleClose}
      className={isSubmitted ? "max-w-[696px] px-2.5! py-2.5! md:px-2.5! md:py-2.5!" : "max-w-[460px]"}
    >
      <CallbackForm
        title={title}
        buttonLabel={buttonLabel}
        socials={socials}
        onSuccess={() => setIsSubmitted(true)}
      />
    </ModalWrapper>
  );
};
