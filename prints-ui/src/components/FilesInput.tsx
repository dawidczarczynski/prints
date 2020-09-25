import React, { ChangeEvent } from 'react';

interface FilesInputProps {
  onFilesSelect: (files: File[]) => void
}

export default function FilesInput(props: FilesInputProps) {

  const { onFilesSelect } = props;

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const filesArray = Array.from(event.target.files || []);
    onFilesSelect(filesArray);
  };

  return <input type="file" onChange={handleFileSelect} multiple />;

}