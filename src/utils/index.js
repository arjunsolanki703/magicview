// save session_id in localstorage
const saveSessionId = session_id => {
  localStorage.setItem('session_id', session_id);
};

// get session_id from localstorage
const getSessionId = () => {
  return localStorage.getItem('session_id');
};

// remove session_id from localstorage
const removeSessionId = () => {
  return localStorage.removeItem('session_id');
};

// save user_uid in localstorage
const saveUserUid = user_uid => {
  localStorage.setItem('user_uid', user_uid);
};

// get user_uid from localstorage
const getUserUid = () => {
  return localStorage.getItem('user_uid');
};

// remove user_uid from localstorage
const removeUserUid = () => {
  return localStorage.removeItem('user_uid');
};

// clear session data saved by app
const clearAppSessionData = () => {
  removeSessionId(); // removing session_id from localstorage
  removeUserUid(); // removing user_uid from localstorage
};

export {
  saveSessionId,
  getSessionId,
  saveUserUid,
  getUserUid,
  clearAppSessionData,
};
