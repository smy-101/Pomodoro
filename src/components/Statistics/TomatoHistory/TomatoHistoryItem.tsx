import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';


const Wrapper= styled.div`
  .dailyTodos {
    padding: 16px;
    border: 1px solid #DDD;
    border-radius: 4px;
    margin-bottom: 8px;
    display: flex;

    .summary {
      width: 100px;
      margin-right: 8px;

      .date {
        span:first-child {
          margin-right: 4px;
          color: #222222;
        }

        span:last-child {
          color: #888;
          font-size: 12px;
        }
      }

      .finishedCount {
        font-size: 14px;
        color: #888;
      }
    }

    .todoList {
      flex: 1;
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

class TomatoHistoryItem extends React.Component<ITomatoListProps, any>{
    get dates() {
        const dates = Object.keys(this.props.finishedTomato);
        return dates.sort((a, b) => Date.parse(b) - Date.parse(a)).splice(0, 3);
    }




    public render() {
        const list = this.dates.map(d => {
            const tomatoes = this.props.finishedTomato[d];
            return (
                <div key={d} className="dailyTodos">
                    <div className="summary">
                        <p className="date">
                            <span>{d}</span>
                        </p>
                        <p className="finishedCount">完成了{tomatoes.length}个番茄</p>
                    </div>
                    <div className="todoList">
                        {tomatoes.map((t: { id: any; }) => <TomatoItem key={t.id} {...t}/>)}
                    </div>
                </div>
            );
        });
        return (
            <Wrapper>{list}</Wrapper>
        )
    }
}




export default TomatoHistoryItem