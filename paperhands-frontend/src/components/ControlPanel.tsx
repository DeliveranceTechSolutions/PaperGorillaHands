import { useState } from "react";
import { useStonkStore } from "../stores/stonkStore"

export default function PaperHandsControlPanel() {
    const { setBuy, setSell, noBid, setNoBid, setUserAmount, userAmount } = useStonkStore();
    const [price, setPrice] = useState(100);

    const handleBuyClick = () => {
        setBuy(price);
        setNoBid(true);
    }

    const handleSellClick = () => {
        setSell(price);
        setNoBid(true);
    }

    const handleNoBid = () => {
        setNoBid(true);
    }

    const handlePriceInput = (event: any) => {
        event.preventDefault();
        setPrice(event.target.value);
    }

    return(
        <div className="w-full items-center justify-center mt-5 flex flex-col">
            <div>
                <button 
                    className={`
                        px-4 py-2 rounded
                        ${noBid
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                          : 'bg-green-600 hover:bg-green-800 text-white cursor-pointer transition transform duration-100 active:scale-95 active:bg-green-900'
                        }
                      `}
                    disabled={noBid}
                    onClick={handleBuyClick}
                >
                    Up
                </button>
                <button 
                    className={`
                        px-4 py-2 rounded
                        ${noBid
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                          : 'bg-red-600 hover:bg-red-800 text-white cursor-pointer transition transform duration-100 active:scale-95 active:bg-red-900'
                        }
                      `}
                    disabled={noBid}
                    onClick={handleSellClick}
                >
                    Down
                </button>
                {/* <button 
                    className={`
                        px-4 py-2 rounded
                        ${noBid
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                          : 'bg-blue-600 hover:bg-blue-800 text-white cursor-pointer transition transform duration-100 active:scale-95 active:bg-blue-900'
                        }
                      `}
                    disabled={noBid}
                    onClick={handleNoBid}    
                >No Bid</button> */}
            </div>
            {/* <input type="number" 
                className={`
                    px-4 py-2 border border-gray-300 rounded-md mt-5
                    ${noBid
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                      : 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    }
                  `}
                onChange={(event) => handlePriceInput(event)}
                placeholder="100"
                disabled={noBid}
            /> */}
        </div>
    )
};
