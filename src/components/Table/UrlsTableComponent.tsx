import React from "react";

interface Props {
  urlsObjectsList: {
    [key: string]: any;
  }[];
}

function getTableRows(urlsObjectsList: Props["urlsObjectsList"]) {
  return urlsObjectsList.map((urlObject, i) => {
    return (
      <tr key={i} className={`border-b border-x ${i % 2 === 0 ? "bg-slate-300" : ""}`}>
        <td className="py-2">
          <a href={urlObject.url} className="hover:text-white">
            {urlObject.url}
          </a>
        </td>
        <td className="py-2">{urlObject.status_code}</td>
        <td className="py-2">{urlObject.counter}</td>
      </tr>
    );
  });
}

export default function UrlsTableComponent(props: Props) {
  return (
    <table className="table-fixed w-6/12 border-collapse">
      <thead>
        <tr className="border-b">
          <th>URL</th>
          <th>Status Code</th>
          <th>Counter</th>
        </tr>
      </thead>
      <tbody>{getTableRows(props.urlsObjectsList)}</tbody>
    </table>
  );
}
