import React from "react";
import { Link } from "react-router-dom";

const links = {
  "Check URL": "check-url",
  "Ping URL": "ping-url",
};

function getUrls(links: { [key: string]: string }) {
  return Object.keys(links).map((linkName) => {
    return (
      <Link key={linkName} to={links[linkName]} className="text-md hover:text-white">
        {linkName}
      </Link>
    );
  });
}

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between p-5 bg-blue-500 sticky top-0 drop-shadow-xs">
      <Link to="/" className="flex text-3xl font-black text-center m-auto h-100 basis-2/12 hover:text-white">
        My App
      </Link>
      <div className="flex flex-col grid justify-items-end basis-10/12">{getUrls(links)}</div>
    </div>
  );
}
