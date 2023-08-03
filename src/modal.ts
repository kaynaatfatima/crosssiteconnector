// modal.ts
export function openModal(apiKey: string) {
  // Send the API key to paymentGatewayWeb
  const paymentGatewayWebUrl = `http://127.0.0.1:5173/`;
  const paymentGatewayWebURL_key = `${paymentGatewayWebUrl}payment?key=${apiKey}`;
  const paymentGatewayWebWindow = window.open(paymentGatewayWebURL_key, "_blank");

  // Listen for messages from paymentGatewayWeb
  window.addEventListener("message", receiveMessage, false);

  function receiveMessage(event: MessageEvent) {
    // Check the origin of the message to ensure it's coming from paymentGatewayWebsite
    if (event.origin === paymentGatewayWebUrl) {
      const data = event.data;

      // Assuming the response data contains the 'embedded' property indicating whether it's embedded or not
      const embedded = data.embedded;

      if (embedded) {
        // Code to display the paymentGatewayWeb in an embedded modal on qrWebPage
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
      } else {
        // embedded=false
        // Open paymentGatewayWebsite in the same tab as qrWebPage
        paymentGatewayWebWindow.location.href = paymentGatewayWebURL_key;
      }
    }
  }
}
