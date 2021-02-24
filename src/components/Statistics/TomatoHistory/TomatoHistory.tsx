import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import dayjs from 'dayjs';
import TomatoHistoryItem from './TomatoHistoryItem';

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
                        <p className="finishedCount">完成了{this.dailyFinishedTomato[date].length}个任务</p>
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
            <>
                {finishedTomatoList}
                {/*<TomatoHistoryItem finishedTomato={this.finishedTomato}/>*/}
            </>
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