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
        if (holidaysLocal.length === 0) {
            let fetchedHolidays = fetchHolidays();
            localStorage.setItem("holidays", JSON.stringify(fetchedHolidays))
            return fetchedHolidays;
        }
        return holidaysLocal;
    }

    useEffect(() => {
        getHolidaysFromLocalStorage().then(value => setHolidays(value));
    }, []);


    return (
        <div className={"App m-2"}>
            <h1 className={"font-bold text-4xl text-white p-8"}>Feriados {date}</h1>
            <div className={"text-white font-bold grid-cols-1"}>
                <div className={"bg-purple-600 w-1/3 p-2 rounded-lg h-full m-4 mx-auto"}>
                    <p>Proximos feriados {date}</p>
                    {holidays && holidays.filter(holiday => filterUpcomingHoliday(holiday)).map(holiday => <Holiday
                        holiday={holiday}/>)}
                </div>
                <div className={"bg-purple-600 w-1/3 p-2 rounded-lg m-4 mx-auto"}>
                    <p>Feriados {date}</p>
                    {holidays && holidays.map(holiday => <Holiday
                        holiday={holiday}/>)}
                </div>
            </div>
        </div>
    );

}


export default App;
