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
    background-color: #333;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ImageImport = ({ setImgFile, setImgUrl, setNewImgFile, newImgFile }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = e => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);
    setImgFile(imageFile);
    setNewImgFile(imageFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
      setImgUrl(reader.result);
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <>
      {/* <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={e => {
          handleImageChange(e);
          setNewImgFile(e.target.files[0]);
        }}
      />
      {imageUrl && (
        <div className="image-preview">
          <img src={imageUrl} alt="이미지 미리보기" />
        </div>
      )} */}
      <FileInputContainer>
        <StyledLabel htmlFor="file-upload">이미지 업로드</StyledLabel>
        <HiddenInput
          id="file-upload"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageChange}
        />
        {imageUrl && <ImagePreview src={imageUrl} alt="Preview" />}
      </FileInputContainer>
    </>
  );
};

export default ImageImport;
