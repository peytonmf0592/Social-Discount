"use client";

import { QRCodeSVG } from "qrcode.react";

interface CampaignQRCodeProps {
  url: string;
  size?: number;
}

export function CampaignQRCode({ url, size = 200 }: CampaignQRCodeProps) {
  return (
    <QRCodeSVG
      value={url}
      size={size}
      level="M"
      includeMargin
      bgColor="#ffffff"
      fgColor="#000000"
    />
  );
}
