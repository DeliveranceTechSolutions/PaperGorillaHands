export default function PaperHandsControlPanel() {
    return(
        <div className="w-full items-center justify-center mt-5 flex flex-col">
            <div>
                <button className="
                    bg-green-600 hover:bg-green-800 text-white 
                    px-4 py-2 rounded 
                    transition transform duration-100 
                    active:scale-95 active:bg-green-900 
                    cursor-pointer
                ">
                    Buy
                </button>
                <button className="
                    bg-red-600 hover:bg-red-800 text-white 
                    px-4 py-2 rounded 
                    transition transform duration-100 
                    active:scale-95 active:bg-red-900 
                    cursor-pointer
                ">
                    Sell
                </button>
            </div>
            <input type="number" className="
                px-4 py-2 border border-gray-300
                mt-5
                rounded-md
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-transparent
            " />
        </div>
    )
};
