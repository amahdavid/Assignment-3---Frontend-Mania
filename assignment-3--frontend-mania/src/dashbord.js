import React from "react";
import Report from "./report";

import {
    Routes,
    Route,
    Link,
} from "react-router-dom";

function Dashbord({accessToken, setAccessToken, refreshToken}) {
    const [linkClicked, setLinkClicked] = React.useState(false);

    const handleClick = () => {
        setLinkClicked(true);
    }

    return (
   <div>
    <h1>Welcome to Admin Dashboard</h1>

    <ul>
        <li><Link to = "/uniqueUsersOverTime" onClick={handleClick}>Report 1 - Unique API users over a period of time</Link></li>
        <li><Link to = "/topApiUsersOverTime" onClick={handleClick}>Report 2 - Top API users over period of time</Link></li>
        <li><Link to = "/topUsersForEachEndpoint" onClick={handleClick}>Report 3 - Top users for each Endpoint</Link></li>
        <li><Link to = "/errorsByEndpoint" onClick={handleClick}>Report 4 - 4xx Errors By Endpoint</Link></li>
        <li><Link to = "/recentErrors" onClick={handleClick}>Report 5 - Recent 4xx/5xx Errors</Link></li>
    </ul>

    <Routes>
        <Route path="/uniqueUsersOverTime" element={<Report 
        id={1} 
        accessToken={accessToken} 
        setAccessToken={setAccessToken} 
        refreshToken={refreshToken} 
        linkClicked={linkClicked}
        />} />
        <Route path="/topApiUsersOverTime" element={<Report 
        id={2} 
        accessToken={accessToken} 
        setAccessToken={setAccessToken} 
        refreshToken={refreshToken}
        linkClicked={linkClicked}
        />} />
        <Route path="/topUsersForEachEndpoint" element={<Report 
        id={3} 
        accessToken={accessToken} 
        setAccessToken={setAccessToken} 
        refreshToken={refreshToken} 
        linkClicked={linkClicked}
        />} />
        <Route path="/errorsByEndpoint" element={<Report
        id={4}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        refreshToken={refreshToken}
        linkClicked={linkClicked}
        />} />
        <Route path="/recentErrors" element={<Report
        id={5}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        refreshToken={refreshToken}
        linkClicked={linkClicked}
        />} />
    </Routes>

   </div>
    );
}

export default Dashbord;