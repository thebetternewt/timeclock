import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { CircularProgress, Button } from '@material-ui/core';
import { CURRENT_USER_QUERY } from '../../../apollo/queries';

import PunchList from './PunchList';
import AddPunch from './AddPunch';
import Punch from './Punch';

export default class Punches extends Component {
  state = {
    showAddPunch: false,
    showPunch: false,
    selectedPunchId: null,
  };

  showAddPunch = () => {
    this.setState({ showAddPunch: true, showPunch: false });
  };

  hideAddPunch = () => {
    this.setState({ showAddPunch: false });
  };

  showPunch = id => {
    this.setState({
      selectedPunchId: id,
      showPunch: true,
      showAddPunch: false,
    });
  };

  hidePunch = () => {
    this.setState({
      showPunch: false,
    });
  };

  hideForms = () => {
    this.setState({
      showAddPunch: false,
      showPunch: false,
    });
  };

  render() {
    const { userId } = this.props;
    const { showAddPunch, showPunch, selectedPunchId } = this.state;

    return (
      <div>
        <Query query={CURRENT_USER_QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress size={50} />;
            }

            if (data) {
              if (data.me && data.me.admin) {
                return (
                  <Fragment>
                    <h2>Punches</h2>

                    {showPunch && (
                      <Punch id={selectedPunchId} cancelEdit={this.hidePunch} />
                    )}
                    {!(showAddPunch || showPunch) && (
                      <PunchList userId={userId} selectPunch={this.showPunch} />
                    )}
                    {showAddPunch && (
                      <AddPunch cancelAdd={this.hideAddPunch} userId={userId} />
                    )}
                    {!(showAddPunch || showPunch) && (
                      <Button
                        variant="raised"
                        color="primary"
                        onClick={this.showAddPunch}
                      >
                        Add New Punch
                      </Button>
                    )}
                  </Fragment>
                );
              }
              return <Redirect to="/dashboard" />;
            }

            return null;
          }}
        </Query>
      </div>
    );
  }
}

Punches.defaultProps = {
  userId: null,
};

Punches.propTypes = {
  userId: PropTypes.string,
};
