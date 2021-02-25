import React, {useState} from 'react';
import dayjs from 'dayjs';


const Charts = () => {

    const today = dayjs().format('YYYY-MM');
    const [date, setDate] = useState(today);
    const onDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setDate(e.target.value);
        console.log(e.target.value);
    };
    return (
        <div>
            <input type="month" value={date} onChange={onDateChange}/>

        </div>
    );
};

export default Charts;