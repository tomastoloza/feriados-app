import React from 'react';

const Holiday = (holiday) => {
    return (
        <div className={"bg-purple-500 m-2 p-4 shadow-md shadow-inner rounded-lg"}>
            <p>{holiday.holiday.motivo}</p>
            <p>{holiday.holiday.dia}/{holiday.holiday.mes}</p>
        </div>
    );
};

export default Holiday;
