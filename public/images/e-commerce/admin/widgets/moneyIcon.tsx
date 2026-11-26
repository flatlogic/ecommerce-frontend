import React from "react";

const MoneyIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
        fill="#E6F7EE"
      />
      <path
        d="M20.6963 6V34.8566"
        stroke="#2DCD7A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.1077 10.8093H17.4888C15.0097 10.8093 13 12.8549 13 15.3783C13 17.9017 15.0097 19.9472 17.4888 19.9472H23.9014C26.3805 19.9472 28.3902 21.9928 28.3902 24.5162C28.3902 27.0396 26.3805 29.0852 23.9014 29.0852H13"
        stroke="#2DCD7A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MoneyIcon;
