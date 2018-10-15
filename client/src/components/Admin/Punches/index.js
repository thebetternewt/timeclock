import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { CircularProgress } from '@material-ui/core';
import { USER_QUERY } from '../../../apollo/queries';

import PunchList from './PunchList';
import AddPunch from './AddPunch';
import Punch from './Punch';

export default class Punches extends Component {
  state = {
    showPunch: false,
    selectedPunchId: null,
  };

  showPunch = id => {
    this.setState({
      selectedPunchId: id,
      showPunch: true,
    });
  };

  hidePunch = () => {
    this.setState({
      showPunch: false,
    });
  };

  hideForms = () => {
    this.setState({
      showPunch: false,
    });
  };

  render() {
    const { userId } = this.props;
    const { showPunch, selectedPunchId } = this.state;

    return (
      <Fragment>
        <Query query={USER_QUERY} variables={{ id: userId }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data && data.user) {
              return (
                <Fragment>
                  <h2>Punches</h2>
                  {showPunch && (
                    <Punch
                      id={selectedPunchId}
                      close={this.hidePunch}
                      isOpen={showPunch}
                    />
                  )}
                  <AddPunch user={data.user} />
                  <PunchList userId={userId} selectPunch={this.showPunch} />
                </Fragment>
              );
            }

            return null;
          }}
        </Query>
      </Fragment>
    );
  }
}

Punches.propTypes = {
  userId: PropTypes.string.isRequired,
};
