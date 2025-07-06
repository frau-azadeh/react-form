// components/LivePreview.tsx
import React from "react";

type LivePreviewProps = {
  accountType: string;
  initialDeposit: number;
};

const LivePreview: React.FC<LivePreviewProps> = ({ accountType, initialDeposit }) => (
  <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-700 border">
    <p>
      <strong>نوع حساب انتخابی:</strong> {accountType}
    </p>
    <p>
      <strong>مبلغ وارد شده:</strong> {initialDeposit.toLocaleString("fa-IR")} تومان
    </p>
  </div>
);

export default LivePreview;
