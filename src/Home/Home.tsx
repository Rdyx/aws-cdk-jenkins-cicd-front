import React from "react";
import { useState, useEffect } from "react";
import UrlsTableComponent from "../components/Table/UrlsTableComponent";
import { getApigwUrl, getFetchHeaders } from "../common/Functions";

export default function Home() {
  const [urlsObjectsList, setUrlsObjectsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(getApigwUrl() + "/get-url-counter", {
      method: "GET",
      headers: getFetchHeaders(),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setUrlsObjectsList(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex-1 flex justify-center text-center">
      {loading ? <h1>LOADING</h1> : ""}
      {!loading && <UrlsTableComponent urlsObjectsList={urlsObjectsList} />}
    </div>
  );
}
