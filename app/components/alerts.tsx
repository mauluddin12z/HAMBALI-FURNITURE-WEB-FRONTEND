"use client";
export default function Alerts({
  setShowAlert,
  showAlert,
  message,
  textColor,
  bgColor,
  bgColorHover,
}: any) {
  return (
    <div
      className={`flex justify-between items-center px-4 ${bgColor} ${bgColorHover} ${textColor} rounded-lg transition-all duration-300 origin-top w-full overflow-hidden ${
        showAlert ? "h-[40px] opacity-100" : "h-0 opacity-0"
      }`}
      role="alert"
    >
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        onClick={() => setShowAlert(false)}
        type="button"
        className={`rounded-lg ${textColor} flex items-center justify-center p-1.5`}
      >
        <i className="fa-solid fa-x"></i>
      </button>
    </div>
  );
}
