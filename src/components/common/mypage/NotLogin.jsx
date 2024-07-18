import { Alert } from "@mui/material";

const NotLogin = () => {
  return (
    <div className="mypage-box">
      <Alert variant="outlined" severity="warning">
        로그인 후 이용해 주세요.
      </Alert>
    </div>
  );
};

export default NotLogin;
