import { useState } from "react";
import { saveAs } from "file-saver";
import "./App.css";
import BtnDefault from "./components/btnDefault";
import InputUpload from "./components/InputUpload";
import ModalReplaceValue from "./components/ModalReplaceValue";

function App() {
  const [rawFileContent, setRawFileContent] = useState("");
  const [fileName, setFileName] = useState("");
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
  
    // Dividir os valores pelo espaço, sem substituir vírgulas por pontos
    const values = numbersModal.split(/\s+/).map(value => {
      return isNaN(value) ? value : Number(value);
    });
  
    let currentIndex = 0;
  
    let modifiedContent = rawFileContent.replace(/valor/g, () => {
      if (currentIndex < values.length) {
        return values[currentIndex++];
      }
      return "substituido"; 
    });
  
    // Salvar o arquivo modificado como KML
    const blob = new Blob([modifiedContent], {
      type: "application/vnd.google-earth.kml+xml;charset=utf-8;", 
    });
    const kmlFileName = fileName.replace(/\.[^/.]+$/, "") + "_replaced.kml"; 
    saveAs(blob, kmlFileName);
  
    closeModal();
  };
  
  
  
  

  console.log(numbersModal);

  return (
    <div>
      <div className="flex justify-center items-center gap-16 mt-16">
        <BtnDefault text={"Conversor CSV"} onClick={convertCSV} />
        <BtnDefault text={"Substituir Valores"} onClick={openModal} />
        <BtnDefault text={"Substituir Caracteres"} />
      </div>

      <div className="mt-48 justify-center items-center flex">
        <InputUpload onFileProcessed={handleFileUpload} />
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
