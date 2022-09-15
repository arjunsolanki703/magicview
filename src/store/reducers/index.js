import { combineReducers } from 'redux';
import loading from './loading';
import layout from './layout';
import application from './application';
import functions from './functions';
import preview from './preview';

export default combineReducers({
  loading,
  layout,
  application,
  functions,
  preview,
});
