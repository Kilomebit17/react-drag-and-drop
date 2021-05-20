import React, {useState} from "react";
import "./App.css";

function App() {
    const [cardList, setCardList] = useState([
        {id: 2, order: 2, text: "card 2"},
        {id: 1, order: 1, text: "card 1"},
        {id: 4, order: 4, text: "card 4"},
        {id: 3, order: 3, text: "card 3"},
    ]);
    const [currentCard, setCurrentCard] = useState(null)
    function dragStartHandler(e, card) { //когда карточку подбираем
        setCurrentCard(card)
    }
    function dragEndHandler(e) {
        e.target.style.backgroundColor = 'white'
    }
    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.backgroundColor = 'lightgray'
    }
    function dropHandler(e, card) { // когда карточку отпускаем
        e.preventDefault()
        setCardList(cardList.map(c => {
            if (c.id === card.id) {
                return {...c, order: currentCard.order}
            }
            if (c.id === currentCard.id) {
                return {...c, order: card.order}
            }
            return c
        }))
        e.target.style.backgroundColor = 'white'
    }
    const sortCards = (a,b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }
    return (
        <>
            <div className="App">
                {cardList.sort(sortCards).map(card =>
                    <div
                        onDragStart={e => dragStartHandler(e, card)}
                        onDragLeave={e => dragEndHandler(e)}
                        onDragEnd={e => dragEndHandler(e)}
                        onDragOver={e => dragOverHandler(e)}
                        onDrop={e => dropHandler(e, card)}
                        draggable={true}
                        key={card.id}
                        className={'card'}>{card.text}</div>
                )}
            </div>
            ;
        </>
    );
}

export default App;
