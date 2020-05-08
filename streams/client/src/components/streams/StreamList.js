import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderList() {
        return this.props.streams.map(({ id, title, description }) => {
            return (
                <div className="item" key={id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content">{title}</div>
                    <div className="description">{description}</div>
                </div>
            );
        });
    }

    render() {
        // console.log(this.props.streams);
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
