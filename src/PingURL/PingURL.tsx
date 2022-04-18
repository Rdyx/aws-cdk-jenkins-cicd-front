import React, { useState } from "react";
import { getApigwUrl, getFetchHeaders } from "../common/Functions";
import FormComponent from "../components/Form/FormComponent";
import UrlsTableComponent from "../components/Table/UrlsTableComponent";

export default function PingURL() {
  const [urlsObjectsList, setUrlsObjectsList] = useState();
  const [loading, setLoading] = useState(false);

  const incrementCounterUrl = getApigwUrl() + "/increment-url-counter";
  const getCounterUrl = getApigwUrl() + "/get-url-counter";
  const headers = getFetchHeaders();

  const onFormSubmit = (formData: { [key: string]: string | number }) => {
    setLoading(true);

    fetch(incrementCounterUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json["errorMessage"] || !json) {
          throw json;
        }

        fetch(getCounterUrl + `?url=${formData.url}`, {
          method: "GET",
          headers: headers,
        })
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            setLoading(false);

            if (json["errorMessage"] || !json) {
              throw json;
            }
            setUrlsObjectsList(json);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <FormComponent inputs={["url"]} onFormSubmit={onFormSubmit} loading={loading} />
      {loading && <h1>LOADING</h1>}
      {!loading && urlsObjectsList && <UrlsTableComponent urlsObjectsList={urlsObjectsList} />}
    </>
  );
}
