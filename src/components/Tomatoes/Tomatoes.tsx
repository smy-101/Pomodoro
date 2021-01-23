import React from 'react';
import styled from 'styled-components';
import TomatoAction from './TomatoAction';
import {connect} from 'react-redux';
import {addTomato, updateTomato} from '../../redux/actions/tomatoes-actions';
import axios from '../../config/axios';
import TomatoList from './TomatoList';
import _ from 'lodash';
import dayjs from 'dayjs';

const Wrapper = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: calc(50% - 8px);
  box-shadow: 0 2px 0 rgba(225, 225, 225, .2);
  background: #fff;

`;

interface ITomatoesProps {
    addTomato: (payload: any) => any;
    updateTomato: (payload: any) => any;
    tomatoes: any[];
}


class Tomatoes extends React.Component<ITomatoesProps, any> {

    get unfinishedTomato() {
        return this.props.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0];
    }

    get finishedTomato() {
        const finishedTomatoes = this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted);
        return _.groupBy(finishedTomatoes, (tomato) => {
            return dayjs(tomato.started_at).format('YYYY-MM-DD');
        });
    }

    startTomato = async () => {
        try {
            const response = await axios.post('tomatoes', {duration: 25 * 60 * 1000});
            this.props.addTomato(response.data.resource);
        } catch (e) {
            throw new Error(e);
        }
    };

    public render() {
        return (
            <Wrapper>
                <TomatoAction startTomato={this.startTomato}
                              unfinishedTomato={this.unfinishedTomato}
                              updateTomato={this.props.updateTomato}
                />
                <TomatoList finishedTomato={this.finishedTomato}/>
            </Wrapper>
        );
    }
}


const mapStateToProps = (state: { tomatoes: any; }, ownProps: any) => {
    return {
        tomatoes: state.tomatoes,
        ...ownProps
    };
};


const mapDispatchToProps = {addTomato, updateTomato};

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);