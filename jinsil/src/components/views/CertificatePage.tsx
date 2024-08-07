import { useNavigate, useParams } from "react-router-dom";
import { Certificate } from "../certificate";
import { DefaultHeader } from "../ui/default-header";
import { DefaultFooter } from "../ui/default-footer";
import { AnimatePresence, motion } from "framer-motion";
import { PrivacyPage } from "./PrivacyPage";
import { useState } from "react";
import { ContactPage } from "./ContactPage";
import { CubingTransition } from "../ui/motion/CubingTransition";
import { GradientSwipeBlob } from "../ui/motion/GradientSwipBlob";
import { WipeTransition } from "../ui/motion/WipeTransition";
import { DiagonalSlideTransition } from "../ui/motion/DiagonalSlideTransition";


export const CertificatePage = () => {
  const { id } = useParams<{ id: string }>();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const navigate = useNavigate();

  const toggleBodyOverflow = (shouldHide: boolean) => {
      if (shouldHide) {
          window.scrollTo(0, 0);
          document.body.style.overflow = 'hidden';
      } else {
          window.scrollTo(0, document.body.scrollHeight);
          document.body.style.overflow = '';
      }
  };

  const handleShowContact = () => {
      setShowContact(true);
      toggleBodyOverflow(true);
  };

  const handleHideContact = () => {
      setShowContact(false);
      toggleBodyOverflow(false);
  };

  const handleShowPrivacy = () => {
      setShowPrivacy(true);
      toggleBodyOverflow(true);
  };

  const handleHidePrivacy = () => {
      setShowPrivacy(false);
      toggleBodyOverflow(false);
  };

  return (
    <>
        <DiagonalSlideTransition />
        <AnimatePresence>
            {showContact && <ContactPage onBack={handleHideContact} />}
            {showPrivacy && <PrivacyPage onBack={handleHidePrivacy} />}
        </AnimatePresence>
        <DefaultHeader />
        <Certificate id={id ?? ""} />
        <DefaultFooter onContactClick={handleShowContact} onPrivacyClick={handleShowPrivacy} />
    </>
  );
};
