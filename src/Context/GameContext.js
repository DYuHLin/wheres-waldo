import { createContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({children}){
    const [items, setItems] = useState([]);

    const gameObjects = [
        {
            level: 1,
            image: '1/dude',
            name: "The Dude",
            x: 493,
            y: 352,
            found: false
        },
        {
            level: 1,
            image: '1/iceking',
            name: 'Ice King',
            x: 50,
            y: 335,
            found: false
        },
        {
            level: 1,
            image: '1/tom',
            name: 'Tom',
            x: 1239,
            y: 172,
            found: false
        },
        {
            level: 2,
            image: '2/shinigami',
            name: 'Shinigami',
            x: 232,
            y: 394,
            found: false
        },
        {
            level: 2,
            image: '2/turniphead',
            name: 'Turniphead',
            position: [],
            found: false
        },
        {
            level: 2,
            image: '2/yubaba',
            name: 'Yubaba',
            position: [],
            found: false
        },
        {
            level: 3,
            image: '3/aang',
            name: 'Aang',
            position: [],
            found: false
        },
        {
            level: 3,
            image: '3/ashitaka',
            name: 'Ashitaka',
            position: [],
            found: false
        },
        {
            level: 3,
            image: '3/edward',
            name: 'Edward',
            position: [],
            found: false
        },
        {
            level: 4,
            image: '4/mike',
            name: 'Mike',
            position: [],
            found: false
        },
        {
            level: 4,
            image: '4/mojo',
            name: 'Mojo Jojo',
            position: [],
            found: false
        },
        {
            level: 4,
            image: '4/rodney',
            name: 'Rodney',
            position: [],
            found: false
        }
    ];

    setItems(gameObjects);

    const deleteCart = (index) => {
        setItems(oldValues => {
            return oldValues.filter(exp => exp.id !== index)
        });
    };

    const incQuantity = (index) => {
        const newArr = items.map((obj) => {
            if(index === obj.id){
                return{...obj, quantity: obj.quantity + 1}           
            } else {
                return obj;
            };
        });
        setItems(newArr);
    };

    const getTotal = () => {
        let totalAmount = 0;
        for(const cart in items){
            totalAmount += items[cart].price * items[cart].quantity;
        }

        return totalAmount.toFixed(2);
    };

    const decQuantity = (index) => {
        const newArr = items.map((obj) => {
            if(index === obj.id){
                return{...obj, quantity: obj.quantity - 1}
            } else {
                return obj;
            };
            
        });
        setItems(newArr);
    };

    return(
        <GameContext.Provider value = {{items, addToCart, deleteCart, incQuantity, decQuantity, getTotal}}>
            {children}
        </GameContext.Provider>
    )
};

export default GameContext;