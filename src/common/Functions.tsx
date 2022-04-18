export function getApigwUrl() {
  const apigwId = process.env.REACT_APP_APIGW_ID;
  const awsRegion = process.env.REACT_APP_AWS_DEFAULT_REGION;
  const stage = process.env.REACT_APP_STAGE;
  return `https://${apigwId}.execute-api.${awsRegion}.amazonaws.com/${stage}`;
}

export function getFetchHeaders() {
  const headers: { [key: string]: string } = {
    AuthToken: "MyAccessToken",
    "Content-Type": "application/json",
  };
  const requestHeaders = new Headers();

  Object.keys(headers).forEach((header) => {
    requestHeaders.append(header, headers[header]);
  });

  return requestHeaders;
}
