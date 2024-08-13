import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

const OptionModal = ({ open, onClose, menuItem, onConfirm }) => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    if (menuItem) {
      fetchOptions(menuItem.menu_pk);
    }
  }, [menuItem]);

  const fetchOptions = async menu_pk => {
    try {
      const response = await axios.get(`/api/menu/option/${menu_pk}`);
      const resultData = response.data.resultData;
      setOptions(resultData);
    } catch (error) {
      console.error("옵션 데이터를 불러오는 데 실패했습니다.", error);
    }
  };

  const handleSelectOption = (optionPk, option) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [optionPk]: prevSelectedOptions[optionPk] ? null : option,
    }));
  };

  const handleConfirm = () => {
    const filteredSelectedOptions = Object.fromEntries(
      Object.entries(selectedOptions).filter(([key, value]) => value !== null),
    );
    onConfirm({ ...menuItem, selectedOptions: filteredSelectedOptions });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>{menuItem?.menu_name} 옵션 선택</h2>
        <div className="options">
          {options.map(option => (
            <FormControlLabel
              key={option.optionPk}
              control={
                <Checkbox
                  checked={!!selectedOptions[option.optionPk]}
                  onChange={() =>
                    handleSelectOption(option.optionPk, {
                      optionName: option.optionName,
                      optionPrice: option.optionPrice,
                    })
                  }
                />
              }
              label={`${option.optionName} (+${option.optionPrice}원)`}
            />
          ))}
        </div>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            취소
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            확인
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OptionModal;
