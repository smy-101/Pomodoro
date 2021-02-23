import React from 'react';
import {connect} from 'react-redux';


interface ITomatoHistoryProps{
    tomatoes:any[];
}


class TomatoHistory extends React.Component<ITomatoHistoryProps, any>{



    public render() {
        return (
            <div>番茄历史</div>
        )
    }
}


const mapStateToProps = (state: { tomatoes: any; }, ownProps: any) => {
    return {
        todos: state.tomatoes,
        ...ownProps
    };
};

export default connect(mapStateToProps)(TomatoHistory);