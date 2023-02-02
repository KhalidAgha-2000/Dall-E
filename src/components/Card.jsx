import { download } from "../assets";
import { downloadImage } from "../utils";

export const Card = ({ _id, name, prompt, photo }) => {

    return (
        <div
            className="rounded-xl group relative shadow-card hover:shadow-cardhover card"
        >
            <img
                className="w-full h-auto rounded-xl object-cover"
                src={photo}
                alt={prompt} loading='lazy'
            />

            <div className="group-hover:flex flex-col max-h-[90%] absolute hidden bottom-0 left-0 right-0 bg-[#10131f] mt-2 p-4 rounded-md">

                {/* Prompt */}
                <p className="prompt text-md text-white overflow-y-auto ">
                    {prompt}
                </p>

                <div className="mt-5 flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">

                        {/* Letter */}
                        <div className="name flex justify-center items-center text-white text-xs font-bold w-7 h-7 rounded-full object-cover  bg-green-700 ">
                            {name[0]}
                        </div>

                        {/* Name */}
                        <p className="text-sm text-white">{name}</p>

                    </div>
                    {/* Download */}
                    <button
                        type="button"
                        onClick={() => downloadImage(_id, photo)}
                        className="outline-none bg-transparent border-none">
                        <img
                            src={download}
                            alt="download"
                            className="w-6 h-6 object-contain invert"
                        />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Card
