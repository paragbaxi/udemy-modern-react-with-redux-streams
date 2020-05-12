import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

// Refactor to class so we can use componentDidMount() so that we can fetchStream(streamId)
// const StreamEdit = (props) => {
class StreamEdit extends Component {
    componentDidMount() {
        // get stream
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        // console.log(formValues);
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        // console.log(this.props);
        // props.location.pathname: "streams/edit/${streamId}"
        // "params.id" comes from Router value after colon (":id")
        // props.match.params.id = ${streamsId}
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <h3>Edit Stream</h3>
                <StreamForm
                    onSubmit={this.onSubmit}
                    // Includes too much info (id, userId)
                    // initialValues={this.props.stream}
                    //
                    // One way to fix
                    // initialValues={{
                    //     title: this.props.stream.title,
                    //     description: this.props.stream.description,
                    // }}
                    //
                    // Better way to fix
                    initialValues={_.pick(
                        this.props.stream,
                        'title',
                        'description'
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    // props.match.params.id is the stream I want, but it's stored in StreamEdit, not here
    // use "ownProps" to get the props of the component
    // console.log(ownProps);
    // If user goes directly to edit screen, fetchStreams will not have run, no stream to pull from state
    // return { stream: state.streams[ownProps.match.params.id] };return { stream: state.streams[ownProps.match.params.id] };
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
    StreamEdit
);
