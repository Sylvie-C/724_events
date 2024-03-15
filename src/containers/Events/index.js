import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";
import { extractLetters } from "../../helpers/Date" ; 

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();  // data = events.json file , error = if fetch data failed
  const [type, setType] = useState(); 
  const [currentPage, setCurrentPage] = useState(1);  // events cards list current page (1 by default)

  let eventsData = data?.events || [] ;  // mutable variable
  const eventsTotal = data?.events.length ;  // total of events in fetched data

  // array of possible events types in data (for <Select /> component)
  const typeList = new Set(data?.events.map((event) => event.type));

  // mutable variable : number of events
  let eventsNb = data?.events.length; 


  // -------  Events pages number handling (to be defined before filter events)
  const pageNb = (elements , perPage) => {
    /*
      Function to calculate number of pages necessary, based on limited number of elements per page. 
      Parameters : 2 -> number of elements, limit number of elements per page
      Return : number of necessary pages.  
    */
      let totalPages = Math.floor((elements || 0) / perPage) +1 ;
  
      // if events number is a multiple of perPage
      if (elements % perPage === 0) {
        totalPages = Math.floor((elements || 0) / perPage) ; // calculation of pages number won't need +1
      }
      return totalPages ; 
  }
  let pageNumber = pageNb(eventsTotal , PER_PAGE) ; 


  // -------  Filter events according to type selected
  const filterFn = (arrayIn , typeFilter) => {
  /*
    Function to filter elements of "data" array, based on element.type === typeFilter. 
    Parameters : 2 -> array to filter , element.type in array we want extracted
    Return : array of filtered events types.
  */
    const arrayOut = arrayIn.filter ( elt => elt.type === typeFilter )
    return arrayOut; 
  } 

  if (type) {  // if a type is selected, 
    eventsData = filterFn ( eventsData , type ) ;   // return Array of filtered events
    eventsNb = eventsData.length ; 
    pageNumber = pageNb(eventsNb , PER_PAGE) ;   // update number of pages of events cards
  }


  // -------  Display maximum of "PER_PAGE" event cards per page 
  for (let i=1; i<=pageNumber; i +=1) {
    if (currentPage === i) {
      const start = (i * PER_PAGE) - PER_PAGE; 
      const end = i * PER_PAGE; 
      eventsData = eventsData?.slice(start , end); 
    }
  }


  // -------  type selection handling
  const changeType = (evtType) => {
    setCurrentPage(1);  // on type selection, stay on page 1 of event cards list
    setType(evtType);
  };


  // -------  events cards pages links handling
  function linksGen () {
  /*
    Function to generate pages links, based on total of pages number, the latter based on 
    number of events extracted from Json file and display of 9 event cards per page (PER_PAGE). 
    Parameters : none. 
    Return : Array of pages links Html elements (<a>).
  */
    const linksArr = [] ; 
    for (let i=1; i<=pageNumber; i +=1) {
      const link = 
        <a key={`page${i}`} href="#events" onClick={() => setCurrentPage(i)}>
          {` page${i} `} 
        </a> 
      linksArr.push(link) ; 
    }
    return linksArr;
  } 
  const pageLinks = linksGen() ; // Array of pages links

  
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? ( "loading") : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">

            {eventsData?.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={extractLetters(event.periode)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {pageLinks}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
