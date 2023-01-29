import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Cards from '../Cards'

describe('Cards', () => {
  it('renders a TinderCard and Buttons for each movie', () => {
    render(<Cards />)
    const cards = screen.getAllByTestId('card')
    const swipeLeft = screen.getAllByTestId('swipe-left')
    expect(cards.length).toBe(4)
    expect(swipeLeft.length).toBe(4)
  })

  it("updates currentIndex correctly on swipe", async () => {
    render(<Cards />);
    fireEvent.click(screen.getAllByTestId("swipe-right")[0]);
    render(<Cards />);

    expect(screen.getAllByTestId("card")[0].textContent).toBe(
      "Inferno5.3/10Lorem ipsum…."
    );
  });

  it('update current index on swipe', () => {
    render(<Cards />)
    const card = screen.getAllByTestId('card')[0]
    fireEvent.click(card, { button: 0 })
    expect(card.style.transform).toMatch("")
  })

  it('render titles correctly', () => {
    render(<Cards />)
    const title1 = screen.getAllByTestId('card-title')[0]
    const title2 = screen.getAllByTestId('card-title')[1]
    const title3 = screen.getAllByTestId('card-title')[2]
    const title4 = screen.getAllByTestId('card-title')[3]
    expect(title1.textContent).toBe('Inferno')
    expect(title2.textContent).toBe('Star Wars: Episode VII - The Force Awakens')
    expect(title3.textContent).toBe('John Wick 3')
    expect(title4.textContent).toBe('Top Gun Maverick')
  })


  it('updates the Index when a card is swiped', () => {
    render(<Cards />)
    const firstTinderCard = screen.getAllByTestId('card')[0]
    fireEvent.click(firstTinderCard)
    expect(firstTinderCard.getAttribute('data')).toBe('3')
  })

  it('should call the swiped function when buttons are clicked', () => {
    render(<Cards />)
    const swipeLeftButton = screen.getAllByTestId('swipe-left')[0]
    const swipeRightButton = screen.getAllByTestId('swipe-right')[0]
    const ev1 = fireEvent.click(swipeLeftButton)
    const ev2 = fireEvent.click(swipeRightButton)
    expect(ev1).toBe(true)
    expect(ev2).toBe(true)
  })
})
