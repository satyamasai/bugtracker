import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FcAddDatabase } from "react-icons/fc";

function InitialFocus({ handleBug, severity }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bugname, setBugname] = useState("");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  // console.log(initialRef)
  return (
    <>
      <button onClick={onOpen}>
        <FcAddDatabase />
      </button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Report Bug</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Bug</FormLabel>
              <Input
                value={bugname}
                onChange={(e) => setBugname(e.target.value)}
                ref={initialRef}
                placeholder="Write Bug name"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                handleBug(severity, bugname);
                setBugname("")
                onClose();
              }}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InitialFocus;
