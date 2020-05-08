import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client
                .init({
                    clientId:
                        '178030782551-uuvcvfo849dcbjmmppec6k99mqbdm8ap.apps.googleusercontent.com',
                    scope: 'email',
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    // set event listener to change state via callback onAuthChange
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onAuthChange = (isSignedIn) => {
        // from event listener, returns true/false if successful
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        // console.log('renderAuthButton(): ', this.props.isSignedIn);
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <div>
                    <button
                        onClick={this.onSignOutClick}
                        className="ui red google button"
                    >
                        <i className="google icon" />
                        Sign out
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button
                        onClick={this.onSignInClick}
                        className="ui red google button"
                    >
                        <i className="google icon" />
                        Sign In with Google
                    </button>
                </div>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()} </div>;
    }
}

const mapStateToProps = (state) => {
    // state.auth comes from reducer export
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
