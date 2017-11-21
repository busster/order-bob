const $ = require('jquery')

function UserService() {
  this.urls = {
    // devProxy: 'https://cors-anywhere.herokuapp.com/',
    devProxy: '',
    base: 'https://shipbobinterview.azurewebsites.net',
    users: '/api/users',
  }

  this.getUsers = params => $.ajax({
    method: 'GET',
    url: `${this.urls.devProxy}${this.urls.base}${this.urls.users}`,
    contentType: 'application/json',
    crossDomain: true,
    data: params,
  }).done(data => data)

  this.createUser = params => $.ajax({
    method: 'POST',
    url: `${this.urls.devProxy}${this.urls.base}${this.urls.users}`,
    contentType: 'application/json',
    crossDomain: true,
    data: JSON.stringify(params),
  }).done(data => data)

  this.getUser = params => $.ajax({
    method: 'GET',
    url: `${this.urls.devProxy}${this.urls.base}${this.urls.users}/${params.userId}`,
    contentType: 'application/json',
    crossDomain: true,
  }).done(data => data)

  this.updateUser = params => $.ajax({
    method: 'PUT',
    url: `${this.urls.devProxy}${this.urls.base}${this.urls.users}`,
    contentType: 'application/json',
    crossDomain: true,
    data: JSON.stringify(params),
  }).done(data => data)

  this.deleteUser = params => $.ajax({
    method: 'DELETE',
    url: `${this.urls.devProxy}${this.urls.base}${this.urls.users}`,
    contentType: 'application/json',
    crossDomain: true,
    data: JSON.stringify(params),
  }).done(data => data)
}

const userService = new UserService()

export default userService
