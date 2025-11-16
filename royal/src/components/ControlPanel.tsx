import { useState } from "react";
import { useStonkStore } from "../stores/stonkStore"

export default function PaperHandsControlPanel() {
    const { setBuy, setSell } = useStonkStore();
    const [price, setPrice] = useState(100);

    const handleBuyClick = () => {
        setBuy(price);
    }

    const handleSellClick = () => {
        setSell(price);
    }

    const handlePriceInput = (event: any) => {
        event.preventDefault();
        setPrice(event.target.value);
    }

    return(
        <div className="w-full items-center justify-center mt-5 flex flex-col">
            <div>
                <button className="
                        bg-green-600 hover:bg-green-800 text-white 
                        px-4 py-2 rounded 
                        transition transform duration-100 
                        active:scale-95 active:bg-green-900 
                        cursor-pointer
                    "
                    onClick={handleBuyClick}
                >
                    Buy
                </button>
                <button className="
                        bg-red-600 hover:bg-red-800 text-white 
                        px-4 py-2 rounded 
                        transition transform duration-100 
                        active:scale-95 active:bg-red-900 
                        cursor-pointer
                    "
                    onClick={handleSellClick}
                >
                    Sell
                </button>
            </div>
            <input type="number" className="
                    px-4 py-2 border border-gray-300
                    mt-5
                    rounded-md
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:border-transparent
                " onChange={(event) => handlePriceInput(event)}
            />
        </div>
    )
};
