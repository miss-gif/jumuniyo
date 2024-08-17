/* eslint-disable react/prop-types */
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          로그인을 해주세요!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          아직 회원이 아니신가요?
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, color: "red", cursor: "pointer" }}
          onClick={() => navigate("/auth")}
        >
          회원가입하기
        </Typography>
        <br />
        <button className="btn" onClick={onClose}>
          닫기
        </button>
      </Box>
    </Modal>
  );
};

export default LoginModal;
