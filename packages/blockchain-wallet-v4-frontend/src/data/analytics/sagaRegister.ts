import * as AT from './actionTypes'
import { takeLatest } from 'redux-saga/effects'
import sagas from './sagas'

export default ({ api, coreSagas, networks }) => {
  const analyticsSagas = sagas({
    api,
    coreSagas,
    networks
  })

  return function * analyticsSaga () {
    yield takeLatest(AT.CREATE_AB_TEST, analyticsSagas.createABTest)
    yield takeLatest(AT.LOG_EVENT, analyticsSagas.logEvent)
    yield takeLatest(AT.LOG_PAGE_VIEW, analyticsSagas.logPageView)
    yield takeLatest(AT.LOG_GOAL, analyticsSagas.logGoal)
    yield takeLatest(AT.INIT_USER_SESSION, analyticsSagas.initUserSession)
    yield takeLatest(AT.START_SESSION, analyticsSagas.startSession)
    yield takeLatest(AT.STOP_SESSION, analyticsSagas.stopSession)
  }
}
