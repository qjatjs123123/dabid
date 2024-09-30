import React, { useState, useRef } from 'react';

interface AuctionImageProps {
  onImagesChange: (images: File[]) => void; // 이미지 변경 시 호출할 함수
}

const AuctionImage: React.FC<AuctionImageProps> = ({ onImagesChange }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      const existingFiles = selectedImages.map((img) => img.name);

      const duplicateImages = newImages.filter((image) => existingFiles.includes(image.name));
      if (duplicateImages.length > 0) {
        alert('동일한 이미지가 존재합니다.');
        return;
      }

      if (selectedImages.length + newImages.length <= 4) {
        const updatedImages = [...selectedImages, ...newImages];
        setSelectedImages(updatedImages);
        onImagesChange(updatedImages); // 이미지 변경 시 호출
      } else {
        alert('최대 4개의 이미지만 선택할 수 있습니다.');
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    onImagesChange(updatedImages); // 이미지 변경 시 호출
  };

  const getLatestImageUrl = () => {
    if (selectedImages.length > 0) {
      const latestImage = selectedImages[selectedImages.length - 1];
      return URL.createObjectURL(latestImage);
    }
    return 'https://via.placeholder.com/150';
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">이미지 등록하기</h2>

      <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center mb-4 w-96 h-72">
        <img src={getLatestImageUrl()} alt="Recent Upload" className="w-full h-full object-cover mb-4 opacity-50" />
      </div>

      <button onClick={handleButtonClick} className="bg-orange-500 text-white rounded-md py-2 px-4">
        이미지 업로드
      </button>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-2"
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <p className="text-gray-600">
        {selectedImages.length > 0 ? '선택된 파일: ' + selectedImages.length : '선택된 파일 없음'}
      </p>

      <div className="flex flex-wrap mt-4">
        {selectedImages.map((image, index) => (
          <div key={index} className="relative m-2">
            <img
              src={URL.createObjectURL(image)}
              alt={`selected-${index}`}
              className="w-24 h-24 object-cover rounded-md border border-gray-300"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionImage;
