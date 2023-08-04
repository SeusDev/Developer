var data = {
  "from": "TEST",
  "to": obj.body.numbers,
  "message": obj.body.message
};

var config = {
  method: 'post',
  url: 'https://dashboard.360nrs.com/api/rest/sms',
  headers: { 
    'Authorization': 'Basic bml5YXJha3k6S0dsazMyPyU=', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config).then(function (response) {
  return res.status(202).json(response.data)
  alert("a", response.data)
}).catch(function (error) {
  return res.status(503).json(error)
})