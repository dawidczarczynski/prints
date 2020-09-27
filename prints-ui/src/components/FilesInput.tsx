import React, { ChangeEvent, useRef } from 'react';
import { Button } from 'reactstrap';

interface FilesInputProps {
  onFilesSelect: (files: File[]) => void
}

export default function FilesInput(props: FilesInputProps) {

  const { onFilesSelect } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = () => fileInputRef.current?.click();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const filesArray = Array.from(event.target.files || []);
    onFilesSelect(filesArray);
  };

  return (
    <>
      <Button color="primary" onClick={handleInputClick}>Select files</Button>
      <input hidden type="file" onChange={handleFileSelect} multiple ref={fileInputRef} />
    </>
  );

}