import React, { useState } from "react";

const ImageImport = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleImageChange}
      />
      {imageUrl && (
        <div className="image-preview">
          <img src={imageUrl} alt="이미지 미리보기" />
        </div>
      )}
    </>
  );
};

export default ImageImport;
