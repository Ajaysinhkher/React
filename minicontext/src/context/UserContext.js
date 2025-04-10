import React from "react";

const UserContext = React.createContext()  //this will just provide the container(with .provider and .consumer) where data will be stored  and teh actual data is stored using provider

export default UserContext;
