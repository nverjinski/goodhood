import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  position: absolute;
  background: #ffffff;
  padding: 24px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.heavy_line_outline};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  width: ${({ width }) => width};
  height: ${({ height }) => height};
  top: ${({ anchor }) => anchor.top};
  left: ${({ anchor }) => anchor.left};
  right: ${({ anchor }) => anchor.right};
  bottom: ${({ anchor }) => anchor.bottom};

  transform: ${({ anchor }) =>
    anchor.top === "50%" && anchor.left === "50%"
      ? "translate(-50%, -50%)"
      : "none"};
`;

const DialogModal = ({
  isOpen,
  onClose,
  width = "500px",
  height = "auto",
  anchor = { top: "50%", left: "50%" },
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Overlay onClick={onClose} role="dialog" aria-modal="true">
      <ModalWrapper
        width={width}
        height={height}
        anchor={anchor}
        onClick={handleContentClick}
      >
        {children}
      </ModalWrapper>
    </Overlay>
  );
};

export default DialogModal;
