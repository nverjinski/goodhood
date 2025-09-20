import styled, { keyframes, css } from "styled-components";

// Keyframes describing the modal's movement from offscreen to the screen's center
const slideInFromOffscreen = keyframes`
  from {
    transform: translate(-50%, -100vh);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

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

  /* Set the default, final transform for non-animated modals */
  transform: ${({ anchor }) =>
    anchor.top === "50%" && anchor.left === "50%"
      ? "translate(-50%, -50%)"
      : "none"};

  /* If animating, apply the keyframes */
  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${slideInFromOffscreen} 0.5s cubic-bezier(0.25, 1, 0.5, 1)
        forwards;
    `}
`;

const DialogModal = ({
  isOpen,
  onClose,
  width = "500px",
  height = "auto",
  anchor = { top: "50%", left: "50%" },
  children,
  animate = false,
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
        $animate={animate}
      >
        {children}
      </ModalWrapper>
    </Overlay>
  );
};

export default DialogModal;
