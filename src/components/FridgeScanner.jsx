import { useState } from "react";
import "../styles/FridgeScanner.css";

function FridgeScanner({ onIngredientsFound }) {
  const [scanning, setScanning] = useState(false);
  const [preview, setPreview] = useState(null);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target.result;
      setPreview(base64);
      await scanImage(base64);
    };
    reader.readAsDataURL(file);
  }

  async function scanImage(base64DataUrl) {
    setScanning(true);
    const base64Data = base64DataUrl.split(",")[1];
    const mediaType = base64DataUrl.split(";")[0].split(":")[1];

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 512,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: mediaType,
                    data: base64Data,
                  },
                },
                {
                  type: "text",
                  text: `Look at this fridge photo and list every food ingredient you can see.
                Respond ONLY with a JSON array, no markdown, no backticks.
                Example: ["eggs", "milk", "cheese", "spinach"]
                Only include real food items you can clearly identify.`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const text = data.content[0].text;
      const cleaned = text.replace(/```json|```/g, "").trim();
      const items = JSON.parse(cleaned);
      onIngredientsFound(items);
    } catch (err) {
      console.error(err);
      alert("Could not scan image. Try again or add ingredients manually.");
    } finally {
      setScanning(false);
    }
  }

  return (
    <div className="fridge-scanner">
      {preview ? (
        <div className="fridge-scanner-preview">
          <img src={preview} alt="fridge" />
          {scanning ? (
            <p className="fridge-scanner-scanning">
              Scanning for ingredients...
            </p>
          ) : (
            <label className="fridge-scanner-reupload">
              Upload a different photo
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: "none" }}
              />
            </label>
          )}
        </div>
      ) : (
        <label className="fridge-scanner-empty">
          <p className="icon"></p>
          <p className="title">Scan your fridge</p>
          <p className="subtitle">
            Upload a photo and we'll find your ingredients
          </p>
          <span className="upload-btn">Choose Photo</span>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </label>
      )}
    </div>
  );
}

export default FridgeScanner;
