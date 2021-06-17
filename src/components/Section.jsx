import React, {useState} from 'react';
import Holiday from "./Holiday";

const Section = (holidays, title) => {
    const [show, setShow] = useState(false);
    return (
        <div className={"text-white font-bold grid-cols-1 w-1/2 mx-auto"}>
            <div onClick={() => setShow(!show)}
                 className={"cursor-pointer bg-yellow-600 mx-auto p-2 m-2 rounded-lg h-full hover:bg-yellow-500"}>
                <p>{title.title}</p>
            </div>
            {/*TODO: Por qué holidays.holidays?*/}
            {
                show && holidays.holidays &&
                <div className={"mx-auto m-2 p-2 bg-purple-800 rounded-lg h-full"}>
                    {holidays.holidays.map(h => <Holiday holiday={h}/>)}
                </div>
            }

        </div>
    );
};

export default Section;
