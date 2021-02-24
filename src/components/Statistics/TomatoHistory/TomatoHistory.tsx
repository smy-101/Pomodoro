import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import dayjs from 'dayjs';
import TomatoHistoryItem from './TomatoHistoryItem';

interface ITomatoHistoryProps {
    tomatoes: any[];
}


class TomatoHistory extends React.Component<ITomatoHistoryProps, any> {

    get finishedTomato() {
        const finishedTomatoes = this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted);
        return _.groupBy(finishedTomatoes, (tomato) => {
            return dayjs(tomato.started_at).format('YYYY-MM-DD');
        });
    }



    public render() {
        console.log(this.props.tomatoes.filter(t=>t.description))
        return (
            <>
                <TomatoHistoryItem finishedTomato={this.finishedTomato}/>
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