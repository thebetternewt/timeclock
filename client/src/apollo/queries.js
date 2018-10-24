import gql from 'graphql-tag';

const AUTH_QUERY = gql`
  query AuthQuery {
    isAuthenticated @client
  }
`;

const REDIRECT_QUERY = gql`
  query RedirectQuery {
    redirectPath @client
  }
`;

// Users
const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    me {
      id
      idNumber
      netId
      admin
      firstName
      lastName
      departments {
        id
        name
      }
    }
  }
`;

const USERS_QUERY = gql`
  query UsersQuery {
    users {
      id
      netId
      idNumber
      firstName
      lastName
      admin
      active
      departments {
        id
        name
      }
    }
  }
`;

const USER_QUERY = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      id
      netId
      idNumber
      firstName
      lastName
      admin
      active
      departments {
        id
        name
      }
    }
  }
`;

// Punches

const PUNCHES_QUERY = gql`
  query PunchesQuery($userId: ID, $departmentId: ID) {
    punches(userId: $userId, departmentId: $departmentId) {
      id
      userId
      departmentId
      clockInMsTime
      clockOutMsTime
      department {
        name
        id
      }
    }
  }
`;

const PUNCH_QUERY = gql`
  query PunchQuery($id: ID!) {
    punch(id: $id) {
      id
      userId
      departmentId
      clockInMsTime
      clockOutMsTime
      department {
        name
        id
      }
      user {
        id
        netId
        departments {
          name
          id
        }
      }
    }
  }
`;

const LAST_PUNCH_QUERY = gql`
  query LastPunchQuery {
    lastPunch {
      id
      userId
      departmentId
      clockInMsTime
      clockOutMsTime
      department {
        name
        id
      }
    }
  }
`;

// Departments
const DEPARTMENTS_QUERY = gql`
  query DepartmentsQuery {
    departments {
      id
      name
      representativeId
    }
  }
`;

const DEPARTMENT_QUERY = gql`
  query DepartmentsQuery($id: ID!) {
    department(id: $id) {
      id
      name
      representativeId
    }
  }
`;

// Pay Periods
const PAY_PERIODS_QUERY = gql`
  query PayPeriodsQuery($fiscalYear: Int) {
    payPeriods(fiscalYear: $fiscalYear) {
      id
      startDate
      endDate
      payPeriodId
      fiscalYear
    }
  }
`;

const PAY_PERIOD_QUERY = gql`
  query PayPeriodQuery($id: ID, $payPeriodId: ID, $fiscalYear: Int) {
    payPeriod(id: $id, payPeriodId: $payPeriodId, fiscalYear: $fiscalYear) {
      id
      startDate
      endDate
      payPeriodId
      fiscalYear
    }
  }
`;

const TIMESHEET_QUERY = gql`
  query TimeSheetQuery(
    $payPeriodId: ID!
    $fiscalYear: Int!
    $userId: ID!
    $departmentId: ID!
  ) {
    payPeriod(
      payPeriodId: $payPeriodId
      fiscalYear: $fiscalYear
      userId: $userId
      departmentId: $departmentId
    ) {
      id
      startDate
      endDate
      payPeriodId
      fiscalYear
      punches {
        id
        userId
        departmentId
        clockInMsTime
        clockOutMsTime
        department {
          name
          id
        }
      }
    }
  }
`;

export {
  AUTH_QUERY,
  REDIRECT_QUERY,
  CURRENT_USER_QUERY,
  USERS_QUERY,
  USER_QUERY,
  PUNCHES_QUERY,
  PUNCH_QUERY,
  LAST_PUNCH_QUERY,
  DEPARTMENTS_QUERY,
  DEPARTMENT_QUERY,
  PAY_PERIODS_QUERY,
  PAY_PERIOD_QUERY,
  TIMESHEET_QUERY,
};
