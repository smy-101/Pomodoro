import React, { useEffect, useRef} from 'react';
import * as echarts from 'echarts';

type Props={
    option:any;
}


const TodoCharts:React.FC<Props> = (props) => {
    const option = props.option;
    const container = useRef(null);
    const chart = useRef(null);
    useEffect(() => {
        // console.log(container.current);
        // @ts-ignore
        container.current.style.width = `860px`;
        // @ts-ignore
        container.current.style.height = `300px`;
        // @ts-ignore
        chart.current = echarts.init(container.current,'white')
    }, []);

    useEffect(()=>{
        // @ts-ignore
        chart.current.setOption(option)
    },[option])

    return (
        <div ref={container}/>
    );
};

export default TodoCharts;