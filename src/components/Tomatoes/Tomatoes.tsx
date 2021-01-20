import React from 'react';
import styled from 'styled-components';
import TomatoAction from './TomatoAction';
import {connect} from 'react-redux';

const Wrapper = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: calc(50% - 8px);
  box-shadow: 0 2px 0 rgba(225, 225, 225, .2);
  background: #fff;

`

class Tomatoes extends React.Component<any, any> {
    public render() {
        return (
            <Wrapper>
                <TomatoAction/>
            </Wrapper>
        );
    }
}


// const mapStateToProps = (state: { tomatoes: any; }, ownProps: any) => {
//     return {
//         tomatoes: state.tomatoes,
//         ...ownProps
//     };
// };
//
//
// const mapDispatchToProps = {};

export default connect()(Tomatoes);