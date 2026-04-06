import { Confirm } from "notiflix/build/notiflix-confirm-aio";
export class ConfirmNotiflix {
  static show(
    message: string,
    onOk: () => void,
    onCancel?: () => void,
    options?: {
      title?: string;
      okButtonText?: string;
      cancelButtonText?: string;
      width?: string;
      borderRadius?: string;
      backgroundColor?: string;
      okButtonBackground?: string;
      cancelButtonBackground?: string;
    }
  ) {
    Confirm.show(
      options?.title || "Confirm",
      message,
      options?.okButtonText || "OK",
      options?.cancelButtonText || "Cancel",
      onOk,
      onCancel,
      {
        titleColor: options?.title ? "#DC143C" : "#000",
        width: options?.width || "320px",
        borderRadius: options?.borderRadius || "8px",
        backgroundColor: options?.backgroundColor || "#fff",
        okButtonBackground: options?.okButtonBackground || "#DC143C",
        cancelButtonBackground: options?.cancelButtonBackground || "#6c757d",
      }
    );
  }
}
