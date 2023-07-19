const handleLogout = () => {
  //----Sets user expiration time
  if (typeof window != undefined) {
    if (localStorage.getItem("jwtToken")) {
      // remove token for localStorage
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("expiration");
    }
  }
};

export default handleLogout;
