import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonthString } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();  // Json data from Context
  const [slideIndex, setIndex] = useState(0);  // current Slide index
  const [radioChecked, setChecked] = useState(true) // radio buttons checked status

  const byDateAsc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const slidesNb = data?.focus.length;

  const nextCard = () => {
    setTimeout(
      () => setIndex(slideIndex < slidesNb-1 ? slideIndex + 1 : 0),
      5000
    ); 
  };

  const handleRadio = () => {
    setChecked(false) ; 
  }

  useEffect(() => {
    nextCard();
    // setIndex(0);  
  });


  return (
    <div className="SlideCardList">
      { 
        byDateAsc?.map((event, idx) => (
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              slideIndex === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />

            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonthString(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))
      }

      <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination">
            {
              byDateAsc?.map ( (elt , index) => (
                <input 
                  key={`radio${byDateAsc.indexOf(elt)}`}
                  type="radio"
                  name="radio-button"

                  checked={ index === slideIndex && radioChecked}
                  onChange= {handleRadio}
                />
              ))
            }
          </div>
      </div>
    </div>
  );
};

export default Slider;
