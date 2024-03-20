import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render (<Home />)
    const eventsList = screen.getByTestId("eventsList") ; 
    expect(eventsList).toBeInTheDocument() ; 
  })
  it("a list a people is displayed", () => {
    render (<Home />)
    const peopleCard = screen.getAllByTestId("card-image-testid"); 
    expect(peopleCard).toBeTruthy() ; // array of people cards exists
    expect(peopleCard.length).not.toBeNull() ; // array of people cards not empty
  })
  it("a footer is displayed", () => {
    render (<Home />)
    const footer = screen.getByTestId("footerTestid") ; 
    expect (footer).toBeInTheDocument() ; 
  })
  it("an event card, with the last event, is displayed", () => {
    render (<Home />) 
    const footer = screen.getByTestId("footerTestid") ; 

    expect(footer).toContainHTML("img") ; // the footer contains an <img> (knowing icons are <svg>)

    // test latest date to be implemented
  })
});
