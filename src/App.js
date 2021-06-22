import './App.css';
import './index.css';
import {useEffect, useState} from "react";
import Holiday from "./components/Holiday";


function App() {
    const [holidays, setHolidays] = useState([]);
    const date = new Date().getFullYear()
    const fetchHolidays = async () => {
        try {
            const api = await fetch(`http://nolaborables.com.ar/api/v2/feriados/${date}`);
            console.log(api.status)
            const response = await api.json();
            return response;
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
        let holidaysLocal = JSON.parse(localStorage.getItem("holidays"));
        if (holidaysLocal === null || Object.keys(holidaysLocal).length === 0) {
            let fetchedHolidays = await fetchHolidays();
            localStorage.setItem("holidays", JSON.stringify(fetchedHolidays));
            return fetchedHolidays;
        }
        return holidaysLocal;
    }

    useEffect(() => {
        async function localStorage() {
            return getHolidaysFromLocalStorage();
        }

        localStorage().then(value => {
            setHolidays(value);
        });
    }, []);

    const [showNextHolidays, setShowNextHolidays] = useState(false);
    const [toggle, setToggle] = useState(false);

    return (
        <div className={"App m-2"}>
            <h1 className={"font-bold text-4xl text-white p-8"}>Feriados {date}</h1>
            <div className={"text-white font-bold grid-cols-1"}>
                <div onClick={() => setShowNextHolidays(!showNextHolidays)}
                     className={"cursor-pointer bg-yellow-600 mx-auto w-1/3 p-2 m-2 rounded-lg h-full hover:bg-yellow-500"}>
                    <p>Proximos feriados {date}</p>
                </div>

                {showNextHolidays && holidays &&
                <div className={"w-1/3 max-h-1/2 mx-auto m-2 p-2 bg-purple-800 rounded-lg h-full"}>
                    {holidays.filter(holiday => filterUpcomingHoliday(holiday)).map(holiday => <Holiday
                        holiday={holiday}/>)}
                </div>
                }

                <div onClick={() => setToggle(!toggle)}
                     className={"cursor-pointer bg-yellow-600 mx-auto w-1/3 p-2 m-2 rounded-lg h-full hover:bg-yellow-500"}>
                    <p>Feriados {date}</p>
                </div>
                {toggle && holidays &&
                <div className={"w-1/3 max-h-1/2 mx-auto m-2 p-2 bg-purple-800 rounded-lg h-full"}>
                    {
                        holidays.map(holiday => <Holiday
                            holiday={holiday}/>)}
                </div>
                }
            </div>
        </div>
    );

}


export default App;
