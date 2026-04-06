"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

/**
 * Methods có thể gọi từ bên ngoài qua ref
 */
export interface ModalRef {
  /** Mở modal */
  open: () => void;
  /** Đóng modal */
  close: () => void;
  /** Toggle modal (mở nếu đang đóng, đóng nếu đang mở) */
  toggle: () => void;
}

/**
 * Props cho Modal component
 */
export interface ModalProps {
  /** ID của modal (dùng cho Bootstrap modal trigger) */
  modalId: string;
  /** Tiêu đề modal */
  title: string | ReactNode;
  /** Content bên trong modal (user tự soạn) */
  children: ReactNode;
  /** Custom className cho modal */
  modalClassName?: string;
  /** Custom className cho modal dialog */
  dialogClassName?: string;
  /** Custom className cho modal body */
  bodyClassName?: string;
  /** Có hiển thị close button không */
  showCloseButton?: boolean;
  /** Control modal từ bên ngoài (optional) */
  isOpen?: boolean;
  /** Callback khi modal mở */
  onOpen?: () => void;
  /** Callback khi modal đóng */
  onClose?: () => void;
}

/**
 * Component Modal tái sử dụng - Chỉ cung cấp khung với title
 * Content bên trong để user tự soạn
 *
 * @example
 * ```tsx
 * // Cách 1: Dùng ref để control
 * const modalRef = useRef<ModalRef>(null);
 *
 * <Modal
 *   ref={modalRef}
 *   modalId="exampleModal"
 *   title="TITLE MODAL"
 * >
 *   <form onSubmit={handleSubmit}>
 *     <div className="mb-3">
 *       <label className="label-custom">WALLET</label>
 *       <input className="form-control custom-input" type="text" />
 *     </div>
 *     <div className="mb-3">
 *       <button type="submit" className="btn btn-gradient w-100 lg">
 *         SUBMIT
 *       </button>
 *     </div>
 *   </form>
 * </Modal>
 *
 * <button onClick={() => modalRef.current?.open()}>Open Modal</button>
 * ```
 *
 * @example
 * ```tsx
 * // Cách 2: Dùng prop isOpen để control
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Modal
 *   modalId="exampleModal"
 *   title="TITLE MODAL"
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 * >
 *   <div>Content</div>
 * </Modal>
 *
 * <button onClick={() => setIsOpen(true)}>Open Modal</button>
 * ```
 */
const Modal = forwardRef<ModalRef, ModalProps>(
  (
    {
      modalId,
      title,
      children,
      modalClassName = "modal m-buybot fade",
      dialogClassName = "modal-dialog modal-dialog-centered",
      bodyClassName = "",
      showCloseButton = true,
      isOpen,
      onOpen,
      onClose,
    },
    ref
  ) => {
    const modalElementRef = useRef<HTMLDivElement>(null);
    const bootstrapModalRef = useRef<any>(null);

    /**
     * Khởi tạo Bootstrap Modal instance
     */
    const initBootstrapModal = () => {
      if (typeof window === "undefined") return null;
      if (!modalElementRef.current) return null;

      // Kiểm tra Bootstrap có sẵn không
      const Bootstrap = (window as any).bootstrap;
      if (!Bootstrap || !Bootstrap.Modal) return null;

      // Khởi tạo modal nếu chưa có
      if (!bootstrapModalRef.current) {
        bootstrapModalRef.current = new Bootstrap.Modal(
          modalElementRef.current,
          {
            backdrop: true,
            keyboard: true,
          }
        );

        // Lắng nghe events
        const handleShown = () => {
          onOpen?.();
        };

        const handleHidden = () => {
          onClose?.();
        };

        modalElementRef.current.addEventListener("shown.bs.modal", handleShown);
        modalElementRef.current.addEventListener(
          "hidden.bs.modal",
          handleHidden
        );
      }

      return bootstrapModalRef.current;
    };

    /**
     * Khởi tạo Bootstrap Modal khi component mount
     */
    useEffect(() => {
      // Đợi một chút để đảm bảo Bootstrap đã load
      const timer = setTimeout(() => {
        initBootstrapModal();
      }, 100);

      // Cleanup listeners khi unmount
      return () => {
        clearTimeout(timer);
        if (modalElementRef.current) {
          modalElementRef.current.removeEventListener(
            "shown.bs.modal",
            () => {}
          );
          modalElementRef.current.removeEventListener(
            "hidden.bs.modal",
            () => {}
          );
        }
      };
    }, [onOpen, onClose]);

    /**
     * Expose methods qua ref
     */
    useImperativeHandle(ref, () => ({
      open: () => {
        // Thử lấy modal instance hiện có
        let modal = bootstrapModalRef.current;

        // Nếu chưa có, thử khởi tạo
        if (!modal) {
          modal = initBootstrapModal();
        }

        // Nếu vẫn chưa có (Bootstrap chưa load), đợi một chút rồi thử lại
        if (!modal) {
          const retryTimer = setTimeout(() => {
            const retryModal = initBootstrapModal();
            if (retryModal) {
              retryModal.show();
            }
          }, 200);
          return;
        }

        modal.show();
      },
      close: () => {
        const modal = bootstrapModalRef.current;
        if (modal) {
          modal.hide();
        }
      },
      toggle: () => {
        let modal = bootstrapModalRef.current;
        if (!modal) {
          modal = initBootstrapModal();
        }
        if (modal) {
          modal.toggle();
        }
      },
    }));

    /**
     * Sync với prop isOpen
     */
    useEffect(() => {
      if (isOpen === undefined) return;

      let modal = bootstrapModalRef.current;
      if (!modal) {
        modal = initBootstrapModal();
      }

      if (!modal) {
        // Nếu modal chưa được khởi tạo, đợi một chút rồi thử lại
        const timer = setTimeout(() => {
          const retryModal = initBootstrapModal();
          if (retryModal) {
            if (isOpen) {
              retryModal.show();
            } else {
              retryModal.hide();
            }
          }
        }, 200);
        return () => clearTimeout(timer);
      }

      if (isOpen) {
        modal.show();
      } else {
        modal.hide();
      }
    }, [isOpen]);

    /**
     * Cleanup khi unmount
     */
    useEffect(() => {
      return () => {
        if (bootstrapModalRef.current) {
          bootstrapModalRef.current.dispose();
          bootstrapModalRef.current = null;
        }
      };
    }, []);

    return (
      <div
        ref={modalElementRef}
        className={modalClassName}
        id={modalId}
        tabIndex={-1}
        aria-labelledby={`${modalId}Label`}
        aria-hidden="true"
      >
        <div className={dialogClassName}>
          <div className="modal-content">
            <div className={`modal-body ${bodyClassName}`}>
              {showCloseButton && (
                <button
                  className="btn-close"
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={onClose}
                >
                  <img src="/images/menu/close-menu.svg" alt="icon" />
                </button>
              )}

              <div className="p-4">
                <div className="title-md text-center mb-4">{title}</div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
