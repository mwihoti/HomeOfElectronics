import 'intasend-inlinejs-sdk';
import { useEffect } from 'react';
import axios from 'axios';

const MyScreen = ({ amount, phone, reference, onComplete, onFailed, onInProgress }) => {

  useEffect(() => {
    if (typeof window !== 'undefined' && window.IntaSend) {
      const intasend = new window.IntaSend({
        publicAPIKey: "ISPubKey_test_8d4987b0-d63a-4a54-a536-02a0032c9f4c",
        live: false // Set to true for live environment
      });

      intasend
        .on("COMPLETE", async (response) => {
          console.log("COMPLETE:", response);
          onComplete(response);
        })
        .on("FAILED", (response) => {
          console.log("FAILED:", response);
          onFailed(response);
        })
        .on("IN-PROGRESS", () => {
          console.log("IN-PROGRESS...");
          onInProgress();
        });

      intasend.setup({
        amount,
        currency: "KES",
        phone_number: phone,
        reference,
      });

      intasend.open();
    }
  }, [amount, phone, reference, onComplete, onFailed, onInProgress]);

  return null;
};

export default MyScreen;
