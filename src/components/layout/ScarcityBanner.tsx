import { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";

const CTA_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScRZWbxH4rKyEFFhl7L42c0A2kP8mshC5RTVmgImFS6J9KeMA/viewform";

const STORAGE_KEY = "scarcity-banner-dismissed";

export default function ScarcityBanner() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (!visible) return null;

  return (
    <div
      style={{
        background: "#1e3a5f",
        borderBottom: "1px solid #2563eb",
        padding: "10px 20px",
        textAlign: "center",
        fontSize: "14px",
        color: "#ffffff",
        position: "relative",
        zIndex: 1001,
      }}
    >
      {t("scarcityBanner", "prefix")}{" "}
      <span style={{ color: "#ef4444", fontWeight: 500 }}>
        {t("scarcityBanner", "taken")}
      </span>{" "}
      {t("scarcityBanner", "remaining")}{" "}
      <a
        href={CTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#60a5fa", textDecoration: "underline" }}
      >
        {t("scarcityBanner", "cta")}
      </a>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          background: "none",
          border: "none",
          color: "#9ca3af",
          fontSize: "18px",
          cursor: "pointer",
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}
