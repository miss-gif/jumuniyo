/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const StyledLabel = styled.label`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 8px;

  &:hover {
    background-color: #555;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: contain;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const AuthImageImport = ({ setUserImgFile }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = e => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <FileInputContainer>
      <HiddenInput
        type="file"
        id="fileInput"
        accept=".jpg, .jpeg, .png"
        onChange={e => {
          handleImageChange(e);
          setUserImgFile(e.target.files[0]);
        }}
      />
      <StyledLabel htmlFor="fileInput">이미지 업로드</StyledLabel>
      {imageUrl && <ImagePreview src={imageUrl} alt="이미지 미리보기" />}
    </FileInputContainer>
  );
};

export default AuthImageImport;
