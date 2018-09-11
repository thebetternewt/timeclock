import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../../apollo/queries';
import { CircularProgress, Button } from '@material-ui/core';

import PunchList from './PunchList';
import AddPunch from './AddPunch';
import EditPunch from './EditPunch';

export default class Punches extends Component {
  state = {
    showAddPunch: false,
    showEditPunch: false,
    selectedPunch: null
  };

  showAddPunch = () => {
    this.setState({ showAddPunch: true, showEditPunch: false });
  };
  hideAddPunch = () => {
    this.setState({ showAddPunch: false });
  };

  showEditPunch = punch => {
    this.setState({
      selectedPunch: punch,
      showEditPunch: true,
      showAddPunch: false
    });
  };

  hideEditPunch = () => {
    this.setState({
      showEditPunch: false
    });
  };

  hideForms = () => {
    this.setState({
      showAddPunch: false,
      showEditPunch: false
    });
  };

  render() {
    const { user } = this.props;
    const { showAddPunch, showEditPunch, selectedPunch } = this.state;

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

                    {showEditPunch && (
                      <EditPunch
                        user={user}
                        punch={selectedPunch}
                        cancelEdit={this.hideEditPunch}
                      />
                    )}
                    {!showAddPunch &&
                      !showEditPunch && (
                        <PunchList
                          user={user}
                          selectPunch={this.showEditPunch}
                        />
                      )}
                    {showAddPunch && (
                      <AddPunch cancelAdd={this.hideAddPunch} user={user} />
                    )}
                    {!showAddPunch &&
                      !showEditPunch && (
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
              } else {
                return <Redirect to="/dashboard" />;
              }
            }

            return null;
          }}
        </Query>
      </div>
    );
  }
}

Punches.defaultProps = {
  user: null
};

Punches.propTypes = {
  user: PropTypes.shape()
};
