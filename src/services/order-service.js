const $ = require('jquery')

function OrderService() {
  this.urls = {
    // devProxy: 'https://cors-anywhere.herokuapp.com/',
    devProxy: '',
    base: 'https://shipbobinterview.azurewebsites.net',
    users: '/api/users',
    orders: '/orders',
  }

  this.getOrders = params => $.ajax({
    method: 'GET',
    url: `${this.urls.devProxy}${this.urls.base}${this.urls.users}/${params.userId}${this.urls.orders}`,
    contentType: 'application/json',
    crossDomain: true,
    data: params,
  }).done(data => data)

  this.createOrder = params => $.ajax({
    method: 'POST',
    url: `${this.urls.devProxy}${this.urls.base}${this.urls.users}/${params.userId}${this.urls.orders}`,
    contentType: 'application/json',
    crossDomain: true,
    data: JSON.stringify(params),
  }).done(data => data)

  this.updateOrder = params => $.ajax({
    method: 'PUT',
    url: `${this.urls.devProxy}${this.urls.base}${this.urls.users}/${params.userId}${this.urls.orders}`,
    contentType: 'application/json',
    crossDomain: true,
    data: JSON.stringify(params),
  }).done(data => data)

  this.getOrder = params => $.ajax({
    method: 'GET',
    url: `${this.urls.devProxy}${this.urls.base}${this.urls.users}/${params.userId}${this.urls.orders}/${params.orderId}`,
    contentType: 'application/json',
    crossDomain: true,
  }).done(data => data)

  this.deleteOrder = params => $.ajax({
    method: 'DELETE',
    url: `${this.urls.devProxy}${this.urls.base}${this.urls.users}/${params.userId}${this.urls.orders}`,
    contentType: 'application/json',
    crossDomain: true,
    data: JSON.stringify(params),
  }).done(data => data)
}

const orderService = new OrderService()

export default orderService
