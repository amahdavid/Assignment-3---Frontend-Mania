import React from "react";
import axios from "axios";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

function Report({ id, accessToken, setAccessToken, refreshToken, linkClicked }) {
  const [reportTable, setReportTable] = React.useState(null);
  //const [reportTable, setReportTable] = React.useState([]);

  // add a request interceptor
  const axiosToBeIntercepted = axios.create();
  axiosToBeIntercepted.interceptors.request.use(
    async function (config) {
      // Do something before request is sent
      const decoded = jwt_decode(accessToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        console.log("token expired");
        const res = await axios.get("http://localhost:5000/requestNewAccessToken", {
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
      let endpoint = "";
      if (id === 1) {
        endpoint = "http://localhost:6001/uniqueUsersOverTime";
      } else if (id === 2) {
        endpoint = "http://localhost:6001/topApiUsersOverTime";
      } else if (id === 3) {
        endpoint = "http://localhost:6001/topUsersForEachEndpoint";
      } else if (id === 4) {
        endpoint = "http://localhost:6001/errorsByEndpoint";
      } else if (id === 5) {
        endpoint = "http://localhost:6001/recentErrors";
      }
      if (linkClicked){
        const res = await axiosToBeIntercepted.get(endpoint, {
          headers: {
            "auth-token-access": accessToken,
          },
        });
        setReportTable(res.data);
      }
    }
    fetchData();
  }, [id, accessToken, axiosToBeIntercepted, linkClicked]);
    
  return (
    <div>
      {reportTable && reportTable}
    </div>
  );
}

export default Report;
