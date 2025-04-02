import { toast } from "react-toastify";
let sessionExpiredNotified = false;

export async function notifyError(msg, status = false) {
  if (status === 498 || status === 401 || status === 403) {
    if (!sessionExpiredNotified) {
      try {
        localStorage.removeItem("note-token");
        sessionExpiredNotified = true;
        toast.error("Session expired. Please log in again.", {
          hideProgressBar: true,
          autoClose: 2000,
        });

        window.location.href = "/";
        return;
      } catch (error) {
        console.error("Error handling session expiration:", error);
      }
    }
    return;
  }

  document.body.style.overflow = "auto";
  toast.error(msg, {
    hideProgressBar: true,
    autoClose: 2000,
  });
}

export function notifySuccess(msg) {
  document.body.style.overflow = "auto";
  toast.success(msg, {
    // position: toast.POSITION.BOTTOM_LEFT,
    hideProgressBar: true,
    autoClose: 2000,
  });
}
