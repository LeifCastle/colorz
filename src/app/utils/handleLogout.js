const handleLogout = () => {
  //----Sets user expiration time
  if (localStorage.getItem("jwtToken")) {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("email");
    localStorage.removeItem("expiration");
  }
};

export default handleLogout;
