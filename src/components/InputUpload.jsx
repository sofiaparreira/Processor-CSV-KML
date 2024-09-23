import React, { useState, useRef } from "react";
import styled from "styled-components";

const InputUpload = ({ onFileProcessed }) => {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null); 
  const [message, setMessage] = useState("");

  // CONFIGURAÇÕES DO ARRASTAR ARQUIVO DO UPLOAD
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      processFile(file);
      setMessage("Arquivo carregado com sucesso!"); // Mensagem quando arquivo é solto
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      processFile(file);
      setMessage(`Arquivo carregado com sucesso. Escolha uma das opções acima para fazer download`); // Mensagem ao selecionar o arquivo
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      onFileProcessed(content, file.name);
    };
    reader.readAsText(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click(); // Disparando o clique no input de arquivo
  };
  return (
    <StyledWrapper
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      dragging={dragging}
    >
      <form className="file-upload-form">
        <label htmlFor="file" className="file-upload-label">
          <div className="file-upload-design" onClick={handleBrowseClick}>
            <svg viewBox="0 0 640 512" height="1em">
              <path className="fill-indigo-600" d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
            </svg>

            {message && <p className="text-center w-64">{message}</p>}
            
            {!message && (
              <span>
              <p>Drag and Drop</p>
              <p className="mb-4">or</p>
              <span className="browse-button">Browse file</span>
            </span>

            )}
            

          </div> 
          <input
            id="file"
            type="file"
            ref={fileInputRef} // Referência ao input
            onChange={handleFileChange} // Capturando a seleção de arquivo
          />
        </label>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .file-upload-form {
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .file-upload-label input {
    display: none;
  }
  .file-upload-label svg {
    height: 50px;
    fill: rgb(82, 82, 82);
    margin-bottom: 20px;
  }
  .file-upload-label {
    cursor: pointer;
    background-color: #ddd;
    padding: 30px 70px;
    border-radius: 40px;
    border: 2px dashed rgb(82, 82, 82);
    box-shadow: 0px 0px 200px -50px rgba(0, 0, 0, 0.719);
  }
  .file-upload-design {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .browse-button {
    background-color: rgb(82, 82, 82);
    padding: 5px 15px;
    border-radius: 10px;
    color: white;
    transition: all 0.3s;
    margin-top: 4px;
  }
  .browse-button:hover {
    background-color: rgb(14, 14, 14);
  }
`;

export default InputUpload;
