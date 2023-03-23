import { Button, Modal } from "flowbite-react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/ui";

interface ModalComponentProps {
  title: string;
  children: React.ReactNode[] | React.ReactNode;
  footer?: boolean;
}

export const ModalComponent: React.FC<ModalComponentProps> = ({
  children,
  title,
  footer = false,
}) => {
  const [toggleModal, setToggleModal] = useRecoilState<boolean>(modalState);
  return (
    <Modal
      dismissible={true}
      show={toggleModal}
      onClose={() => setToggleModal(false)}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer && (
        <Modal.Footer>
          <Button>I accept</Button>
          <Button
            color="gray"
            type="button"
            onClick={() => setToggleModal(false)}
          >
            Decline
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};
