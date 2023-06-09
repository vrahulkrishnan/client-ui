enum ActionTypes {
  GET_USER_DETAILS = 'CLIENT_UI/APP_MANAGEMENT/GET_USER_DETAILS',
  GET_USER_DETAILS_SUCCESS = 'CLIENT_UI/APP_MANAGEMENT/GET_USER_DETAILS_SUCCESS',
  GET_USER_DETAILS_FAILED = 'CLIENT_UI/APP_MANAGEMENT/GET_USER_DETAILS_FAILED',

  SHOW_STATUS_MESSAGE = 'CLIENT_UI/APP_MANAGEMENT/SHOW_STATUS_MESSAGE',
  CLOSE_STATUS_MESSAGE = 'CLIENT_UI/APP_MANAGEMENT/CLOSE_STATUS_MESSAGE',

  LOGOUT = 'CLIENT_UI/APP_MANAGEMENT/LOGOUT',
  LOGOUT_SUCCESS = 'CLIENT_UI/APP_MANAGEMENT/LOGOUT_SUCCESS',
  LOGOUT_FAILED = 'CLIENT_UI/APP_MANAGEMENT/LOGOUT_FAILED',

  RESET_REDUX = 'CLIENT_UI/APP_MANAGEMENT/RESET_REDUX'
}

export default ActionTypes;
