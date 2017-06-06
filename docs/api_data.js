define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Sending credentials of user for login",
    "name": "PostUser",
    "group": "Login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username or nickname for access of website.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Field for secure and unique access users</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Id unique of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>nickname of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "is_admin",
            "description": "<p>0 for not admin &amp; 1 for admin.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"user\": { \"id\": 1, \"username\": \"johndoe\", \"is_admin\": 0 } \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ObjectUserEmpty",
            "description": "<p>user not exist, return a object empty.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 Not Found\n{\n  \"user\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/login.js",
    "groupTitle": "Login"
  },
  {
    "type": "post",
    "url": "/requests/admin/:id_admin_request",
    "title": "An admin can Reject or accept retirement for requests of users",
    "name": "AcceptOrRejectRequests",
    "group": "Requests",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id_admin_request",
            "description": "<p>id admin of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>can be saved if request is not reject else is rejected</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"request\": \"saved\" \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/requests.js",
    "groupTitle": "Requests"
  },
  {
    "type": "post",
    "url": "/requests",
    "title": "add request from user and data for type x-www-form-urlencoded",
    "name": "AddRequests",
    "group": "Requests",
    "parameter": {
      "examples": [
        {
          "title": "Body x-www-form-urlencoded example:",
          "content": "{\n\t\"id_requester\": 1,\n\t\"operation\": \"retirement\",\n\t\"date\": \"2012-12-12\",\n\t\"quantity\": 121221,\n}",
          "type": "x-www-form-urlencoded"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>state of operation if status is 'progress' it mean that admin his not approved, else the admin approved or the operation is payment.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"progress\" \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/requests.js",
    "groupTitle": "Requests"
  },
  {
    "type": "get",
    "url": "/requests/user/:id_requester",
    "title": "Get requests by id user",
    "name": "GetRequestsByUser",
    "group": "Requests",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id_requester",
            "description": "<p>id of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Id unique of requests.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>date of requests.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id_requester",
            "description": "<p>id of user transaction (the same requester)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status of requests in 'progress', 'rejected'  or 'accepted'</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "operation",
            "description": "<p>can be payment or retirement.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity of money for the requests.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id_admin_request",
            "description": "<p>id of user admin that approved o reject request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>can be null if request is not reject else contain a message from admin to user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"requests\": [{ \"id\": 1, \"date\": \"2012-12-12\", \"id_requester\": 1, \"status\": \"rejected\", \"operation\": \"retirement\", \"quantity\": 12232, \"id_admin_request\": 3, \"message\": \"The quantity is soo much\" }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ObjectRequestEmpty",
            "description": "<p>wallet for user empty, return a object empty.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 Not Found\n{\n  \"requests\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/requests.js",
    "groupTitle": "Requests"
  },
  {
    "type": "get",
    "url": "/requests",
    "title": "get all requests with status 'progress' of users",
    "name": "getAllRequests",
    "group": "Requests",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Id unique of requests.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>date of requests.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "operation",
            "description": "<p>can be payment or retirement.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity of money for the requests.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of user requests.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id_requester",
            "description": "<p>id of user request.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"requests\": [{ \"id\": 1, \"date\": \"2012-12-12\", \"operation\": \"retirement\", \"quantity\": 12232, \"username\": \"jonhDoe\", \"id_requester\": 1 }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ObjectRequestEmpty",
            "description": "<p>wallet for user empty, return a object empty.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 Not Found\n{\n  \"requests\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/requests.js",
    "groupTitle": "Requests"
  },
  {
    "type": "get",
    "url": "/transactions/user/:id_user/retire",
    "title": "Get all retirements by id user ordered by date, currently first",
    "name": "GetRetirements",
    "group": "Transactions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id_user",
            "description": "<p>User id of table users.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Id unique of transaction.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id_user",
            "description": "<p>user id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>date of day when the transaction is finished.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type of transaction is retirement.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity asociated of transaction.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"retirements\": [{ \"id\": 1, \"id_user\": 1, \"date\": \"2012-12-12\", \"type\": \"retirement\", \"quantity\": 332 }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ObjectRetirementsEmpty",
            "description": "<p>Retirements not exist or user id not exist, return a object empty</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 Not Found\n{\n  \"retirements\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/transactions.js",
    "groupTitle": "Transactions"
  },
  {
    "type": "get",
    "url": "/transactions/user/:id_user",
    "title": "Get all transactions by id user ordered by date, currently first",
    "name": "GetTransactions",
    "group": "Transactions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id_user",
            "description": "<p>User id of table users.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Id unique of transaction.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id_user",
            "description": "<p>user id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>date of day when the transaction is finished.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type of transaction can be retirement or payment.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity asociated of transaction.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"transactions\": [{ \"id\": 1, \"id_user\": 1, \"date\": \"2012-12-12\", \"type\": \"payment\", \"quantity\": 123232 }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ObjectTransactionsEmpty",
            "description": "<p>Transactions not exist or user id not exist, return a object empty.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 Not Found\n{\n  \"transactions\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/transactions.js",
    "groupTitle": "Transactions"
  },
  {
    "type": "get",
    "url": "/users/:id/wallet",
    "title": "get wallet by ID users",
    "name": "getWalletUser",
    "group": "UsersWallet",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>identification of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Id unique of wallet.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id_user",
            "description": "<p>id of parent wallet.</p>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "money",
            "description": "<p>quantity available of money user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"wallet\": { \"id\": 1, \"id_user\": 1, \"money\": 100000 } \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ObjectWalletEmpty",
            "description": "<p>wallet for user empty, return a object empty.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 Not Found\n{\n  \"wallet\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/users.js",
    "groupTitle": "UsersWallet"
  }
] });
