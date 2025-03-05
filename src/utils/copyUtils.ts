
import { useToastStore } from "../store/toastStore";

export const copyToClipboard = (text: string, customMessage?: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      const { showToast } = useToastStore.getState();
      showToast(customMessage || "Copied to clipboard!");
    })
    .catch(err => {
      console.error("Failed to copy text: ", err);
    });
};
