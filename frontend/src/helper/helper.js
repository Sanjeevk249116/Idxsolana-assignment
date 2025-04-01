import { toast } from "react-toastify";
let sessionExpiredNotified = false;

export async function notifyError(msg, status = false) {
  let errorMessage = msg;
  if (status === 498 || status === 401||status===403) {
    if (!sessionExpiredNotified) {
      try {
        localStorage.removeItem("auction-client");
        sessionExpiredNotified = true;
        // toast.error("Session expired. Please log in again.", {
        //   hideProgressBar: true,
        //   autoClose: 2000,
        // });

        window.location.href = "/login";

        return;
      } catch (error) {
        console.error("Error handling session expiration:", error);
      }
    }
    return;
  }

  if (status) {
    errorMessage = extractErrorMessage(msg);
  }
  document.body.style.overflow = "auto";
  toast.error(errorMessage, {
    hideProgressBar: true,
    autoClose: 2000,
  });
}

function extractErrorMessage(htmlText) {
  let match = htmlText.match(/Error: (.+?)<br>/); // Extracts error text from HTML
  return match ? match[1] : "An unknown error occurred";
}

export function notifySuccess(msg) {
  document.body.style.overflow = "auto";
  toast.success(msg, {
    // position: toast.POSITION.BOTTOM_LEFT,
    hideProgressBar: true,
    autoClose: 2000,
  });
}