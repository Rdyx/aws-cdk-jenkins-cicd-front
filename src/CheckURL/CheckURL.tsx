import React, { useState } from "react";
import { getApigwUrl, getFetchHeaders } from "../common/Functions";
import FormComponent from "../components/Form/FormComponent";
import UrlsTableComponent from "../components/Table/UrlsTableComponent";

export default function CheckURL() {
  const [urlsObjectsList, setUrlsObjectsList] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const getCounterUrl = getApigwUrl() + "/get-url-counter";
  const headers = getFetchHeaders();

  const onFormSubmit = (formData: { [key: string]: string | number }) => {
    setLoading(true);

    fetch(getCounterUrl + `?url=${formData.url}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setLoading(false);
        console.log(json);

        if (json["errorMessage"] || !json) {
          throw json;
        }
        setUrlsObjectsList(json);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <FormComponent inputs={["url"]} onFormSubmit={onFormSubmit} loading={loading} />
      {loading && <h1>LOADING</h1>}
      {!loading && Object.keys(urlsObjectsList[0]).length !== 0 && (
        <UrlsTableComponent urlsObjectsList={urlsObjectsList} />
      )}
    </>
  );
}
