import './App.css';
import './index.css';
import {useEffect, useState} from "react";
import Holiday from "./components/Holiday";


function App() {
    const [holidays, setHolidays] = useState([]);
    const date = new Date().getFullYear()
    const fetchHolidays = async () => {
        try {
            const api = await fetch(`https://nolaborables.com.ar/api/v2/feriados/${date}`);
            console.log("API Response: ", api.status, api.statusText)
            return await api.json();
        } catch (error) {
            console.log(error);
        }
    };

    function filterUpcomingHoliday(holiday) {
        const now = new Date()
        const today = {
            day: now.getDate(),
            month: now.getMonth() + 1
        };
        return holiday.mes === today.month && holiday.dia > today.day || holiday.mes > today.month;
    }

    async function getHolidaysFromLocalStorage() {
        //Try to get the holidays from the local storage, if does not exist, fetch them from the api
        return fetchHolidays();
    }

    useEffect(() => {
        getHolidaysFromLocalStorage().then(value => setHolidays(value));
    }, []);

    const [showNextHolidays, setShowNextHolidays] = useState(false);
    const [showHolidays, setShowHolidays] = useState(false);

    return (
        <div className={"App m-2"}>
            <h1 className={"font-bold text-4xl text-white p-8"}>Feriados {date}</h1>
            <div className={"text-white font-bold grid-cols-1"}>
                <div onClick={() => setShowNextHolidays(!showNextHolidays)}
                     className={"select-none cursor-pointer bg-yellow-600 mx-auto p-2 m-2 rounded-lg h-full hover:bg-yellow-500"}>
                    <p>Proximos feriados {date}</p>
                </div>

                {showNextHolidays && holidays &&
                <div className={"mx-auto m-2 p-2 bg-purple-800 rounded-lg h-full"}>
                    {holidays.filter(holiday => filterUpcomingHoliday(holiday)).map(holiday => <Holiday
                        holiday={holiday}/>)}
                </div>
                }

                <div onClick={() => setShowHolidays(!showHolidays)}
                     className={"select-none cursor-pointer bg-yellow-600 mx-auto p-2 m-2 rounded-lg h-full hover:bg-yellow-500"}>
                    <p>Feriados {date}</p>
                </div>
                {showHolidays && holidays &&
                <div className={"max-h-1/2 mx-auto m-2 p-2 bg-purple-800 rounded-lg h-full"}>
                    {
                        holidays.map(holiday => <Holiday
                            holiday={holiday}/>)}
                </div>
                }
            </div>
            <div className={"text-white sticky bottom-2 bg-purple-900 p-2 my-auto"}>
                Built by <a className={"text-yellow-500"} href="https://www.github.com/tomastoloza">@tomastoloza</a>, using <a className={"text-yellow-500"}
                href="https://github.com/pjnovas/nolaborables">NoLaborables API REST</a> made by <a className={"text-yellow-500"}
                href="https://github.com/pjnovas/">@pjnovas</a>
            </div>
        </div>
    );

}


export default App;
