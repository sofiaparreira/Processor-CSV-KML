import React from 'react';
import Modal from 'react-modal';

const ModalReplaceValue = ({ isOpen, onRequestClose, onClick, setNumbers }) => {
  const handleTextareaChange = (e) => {
    setNumbers(e.target.value);  // Atualizar o estado no componente pai
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Substituir Valores Modal"
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
        <h2 className="mb-4 text-gray-800">Digite os números que serão substituídos pela palavra chave "valor"</h2>
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <textarea
          className='h-64 border border-gray-300 w-full rounded-lg outline-none p-4 text-sm'
          onChange={handleTextareaChange}  // Atualizar o estado no componente pai
        ></textarea>

        <button className='bg-indigo-500 px-16 py-1 rounded-md text-white mt-4' onClick={onClick}>Substituir</button>
      </div>
    </Modal>
  );
};

export default ModalReplaceValue;
