import { fireEvent, render, screen } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

describe("When Events is created", () => {
  it.only("a list of event card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Events />
      </DataProvider>
    );
  });
  
  describe("and an error occured", () => {
    it.only("an error message is displayed", async () => {
      // ERROR SIMULATION : DATA NOT RECEIVED : 
      // api.loadData = jest.fn().mockRejectedValue(); 
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
      expect(await screen.findByText("An error occured")).toBeInTheDocument();
    }); 
  });

  describe("and we select a category", () => {
    it.only("an filtered list is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(data);
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
      await screen.findByText("Forum #productCON");
      fireEvent(
        await screen.findByTestId("collapse-button-testid"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      fireEvent(
        (await screen.findAllByText("soirée entreprise"))[0],
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      await screen.findByText("Conférence #productCON");
      expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
    });
  });

  describe("and we click on an event", () => {
    it.only("the event detail is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(data);
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      fireEvent(
        await screen.findByText("Conférence #productCON"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      await screen.findByText("24-25-26 Février");
      await screen.findByText("1 site web dédié");
    });
  });

});

  // if eventsData.length = 28, 

    // if currentPage is 1, slice eventsData from index 0 to 9 (excluded)
    // if currentPage is 2, slice eventsData from index 9 to 18 (excluded) 
    // if currentPage is 3, slice eventsData from index 18 to 27 (excluded)
    // if currentPage is 4, slice eventsData from index 27 to end of array
