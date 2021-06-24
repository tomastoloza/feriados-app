import './App.css';
import './index.css';
import {useEffect, useState} from "react";
import Section from "./components/Section";


function App() {
    const [holidays, setHolidays] = useState([]);
    const date = new Date().getFullYear()

    async function fetchHolidays() {
        try {
            const api = await fetch(`https://nolaborables.com.ar/api/v2/feriados/${date}`);
            console.log("API Response: ", api.status, api.statusText)
            return await api.json();
        } catch (error) {
            console.log(error);
        }
    };

    function filterUpcomingHoliday(holiday) {
        const now = new Date();
        const today = {
            day: now.getDate(),
            month: now.getMonth() + 1
        };
        return (holiday.mes === today.month && holiday.dia > today.day) || holiday.mes > today.month;
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

    let title = `Feriados ${date}`;
    return (
        <div className={"App m-2"}>
            <h1 className={"font-bold text-4xl text-white p-8"}>{title}</h1>
            <Section title={"Feriados proximos"}
                     holidays={holidays.filter(filterUpcomingHoliday)}/>
            <Section title={title}
                     holidays={holidays}/>
            <div className={"text-white sticky bottom-2 bg-purple-900 p-2 my-auto"}>
                Built by <a className={"text-yellow-500"} href="https://www.github.com/tomastoloza">@tomastoloza</a>,
                using <a className={"text-yellow-500"}
                         href="https://github.com/pjnovas/nolaborables">NoLaborables API REST</a> made by <a
                className={"text-yellow-500"}
                href="https://github.com/pjnovas/">@pjnovas</a>
            </div>
        </div>
    );

}


export default App;
