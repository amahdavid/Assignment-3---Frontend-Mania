import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function Report({ id, accessToken, setAccessToken, refreshToken }) {
  const [reportTable, setReportTable] = React.useState(null);

  // add a request interceptor
  const axiosToBeIntercepted = axios.create();
  axiosToBeIntercepted.interceptors.request.use(
    async function (config) {
      // Do something before request is sent
      const decoded = jwt_decode(accessToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        console.log("token expired");
        const res = axios.get("http://localhost:5000/requestNewAccessToken", {
          headers: {
            "auth-token-refresh": refreshToken,
          },
        });
        setAccessToken(res.headers["auth-token-access"]);
        config.headers["auth-token-access"] = res.headers["auth-token-access"];
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    async function fetchData() {
      const res = await axiosToBeIntercepted.get(
        `http://localhost:6001/report?id=${id}`,
        {
          headers: {
            "auth-token-access": accessToken,
          },
        }
      );
      setReportTable(res.data);
    }
    fetchData();
  }, [id]);
  return (
    <div>
      Report {id}
      {reportTable && reportTable}
    </div>
  );
}

export default Report;
