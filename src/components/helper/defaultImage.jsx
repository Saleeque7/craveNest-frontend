import React from "react";

export function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return color;
}

export function getInitials(fullName) {
  const names = fullName.split(" ");
  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  return initials.join("");
}

const Avatar = ({ name, size = 50 }) => {
  const bgColor = stringToColor(name);
  const initials = getInitials(name);

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: size * 0.4,
        fontWeight: "bold",
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
