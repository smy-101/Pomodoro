import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';


const Wrapper = styled.div`
  margin-top: 16px;
  border-top: 1px solid #ddd;
  .dailyTomatoes{
    padding-top: 16px;
    .title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      .dateTime{
        color: #999;
        font-size: 16px;
      }
      .finishedCount{
        color: #666;
        font-size: 12px;
      }
    }
    .TomatoItem{
      margin: 4px 0;
      font-size: 14px;
      .timeRange{
        color: #999999;
      }
      .description{
        color: #222222;
        margin-left: 8px;
      }
    }
  }
`

interface ITomatoListProps {
    finishedTomato: any;
}

const TomatoItem = function (props: any) {
    return (
        <div className="TomatoItem">
            <span
                className="timeRange">{dayjs(props.started_at).format('HH:mm')} - {dayjs(props.ended_at).format('HH:mm')}</span>
            <span className="description">{props.description}</span>
        </div>
    );
};

class TomatoList extends React.Component<ITomatoListProps, any> {


    get dates() {
        const dates = Object.keys(this.props.finishedTomato);
        return dates.sort((a, b) => Date.parse(b) - Date.parse(a)).splice(0,3);
    }

    public render() {
        const list = this.dates.map(d => {
            const tomatoes = this.props.finishedTomato[d];
            return (
                <div key={d} className="dailyTomatoes">
                    <div className="title">
                        <span className="dateTime">{d}</span>
                        <span className="finishedCount">完成了{tomatoes.length}个番茄时间</span>
                    </div>
                    <div>
                        {tomatoes.map((t: { id: any; }) => <TomatoItem key={t.id} {...t}/>)}
                    </div>
                </div>
            );
        });


        return (
            <Wrapper>
                {list}
            </Wrapper>
        );
    }
}

export default TomatoList;