export function openModal(apiKey: string) {
  // Send the API key to paymentGatewayWebsite
  const paymentGatewayWebUrl = `http://127.0.0.1:5173/`;
  const paymentGatewayWebURL_key = `${paymentGatewayWebUrl}payment?key=${apiKey}`;

  // Code to display the paymentGatewayWebsite in an embedded modal on websiteA
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");

  const closeButton = document.createElement("button");
  closeButton.classList.add("modal-close-btn");
  closeButton.innerText = "X";
  closeButton.addEventListener("click", () => closeModal());
  modalOverlay.appendChild(closeButton);

  const iframe = document.createElement("iframe");
  iframe.src = paymentGatewayWebURL_key + "&embedded=true";
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("frameborder", "0");
  modalOverlay.appendChild(iframe);

  document.body.appendChild(modalOverlay);

  const closeModal = (): void => {
    document.body.removeChild(modalOverlay);
  };

  // Listen for messages from paymentGatewayWebsite
  window.addEventListener("message", receiveMessage, false);

  function receiveMessage(event: MessageEvent) {
    // Ensure origin of the message
    if (event.origin === paymentGatewayWebUrl) {
      const data = event.data;
      const embedded = data.embedded;

      if (!embedded) {
        // embedded=false, close the modal and open paymentGatewayWebsite in a new tab
        closeModal();
        window.location.href = paymentGatewayWebURL_key;
      }
    }
  }
}
