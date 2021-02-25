import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import dayjs from 'dayjs';
import TomatoHistoryItem from './TomatoHistoryItem';
import styled from 'styled-components';
import {Empty} from 'antd';

const Wrapper = styled.div`
  margin-bottom: 100px;
  max-height: 500px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
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
`;

interface ITomatoHistoryProps {
    tomatoes: any[];
}


class TomatoHistory extends React.Component<ITomatoHistoryProps, any> {

    // get finishedTomato() {
    //     const finishedTomatoes = this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted);
    //     return _.groupBy(finishedTomatoes, (tomato) => {
    //         return dayjs(tomato.started_at).format('YYYY-MM-DD');
    //     });
    // }

    get finishedTomato() {
        return this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted);
    }

    get dailyFinishedTomato() {
        return _.groupBy(this.finishedTomato, (tomatoes) => {
            return dayjs(tomatoes.ended_at).format('YYYY-MM-DD');
        });
    }

    get finishedDates() {
        return Object.keys(this.dailyFinishedTomato).sort((a, b) => Date.parse(b) - Date.parse(a));
    }


    public render() {
        // console.log(this.dailyFinishedTomato)
        const finishedTomatoList = this.finishedDates.map(date => {
            return (
                <div key={date} className="dailyTodos">
                    <div className="summary">
                        <p className="date">
                            <span>{date}</span>
                        </p>
                        <p className="finishedCount">完成了{this.dailyFinishedTomato[date].length}个番茄</p>
                    </div>
                    <div className="todoList">
                        {
                            this.dailyFinishedTomato[date].map(tomato =>
                                <TomatoHistoryItem key={tomato.id} tomato={tomato}/>)
                        }
                    </div>
                </div>
            );
        });
        return (
            <Wrapper>
                {
                    this.finishedTomato.length!==0 ? finishedTomatoList : <Empty/>
                }
            </Wrapper>
            // <>
            //     {finishedTomatoList}
            // </>
        );
    }
}


const mapStateToProps = (state: { tomatoes: any; }, ownProps: any) => {
    return {
        tomatoes: state.tomatoes,
        ...ownProps
    };
};

export default connect(mapStateToProps)(TomatoHistory);