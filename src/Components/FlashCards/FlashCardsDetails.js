import React, { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { TfiBackRight } from 'react-icons/tfi';
import { BsCloudDownload } from 'react-icons/bs';
import { BsPrinter } from 'react-icons/bs';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import ShareModel from './ShareModel';  // Modal component for Share
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Details_IMG from "./Images/Details_IMG.gif";
import { IoIosArrowForward } from 'react-icons/io';
import jsPDF from 'jspdf'; // Import jsPDF

const FlashCardsDetails = () => {
  const [active, setActive] = useState(0);
  const [TermImg, setTermImg] = useState(Details_IMG);
  const [TermDis, setTermDis] = useState("");
  const [visible, setVisible] = useState(false); // State for share modal visibility

  const { id } = useParams();
  const { cards } = useSelector((state) => state.flashcardReducers);
  const carddata = cards.find((cards) => cards.id === id);

  useEffect(() => {
    setTermDis(carddata.term[0].Enter_Definition);
    setTermImg(carddata.term[0].term_uploadimage || Details_IMG);
  }, [carddata]);

  const handleClick = (event) => {
    setActive(event);
  };

  const setCard = (NewIndex) => {
    setTermDis(carddata.term[NewIndex].Enter_Definition);
    setTermImg(carddata.term[NewIndex].term_uploadimage || Details_IMG);
  };

  const nextCard = () => {
    const isLastCard = active === carddata.term.length - 1;
    const NewIndex = isLastCard ? 0 : active + 1;
    setActive(NewIndex);
    setCard(NewIndex);
  };

  const prevCard = () => {
    const isFirstSlide = active === 0;
    const NewIndex = isFirstSlide ? carddata.term.length - 1 : active - 1;
    setActive(NewIndex);
    setCard(NewIndex);
  };

  const displayTermDetails = (item, index) => {
    setTermImg(item.term_uploadimage || Details_IMG);
    setTermDis(item.Enter_Definition);
    handleClick(index);
  };

  const navigate = useNavigate();

  const onClose = () => { setVisible(false); }

  // Function to handle PDF Download
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add title or group name
    doc.setFontSize(18);
    doc.text(carddata.Create_Group, 20, 20);

    // Add description of the group
    doc.setFontSize(12);
    doc.text(carddata.description, 20, 30);

    // Add each term and its definition to the PDF
    carddata.term.forEach((term, index) => {
      doc.text(`${term.Enter_Term}:`, 20, 40 + index * 10);
      doc.text(term.Enter_Definition, 40, 40 + index * 10);
    });

    // Save the PDF with a filename
    doc.save(`${carddata.Create_Group}_flashcards.pdf`);
  };

  return (
    <>
      <div className="pt-3 dark:text-white">
        <span className="flex">
          <IoMdArrowRoundBack onClick={() => navigate(-1)} className="text-2xl m-1 cursor-pointer hover:text-red-600 " />
          <span className="font-bold text-xl px-3 dark:text-blue-400">
            {carddata.Create_Group}
          </span>
        </span>
        <div className="pl-11 my-2 pr-4">
          {carddata.description}
        </div>
        <div className="flex flex-wrap space-between">
          <div className="bg-white dark:bg-gray-800 overflow-auto w-64 drop-shadow-md rounded-lg py-1 h-[340px] my-3 px-3">
            <h1 className="font-bold m-2 dark:text-blue-400">Flashcards</h1>
            <hr />
            {carddata.term.map((item, index) => (
              <div key={index} onClick={() => displayTermDetails(item, index)} className="p-3 font-medium cursor-pointer">
                <div className={active === index ? "activeTerm" : undefined}>
                  <IoIosArrowForward className="icon hidden mr-1" />
                  {item.Enter_Term}
                </div>
              </div>
            ))}
          </div>

          <div id="forPrint">
            <div className="flex flex-wrap py-11 px-5 p-3 drop-shadow-md my-3 dark:bg-gray-800 bg-white rounded-lg">
              <div className="pr-2 h-[286px] flex justify-center items-center w-[240px] sm:w-[320px] md:w-[320px] lg:w-[320px] xl:w-[320px] overflow-hidden">
                <img src={TermImg} alt="" className="m-auto rounded-lg max-h-[286px] transition duration-300 ease-in-out hover:scale-110" />
              </div>

              <div className="pl-2 w-[240px] sm:w-[320px] md:w-[320px] lg:w-[320px] xl:w-[320px]">
                {TermDis}
              </div>
            </div>
            <div className="flex justify-center my-2">
              <p className="mx-auto h-3 w-60 bg-black opacity-5 rounded-[100%] shadow-xl"></p>
            </div>

            <div className="flex justify-center items-center">
              <MdNavigateBefore className="text-5xl cursor-pointer dark:text-white hover:text-blue-400" onClick={prevCard} />
              <span className="ml-10">{active + 1}/</span>
              <span className="mr-10">{carddata.term.length}</span>
              <MdNavigateNext className="text-5xl cursor-pointer dark:text-white hover:text-blue-400" onClick={nextCard} />
            </div>
          </div>

          <div className="w-[250px] my-3 rounded-lg h-48">
            <div onClick={() => setVisible(true)} className="bg-white dark:bg-gray-800 flex cursor-pointer mb-4 drop-shadow-md hover:scale-110 rounded-lg w-[250px] p-2 h-10">
              <TfiBackRight className="text-2xl mx-5" />Share
            </div>
            <div onClick={downloadPDF} className="bg-white dark:bg-gray-800 flex cursor-pointer my-4 drop-shadow-md hover:scale-110 rounded-lg w-[250px] p-2 h-10">
              <BsCloudDownload className="text-2xl mx-5" />Download PDF
            </div>
            <div onClick={() => window.print()} className="bg-white dark:bg-gray-800 flex cursor-pointer my-4 drop-shadow-md hover:scale-110 rounded-lg w-[250px] p-2 h-10">
              <BsPrinter className="text-2xl mx-5" />Print
            </div>
          </div>

        </div>
      </div>

      {/* Share Modal */}
      {visible && <ShareModel onClose={onClose} />}
    </>
  );
};

export default FlashCardsDetails;
