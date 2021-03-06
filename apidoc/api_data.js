define({ "api": [
  {
    "type": "post",
    "url": "/:tenantId/devices",
    "title": "Create Device",
    "version": "1.0.0",
    "name": "CreateDevice",
    "group": "Device",
    "description": "<p>Create Device.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X POST  --data '{\"deviceName\": \"device1\",\"serialNo\":\"SN101\",\"description\":\"test device\",\"lastConnectedTime\":\"2018-01-08 11:13:29.000\",\"protocolVersion\":\"v1.01\",\"deviceType\":\"J1939\"}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deviceName",
            "description": "<p>Device Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "serialNo",
            "description": "<p>Serial Number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "description",
            "description": "<p>Device description.(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "lastConnectedTime",
            "description": "<p>Last connected Timestamp</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "protocolVersion",
            "description": "<p>Protocol Version supported</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deviceType",
            "description": "<p>DeviceType.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hardwareVersion",
            "description": "<p>Hardware version of device.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "   \t{\n\t        \"deviceName\": \"device1\",\n          \"serialNo\": \"SN101\",\n          \"description\": \"test device\",\n          \"lastConnectedTime\": \"2018-01-08 11:13:29.000\",\n          \"protocolVersion\": \"v1.01\",\n          \"deviceType\": \"J1939\"\n\n      }",
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
            "field": "Unauthorized",
            "description": "<p>The token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n   \"message\": \"Bad Request\"\n}",
          "type": "json"
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
            "field": "deviceName",
            "description": "<p>Device Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "serialNo",
            "description": "<p>Serial Number.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "description",
            "description": "<p>Device description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastConnectedTime",
            "description": "<p>Last connected Timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "protocolVersion",
            "description": "<p>Protocol Version supported</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "deviceType",
            "description": "<p>DeviceType.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hardwareVersion",
            "description": "<p>Hardware version of device</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": {\n        \"id\": \"372993ba-a6a0-4164-b9c3-3cf5c6844374\",\n        \"isDeleted\": 0,\n        \"status\": \"Active\",\n        \"deviceName\": \"device1\",\n        \"serialNo\": \"sn101\",\n        \"lastConnectedTime\": \"2018-03-03T08:02:43.833Z\",\n        \"protocolVersion\": \"v1.01\",\n        \"deviceType\": \"OBD\",\n        \"description\": \"test device\",\n        \"updatedAt\": \"2018-03-07T08:03:23.557Z\",\n        \"createdAt\": \"2018-03-07T08:03:23.557Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices"
      }
    ],
    "filename": "routes/device.js",
    "groupTitle": "Device"
  },
  {
    "type": "delete",
    "url": "/:tenantId/devices/:id",
    "title": "Delete Device",
    "version": "1.0.0",
    "name": "DeleteDevice",
    "group": "Device",
    "description": "<p>Delete Device.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X DELETE  --data '{}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices/4aedcab5-9413-4219-b09f-e652df7be3b6\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalide request parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Bad Request\"\n}",
          "type": "json"
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
            "field": "message",
            "description": "<p>Message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices/4aedcab5-9413-4219-b09f-e652df7be3b6"
      }
    ],
    "filename": "routes/device.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "/:tenantId/devices/:id",
    "title": "Get Device's Details",
    "version": "1.0.0",
    "name": "Get_Device_s_Details",
    "group": "Device",
    "description": "<p>Get Device's Details.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X GET  -d \"\" http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices/e9f2841b-e15f-4acb-85af-ff7b99089f77-H \"Autherization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The  token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (400 example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Bad Request\"\n    \"error\": {\n          \"id\": {\n              \"location\": \"params\",\n              \"param\": \"id\",\n              \"msg\": \"Invalid\"\n          }\n      }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
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
            "field": "deviceName",
            "description": "<p>Device Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "serialNo",
            "description": "<p>Serial Number.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "description",
            "description": "<p>Device description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastConnectedTime",
            "description": "<p>Last connected Timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "protocolVersion",
            "description": "<p>Protocol Version supported</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "deviceType",
            "description": "<p>DeviceType.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": {\n        \"id\": \"372993ba-a6a0-4164-b9c3-3cf5c6844374\",\n        \"deviceName\": \"device1\",\n        \"description\": \"test device\",\n        \"serialNo\": \"sn101\",\n        \"protocolVersion\": \"v1.01\",\n        \"deviceType\": \"OBD\",\n        \"lastConnectedTime\": \"2018-03-03T08:02:43.833Z\",\n        \"isDeleted\": 0,\n        \"status\": \"Active\",\n        \"createdAt\": \"2018-03-07T08:03:23.557Z\",\n        \"updatedAt\": \"2018-03-07T08:03:23.557Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices/372993ba-a6a0-4164-b9c3-3cf5c6844374"
      }
    ],
    "filename": "routes/device.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "/:tenantId/devices",
    "title": "Get All Device List",
    "version": "1.0.0",
    "name": "GetdeviceList",
    "group": "Device",
    "description": "<p>device List.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X GET  -d \"\" http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices -H \"Autherization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>[page=0] Page Number (optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>[limit=0]  List limit(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>[sort=createdAt]  Sorting on which field(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order",
            "description": "<p>[order=asc]  Sorting field order(asc|desc)(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "isDeviceAssign",
            "description": "<p>Get list of device(assign/unassign) (1|0)(optional)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalide request parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"BadRequest\"\n}",
          "type": "json"
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
            "field": "deviceName",
            "description": "<p>Device Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "serialNo",
            "description": "<p>Serial Number.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "description",
            "description": "<p>Device description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastConnectedTime",
            "description": "<p>Last connected Timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "protocolVersion",
            "description": "<p>Protocol Version supported</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "deviceType",
            "description": "<p>DeviceType.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"count\": 2,\n    \"data\": [\n        {\n            \"id\": \"33629ecb-f239-4521-9a6e-ce9ea27b2381\",\n            \"deviceName\": \"device\",\n            \"description\": null,\n            \"serialNo\": \"sn101\",\n            \"protocolVersion\": \"v1.01\",\n            \"deviceType\": \"obd\",\n            \"lastConnectedTime\": null,\n            \"isDeleted\": 0,\n            \"status\": \"Active\",\n            \"createdAt\": \"2018-03-07T08:02:43.833Z\",\n            \"updatedAt\": \"2018-03-07T08:02:43.833Z\"\n        },\n        {\n            \"id\": \"372993ba-a6a0-4164-b9c3-3cf5c6844374\",\n            \"deviceName\": \"device1\",\n            \"description\": \"test device\",\n            \"serialNo\": \"sn101\",\n            \"protocolVersion\": \"v1.01\",\n            \"deviceType\": \"OBD\",\n            \"lastConnectedTime\": \"2018-03-03T08:02:43.833Z\",\n            \"isDeleted\": 0,\n            \"status\": \"Active\",\n            \"createdAt\": \"2018-03-07T08:03:23.557Z\",\n            \"updatedAt\": \"2018-03-07T08:03:23.557Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices"
      }
    ],
    "filename": "routes/device.js",
    "groupTitle": "Device"
  },
  {
    "type": "put",
    "url": "/:tenantId/devices/:id",
    "title": "Update Device",
    "version": "1.0.0",
    "name": "UpdateDevice",
    "group": "Device",
    "description": "<p>Update Device.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X PUT  --data '{\"deviceName\": \"Updated device\",\"description\":\"updated device information\",lastConnectedTime\":\"2018-02-27T11:45:17.403Z\",\"protocolVersion\":\"v1.01\"}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices/4aedcab5-9413-4219-b09f-e652df7be3b6\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "defaultValue": "null",
            "description": "<p>Device description(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastConnectedTime",
            "defaultValue": "null",
            "description": "<p>LastConnectedTime(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "protocolVersion",
            "defaultValue": "null",
            "description": "<p>ProtocolVersion(optional).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    \t{\n\t        \"deviceName\": \"updated device\"\n      }",
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
            "field": "Unauthorized",
            "description": "<p>The token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalide request parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Bad Request\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Device",
            "description": "<p>description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "Last",
            "description": "<p>connected Timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Protocol",
            "description": "<p>Version supported</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"message\": \"Success\",\n    \"data\": {\n        \"deviceName\": \"updated device\",\n        \"updatedAt\": \"2018-02-27T11:03:40.144Z\"\n    }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices/4aedcab5-9413-4219-b09f-e652df7be3b6"
      }
    ],
    "filename": "routes/device.js",
    "groupTitle": "Device"
  },
  {
    "type": "post",
    "url": "/:tenantId/fleets",
    "title": "Create Fleet",
    "version": "1.0.0",
    "name": "CreateFleet",
    "group": "Fleet",
    "description": "<p>Create Fleet.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X POST  --data '{\"fleetName\": \"test\",\"description\": \"test description\",\"fleetAdminId\":\"bc313a62-fdf9-4e66-8c22-a84c91f60aa4\"}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/fleets\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fleetName",
            "description": "<p>Fleet Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description.(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fleetAdminId",
            "description": "<p>FleetAdmin Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID[]",
            "optional": false,
            "field": "vehicleIdList",
            "description": "<p>Assign fleetId to multiple vehicles.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "   \t{\n\t        \"fleetName\": \" demo\",\n          \"description\": \" demo fleet\",\n          \"fleetAdminId\": \"bc313a62-fdf9-4e66-8c22-a84c91f60aa4\",\n           \"vehicleIdList\": [\"699a006c-b21c-4934-9cff-35d01b3f40af\"]\n  \n      }",
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
            "field": "Unauthorized",
            "description": "<p>The Fleet token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n   \"message\": \"Bad Request\"\n}",
          "type": "json"
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
            "field": "fleetName",
            "description": "<p>Fleet Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Fleet Description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tenantId",
            "description": "<p>TenantId.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fleetAdminId",
            "description": "<p>FleetAdmin Id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n   {\n    \"message\": \"Success\",\n    \"data\": {\n        \"id\": \"2e272995-d96c-4b6e-8da6-9a5060a6c97f\",\n        \"isDeleted\": 0,\n        \"status\": \"Active\",\n        \"fleetName\": \" demo\",\n        \"description\": \" demo fleet\",\n        \"fleetAdminId\": \"bd6c510a-7749-4a14-99ed-34f2e316e478\",\n        \"tenantId\": \"bd6c510a-7749-4a14-99ed-34f2e316e478\",\n        \"updatedAt\": \"2018-03-07T06:13:07.695Z\",\n        \"createdAt\": \"2018-03-07T06:13:07.695Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/bd6c510a-7749-4a14-99ed-34f2e316e478/fleets"
      }
    ],
    "filename": "routes/fleet.js",
    "groupTitle": "Fleet"
  },
  {
    "type": "delete",
    "url": "/:tenantId/fleets/:id",
    "title": "Delete Fleet",
    "version": "1.0.0",
    "name": "DeleteFleet",
    "group": "Fleet",
    "description": "<p>Delete Fleet.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X DELETE  --data '{}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/fleets/4aedcab5-9413-4219-b09f-e652df7be3b6\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The Fleet token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalide request parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Bad Request\"\n}",
          "type": "json"
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
            "field": "message",
            "description": "<p>Message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/fleets/4aedcab5-9413-4219-b09f-e652df7be3b6"
      }
    ],
    "filename": "routes/fleet.js",
    "groupTitle": "Fleet"
  },
  {
    "type": "get",
    "url": "/:tenantId/fleets",
    "title": "Get All Fleet List",
    "version": "1.0.0",
    "name": "GetFleetList",
    "group": "Fleet",
    "description": "<p>Fleet List.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X GET  -d \"\" http://localhost:3302/bd6c510a-7749-4a14-99ed-34f2e316e478/fleets -H \"Autherization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>[page=0]  Page Number (optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>[limit=0]  List limit(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>[sort=createdAt]  Sorting on which field(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order",
            "description": "<p>[order=asc]  Sorting field order(asc|desc)(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fleetAdminId",
            "description": "<p>[order=asc] fleetAdminId Sorting field (optional).</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The Fleet token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalide request parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"BadRequest\"\n}",
          "type": "json"
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
            "field": "fleetName",
            "description": "<p>Fleet Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tenantId",
            "description": "<p>TenantId.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fleetAdminId",
            "description": "<p>FleetAdmin Id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n   {\n    \"message\": \"Success\",\n    \"count\": 1,\n    \"data\": [\n         {\n            \"id\": \"2e272995-d96c-4b6e-8da6-9a5060a6c97f\",\n            \"fleetName\": \" demo\",\n            \"description\": \" demo fleet\",\n            \"tenantId\": \"bd6c510a-7749-4a14-99ed-34f2e316e478\",\n            \"fleetAdminId\": \"bd6c510a-7749-4a14-99ed-34f2e316e478\",\n            \"isDeleted\": 0,\n            \"status\": \"Active\",\n            \"createdAt\": \"2018-03-07T06:13:07.695Z\",\n            \"updatedAt\": \"2018-03-07T06:13:07.695Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/bd6c510a-7749-4a14-99ed-34f2e316e478/fleets/"
      }
    ],
    "filename": "routes/fleet.js",
    "groupTitle": "Fleet"
  },
  {
    "type": "get",
    "url": "/:tenantId/fleets/:id",
    "title": "Get Fleet's Details",
    "version": "1.0.0",
    "name": "Get_Fleet_s_Details",
    "group": "Fleet",
    "description": "<p>Get Fleet's Details.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X GET  -d \"\" http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/fleets/c678ec68-2c65-4ced-bdb6-0e34d9c245aa -H \"Autherization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The Fleet token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (400 example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Bad Request\"\n    \"error\": {\n          \"id\": {\n              \"location\": \"params\",\n              \"param\": \"id\",\n              \"msg\": \"Invalid\"\n          }\n      }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
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
            "field": "fleetName",
            "description": "<p>Fleet Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tenantId",
            "description": "<p>TenantId.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fleetAdminId",
            "description": "<p>FleetAdmin Id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n  {\n    \"message\": \"Success\",\n    \"data\": {\n        \"id\": \"2e272995-d96c-4b6e-8da6-9a5060a6c97f\",\n        \"isDeleted\": 0,\n        \"status\": \"Active\",\n        \"fleetName\": \" demo\",\n        \"description\": \" demo fleet\",\n        \"fleetAdminId\": \"bd6c510a-7749-4a14-99ed-34f2e316e478\",\n        \"tenantId\": \"bd6c510a-7749-4a14-99ed-34f2e316e478\",\n        \"updatedAt\": \"2018-03-07T06:13:07.695Z\",\n        \"createdAt\": \"2018-03-07T06:13:07.695Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/bd6c510a-7749-4a14-99ed-34f2e316e478/fleets/2e272995-d96c-4b6e-8da6-9a5060a6c97f"
      }
    ],
    "filename": "routes/fleet.js",
    "groupTitle": "Fleet"
  },
  {
    "type": "put",
    "url": "/:tenantId/fleets/:id",
    "title": "Update Fleet",
    "version": "1.0.0",
    "name": "UpdateFleet",
    "group": "Fleet",
    "description": "<p>Update Fleet.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X PUT  --data '{\"fleeName\": \"Updated fleet\",\"description\":\"info about fleet\",\"00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6\":\"4564654\",\"fleetadminId\":\"ed572b86-a5ea-43b6-a5bc-cdc2f1251597\"}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/fleet/5a2a8b63a4894865d03600a7\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "fleetName",
            "defaultValue": "null",
            "description": "<p>Fleet Name(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "defaultValue": "null",
            "description": "<p>Description(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "fleetAdminId",
            "defaultValue": "null",
            "description": "<p>FleetAdminId(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID[]",
            "optional": false,
            "field": "vehicleIdList",
            "description": "<p>List of vehilces Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isVehicleRemove",
            "description": "<p>Flag to remove vehicles from fleet.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    \t{\n\t \"fleetName\": \"MS Updated fleet\"\n    \"isVehicleRemove\":true,\n    \"vehicleIdList\":[\"4b93dd70-83a0-40a9-b71c-ed9fd232af71\",\"5483eeb9-38ae-4baf-8861-e84dc70c689d\"]\n      }",
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
            "field": "Unauthorized",
            "description": "<p>The Fleet token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalide request parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Bad Request\"\n}",
          "type": "json"
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
            "field": "fleetName",
            "description": "<p>fleetName Fleet Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fleetAdminId",
            "description": "<p>FleetAdmin Id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n  {\n    \"message\": \"Success\",\n    \"data\": {\n        \"fleetName\": \"MS Updated fleet\",\n        \"updatedAt\": \"2018-02-27T11:03:40.144Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/fleets/4aedcab5-9413-4219-b09f-e652df7be3b6"
      }
    ],
    "filename": "routes/fleet.js",
    "groupTitle": "Fleet"
  },
  {
    "type": "post",
    "url": "/:tenantId/vehicles",
    "title": "Create Vehicle",
    "version": "1.0.0",
    "name": "CreateVehicle",
    "group": "Vehicle",
    "description": "<p>Create Vehicle.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X POST  --data '{\"brandName\": \"MS Brezza\",\"model\":\"Maruti Suzuki Vitara Brezza\",\"fuelType\":\"petrol\",\"yearOfManufacture\":\"2012\",\"geoFencing\":\"geofence1\",\"registrationNumber\":\"1GNEK13ZX3R298984\",\"userId\":\"00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6\",\"deviceId\":\"bc313a62-fdf9-4e66-8c22-a84c91f60aa4\",\"fleetId\":\"6d3a5cd4-6a0b-4828-b71d-f43100d68bb3\"}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "brandName",
            "description": "<p>Brand Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fuelType",
            "description": "<p>Fuel Type.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "yearOfManufacture",
            "description": "<p>Year of Manufacture.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "registrationNumber",
            "description": "<p>Vehicle Registration Number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Vehicle's color.(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "geoFencing",
            "description": "<p>Geofencing(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id.(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "deviceId",
            "description": "<p>Device Id.(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "fleetId",
            "description": "<p>Fleet Id.(optional)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "   \t{\n\t        \"brandName\": \"MS Brezza\",\n          \"model\": \"Maruti Suzuki Vitara Brezza\",\n          \"fuelType\": \"Four Wheeler\",\n          \"registrationNumber\": \"1GNEK13ZX3R298984\",\n          \"userId\": \"00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6\",\n          \"deviceId\": \"bc313a62-fdf9-4e66-8c22-a84c91f60aa4\"\n\n      }",
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
            "field": "Unauthorized",
            "description": "<p>The token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n   \"message\": \"Bad Request\"\n}",
          "type": "json"
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
            "field": "brandName",
            "description": "<p>Vehicle Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fuleType",
            "description": "<p>Fuel Type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationNumber",
            "description": "<p>Vehicle Registration Number.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Vehicle's color.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "yearOfManufacture",
            "description": "<p>Year of Manufacture.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "deviceId",
            "description": "<p>DeviceId.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fleetId",
            "description": "<p>FleetId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": {\n        \"id\": \"3f6b39e8-24e1-4d2e-a1ac-e5fd76ed5897\",\n        \"isDeleted\": 0,\n        \"status\": \"Active\",\n        \"brandeName\": \"test vehicle\",\n        \"model\": \"model-brezza\",\n        \"fuelType\": \"petrol\",\n        \"registrationNumber\": \"09809876543219876\",\n        \"userId\": \"b55e75da-595a-4303-b6f6-889e4f41afca\",\n        \"deviceId\": \"b55e75da-595a-4303-b6f6-889e4f41afca\",\n        \"fleetId\": \"b55e75da-595a-4303-b6f6-889e4f41afca\",\n        \"updatedAt\": \"2018-03-07T08:26:14.441Z\",\n        \"createdAt\": \"2018-03-07T08:26:14.441Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles"
      }
    ],
    "filename": "routes/vehicle.js",
    "groupTitle": "Vehicle"
  },
  {
    "type": "delete",
    "url": "/:tenantId/vehicles/:id",
    "title": "Delete Vehicle",
    "version": "1.0.0",
    "name": "DeleteVehicle",
    "group": "Vehicle",
    "description": "<p>Delete Vehicle.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X DELETE  --data '{}' http://<ip>:<port>/devices/4aedcab5-9413-4219-b09f-e652df7be3b6\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalide request parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Bad Request\"\n}",
          "type": "json"
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
            "field": "message",
            "description": "<p>Message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles/4aedcab5-9413-4219-b09f-e652df7be3b6"
      }
    ],
    "filename": "routes/vehicle.js",
    "groupTitle": "Vehicle"
  },
  {
    "type": "get",
    "url": "/:tenantId/vehicles/:id",
    "title": "Get Vehicle's Details",
    "version": "1.0.0",
    "name": "Get_Vehicle_s_Details",
    "group": "Vehicle",
    "description": "<p>Get Vehicle's Details.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X GET  -d \"\" http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles/0e5e148f-82fc-4e0d-a8a2-524af36826d2 -H \"Autherization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The  token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (400 example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Bad Request\"\n    \"error\": {\n          \"id\": {\n              \"location\": \"params\",\n              \"param\": \"id\",\n              \"msg\": \"Invalid\"\n          }\n      }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
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
            "field": "brandName",
            "description": "<p>Vehicle Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fuleType",
            "description": "<p>Fuel Type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationNumber",
            "description": "<p>Vehicle Registration Number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "yearOfManufacture",
            "description": "<p>Year of Manufacture.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "deviceId",
            "description": "<p>DeviceId.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fleetId",
            "description": "<p>FleetId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": {\n        \"id\": \"351b5b70-2941-4eb7-8294-01b4d6a70a0f\",\n        \"brandName\": \"Audi\",\n        \"model\": \"Q7\",\n        \"fuelType\": \"Petrol\",\n        \"registrationNumber\": \"MH12MG5464\",\n        \"geoFencing\": null,\n        \"yearOfManufacture\": \"2018\",\n        \"color\": \"White\",\n        \"userId\": \"47e76a6c-6efe-4569-b525-1c4dc0508c2f\",\n        \"deviceId\": \"7351c2ec-539f-4406-a019-1f4ad3677548\",\n        \"fleetId\": null,\n        \"isDeleted\": 0,\n        \"status\": \"Active\",\n        \"createdAt\": \"2018-03-26T07:00:23.671Z\",\n        \"updatedAt\": \"2018-03-29T09:37:53.399Z\",\n        \"Device\": {\n            \"id\": \"7351c2ec-539f-4406-a019-1f4ad3677548\",\n            \"deviceName\": \"device\",\n            \"serialNo\": \"SN101\",\n            \"protocolVersion\": \"v1.01\",\n            \"deviceType\": \"obd\",\n            \"description\": \"test\",\n            \"updatedAt\": \"2018-03-29T09:35:37.504Z\",\n            \"createdAt\": \"2018-03-29T09:35:37.504Z\",\n            \"isDeleted\": 0,\n            \"status\": \"Active\",\n            \"hardwareVersion\": \"0.1\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles/3f6b39e8-24e1-4d2e-a1ac-e5fd76ed5897"
      }
    ],
    "filename": "routes/vehicle.js",
    "groupTitle": "Vehicle"
  },
  {
    "type": "get",
    "url": "/:tenantId/vehicles",
    "title": "Get All Vehicle List",
    "version": "1.0.0",
    "name": "GetvehicleList",
    "group": "Vehicle",
    "description": "<p>vehicle List.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X GET  -d \"\" http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles -H \"Autherization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>[page=0]  Page Number (optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>[limit=0]  List limit(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>[sort=createdAt]  Sorting on which field(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order",
            "description": "<p>[order=asc]  Sorting field order(asc|desc)(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "registrationNumber",
            "description": "<p>RegistrationNumber Sorting field registrationNumber(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>UserId Sorting field (optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fleetId",
            "description": "<p>FleetId Sorting field (optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isDriverUnassigned",
            "description": "<p>Flag to get all unassigned vehicle(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isFleetUnassigned",
            "description": "<p>Flag to get all unassigned vehicle(optional).</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalide request parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"BadRequest\"\n}",
          "type": "json"
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
            "field": "brandName",
            "description": "<p>Vehicle Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fuleType",
            "description": "<p>Fuel Type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationNumber",
            "description": "<p>Vehicle Registration Number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "yearOfManufacture",
            "description": "<p>Year of Manufacture.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "deviceId",
            "description": "<p>Device Id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fleetId",
            "description": "<p>Fleet Id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"message\": \"Success\",\n    \"count\": 2,\n    \"data\": [\n        {\n            \"id\": \"db15fd42-a45c-4a80-9186-cc6473d75c6e\",\n            \"brandeName\": \"test vehicle1\",\n            \"model\": \"model-swift\",\n            \"fuelType\": \"petrol\",\n            \"registrationNumber\": \"09809876543219874\",\n            \"userId\": \"b55e75da-595a-4303-b6f6-889e4f41afca\",\n            \"deviceId\": \"b55e75da-595a-4303-b6f6-889e4f41afca\",\n            \"isDeleted\": 0,\n            \"status\": \"Active\",\n            \"createdAt\": \"2018-03-07T08:52:28.967Z\",\n            \"updatedAt\": \"2018-03-07T08:52:28.967Z\"\n        },\n        {\n            \"id\": \"3f6b39e8-24e1-4d2e-a1ac-e5fd76ed5897\",\n            \"brandeName\": \"test vehicle\",\n            \"model\": \"model-brezza\",\n            \"fuelType\": \"vmake\",\n            \"registrationNumber\": \"09809876543219876\",\n            \"userId\": \"b55e75da-595a-4303-b6f6-889e4f41afca\",\n            \"deviceId\": \"b55e75da-595a-4303-b6f6-889e4f41afca\",\n            \"isDeleted\": 0,\n            \"status\": \"Active\",\n            \"createdAt\": \"2018-03-07T08:26:14.441Z\",\n            \"updatedAt\": \"2018-03-07T08:26:14.441Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles"
      }
    ],
    "filename": "routes/vehicle.js",
    "groupTitle": "Vehicle"
  },
  {
    "type": "put",
    "url": "/:tenantId/vehicles/:id",
    "title": "Update Vehicle",
    "version": "1.0.0",
    "name": "UpdateVehicle",
    "group": "Vehicle",
    "description": "<p>Update Vehicle.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X PUT  --data '{\"brandName\": \"Updated vehicle\"}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles/5a2a8b63a4894865d03600a7\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "brandName",
            "defaultValue": "null",
            "description": "<p>Brand Name(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "model",
            "defaultValue": "null",
            "description": "<p>Model Name(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type",
            "defaultValue": "null",
            "description": "<p>FuelType Type(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "regitsrationNumber",
            "defaultValue": "null",
            "description": "<p>Vehicle Registration Number(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "userId",
            "defaultValue": "null",
            "description": "<p>User Id(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "deviceId",
            "defaultValue": "null",
            "description": "<p>Device Id(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "fleetId",
            "defaultValue": "null",
            "description": "<p>Fleet Id(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isRemoveDriver",
            "description": "<p>Delete driver associated with vehicle (optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isRemoveDevice",
            "description": "<p>Delete device associated with vehicle (optional).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    \t{\n\t        \"model\": \"swift\"\n      }",
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
            "field": "Unauthorized",
            "description": "<p>The token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalide request parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Bad Request\"\n}",
          "type": "json"
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
            "field": "brandName",
            "description": "<p>Vehicle Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fuelType",
            "description": "<p>Fuel Type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationNumber",
            "description": "<p>Vehicle Registartion Number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "deviceId",
            "description": "<p>Device Id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"message\": \"Success\",\n    \"data\": {\n        \"model\": \"swift\",\n        \"updatedAt\": \"2018-02-27T11:03:40.144Z\"\n    }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles/4aedcab5-9413-4219-b09f-e652df7be3b6"
      }
    ],
    "filename": "routes/vehicle.js",
    "groupTitle": "Vehicle"
  }
] });
