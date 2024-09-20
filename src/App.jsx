import { useState } from "react";
import { saveAs } from "file-saver";
import "./App.css";
import BtnDefault from "./components/btnDefault";
import InputUpload from "./components/InputUpload";
import ModalReplaceValue from "./components/ModalReplaceValue";

function App() {
  const [rawFileContent, setRawFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [numbersModal, setNumbersModal] = useState("");

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // ---- CONVERSOR CSV -------
  const handleFileUpload = (content, name) => {
    setRawFileContent(content);
    const convertedFileName = name.replace(/\.[^/.]+$/, "") + "_converted.csv";
    setFileName(convertedFileName);
  };

  const convertCSV = () => {
    if (!rawFileContent) {
      console.log("Nenhum arquivo carregado.");
      return;
    }

    // Fazendo as substituições
    let modifiedContent = rawFileContent
      .replace(/ cubic meters/g, "")
      .replace(/ sq m/g, "")
      .replace(/,/g, ";")
      .replace(/\./g, ",");

    // Salvar o arquivo convertido
    const blob = new Blob([modifiedContent], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, fileName || "converted_file.csv");
  };

  //------- SUBSTITUIR CARACTERES -----
  const replaceToNumbers = () => {
    if (!numbersModal) {
      console.log("Nenhum valor digitado.");
      return;
    }
  
    // Convertendo os valores digitados (sejam números ou palavras) em um array
    const values = numbersModal.split(/\s+/).map(value => {
      // Substituir vírgula por ponto para padronizar e tentar converter em número
      const parsedValue = value.replace(',', '.');
      return isNaN(parsedValue) ? value : Number(parsedValue);
    });
  
    let currentIndex = 0;
  
    // Substituir cada ocorrência de "valor" por um valor do array (número ou palavra)
    let modifiedContent = rawFileContent.replace(/valor/g, () => {
      if (currentIndex < values.length) {
        return values[currentIndex++];
      }
      return "substituido"; // Valor padrão quando os valores digitados acabam
    });
  
    // Salvar o arquivo modificado como KML
    const blob = new Blob([modifiedContent], {
      type: "application/vnd.google-earth.kml+xml;charset=utf-8;", // Tipo MIME para KML
    });
    const kmlFileName = fileName.replace(/\.[^/.]+$/, "") + "_modified.kml"; // Adicionar _modified ao nome do arquivo
    saveAs(blob, kmlFileName);
  
    closeModal();
  };
  
  
  

  console.log(numbersModal);

  return (
    <div>
      <div className="flex justify-center items-center gap-16 mt-16">
        <BtnDefault text={"Conversor CSV"} onClick={convertCSV} />
        <BtnDefault text={"Substituir Valores"} onClick={openModal} />
        <BtnDefault text={"Substituir Caractéres"} />
      </div>

      <div className="mt-48 justify-center items-center flex">
        <InputUpload onFileProcessed={handleFileUpload} message={message} />
      </div>

      {/* Usar o componente Modal */}
      <ModalReplaceValue
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onClick={replaceToNumbers}
        setNumbers={setNumbersModal} // Passar a função para atualizar o estado
      />
    </div>
  );
}

export default App;
