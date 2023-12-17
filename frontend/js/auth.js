function isAuthenticated() {
    if (!getToken()) {
      window.location.href = '/index.html';
    } else {
      return true;
    }
  }
  
function getToken() {
  return localStorage.getItem('@avex:token');
}

function signin(token) {
  localStorage.setItem('@avex:token', token);

  window.location.href = '/conexao.html';
}

function signout() {
  localStorage.removeItem('@avex:token');

  window.location.href = '/index.html';
}

export default { isAuthenticated, getToken, signin, signout };