// ThemeSwitcher.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { changeColor } from "../store/features/themeSlice";

const ThemeSwitcher: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bgColor = useSelector((state: RootState) => state.theme.color);

  return (
    <div
      className="h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <h1 className="text-2xl font-bold mb-4">رنگ پس‌زمینه: {bgColor}</h1>
      <button
        onClick={() => dispatch(changeColor())}
        className="px-6 py-2 bg-gray-800 text-white rounded"
      >
        تغییر رنگ پس‌زمینه
      </button>
    </div>
  );
};

export default ThemeSwitcher;
