# POST ../DreamTeamProj/project/objects/byId

## Request
```
{  
  "projectId": 38,
  "objectId": 1
} 
```

## Response
```
{
  "object": {  
    "id": 1,  
    "name": "some object",  
    "attrs": [{  
      "id": 2,  
      "name": "some attribute"  
    }]  
  }  
}  
```

-----------------------------------------------------
# POST /project/objects/all

## Request
```
{  
  "projectId": 38  
} 
```

## Response
```
{
  "objects": [{  
    "id": 1,  
    "name": "some object",  
    "attrs": [{  
      "id": 2,  
      "name": "some attribute"  
    }]  
  }]  
}  
```

-----------------------------------------------------

# POST /project/objects/new (ТАКЖЕ И ДЛЯ АПДЕЙТА) //тестил

## Request
```
{
	objeсt : JSON.stringify({
		projectId : 1,
		name : "some object"
	})
},
```

## Response
```
{
	"id": 1,
	"success": true
}
```

-----------------------------------------------------
-----------------------------------------------------

# POST /project/attribute/new (ТАКЖЕ И ДЛЯ АПДЕЙТА) //тестил

## Request
```
{
	attribute : JSON.stringify({
		projectId : 1,
		objectId : 1,
		name : "some attribute"
	})
}
```

## Response
```
{
	"id": 1,
	"success": true
}
```

-----------------------------------------------------

# POST /project/objects/update (тестил, при апдейте объекта атрибут мне не нужен, используй апдейт атрибута)
### тоже самое для остальных запросов 
## Request
```
{
	objeсt : JSON.stringify({
		"projectId" : 0,
		"id" : 1,
		"name" : "some dsfsobject"
	})
}
```

## Response
```
{
	"id": 1,
	"success": true
}
```
-----------------------------------------------------


# POST /project/attribute/update (нужен айдишник атрибута для апдейта) //тестил
```
data : {
			attribute : JSON.stringify({
				id:2,
				objectId : 1,
				name : "some attribute"
			})
		},
```

## Response
```
{
	"id": 1,
	"success": true
}
```
-----------------------------------------------------
# POST /project/attribute/delete (нужен айдишник атрибута для апдейта) //тестил
```
data : {
			attributeId:2			
		},
```

## Response
```
{
	"id": 1,
	"success": true
}
```
-----------------------------------------------------


# POST /project/objects/delete // тестил

### тоже самое для остальных запросов (удаление по адйи проекта и айди элемента)

## Request
```
{
  "projectId": 1,
  "objectId": 1  
}  
```

## Response
```
{
	"success": true
}
```

-----------------------------------------------------
# POST /project/statistics/all

## Request
```
{  
  "projectId": 38  
}  
```

## Response
```
{  
  "statistics": [{  
    "id": 1,  
    "name": "some name",  
    "objects": [{  
		"name": "some name",
		"attrs": [{
			"id":"1",
			"name":"attribute's name"
		}]	
    }]  
  }]  
}  
```

-----------------------------------------------------
# POST /project/statistics/new

## Request
```
{
	"statistic" : JSON.stringify({
		"projectId" : 0,
		"name" : "some name",
		"objects" : [{
			id : 2,
			attrs: [{
				id: 1
			}]
		}]
	})
} 
```

## Response
```
{
	"id": 1,
	"success": true
}
```
-----------------------------------------------------
# POST /project/statistics/delete //тестил

## Request
```
{
	"projectId": 0,
	"statisticId": 8
}  
```

## Response
```
{
	"id": 1,
	"success": true
}
```
-----------------------------------------------------
# POST /project/statistics/update

## Request
```
data : {
	"statistic" : JSON.stringify({
		"projectId" : 0,
		"id":2,
		"name" : "some name",
		"objects" : [{
			id : 3,
			attrs: [{
				id: 2
			}]
		}]
	})
},
```

## Response
```
{
	"id": 1,
	"success": true
}
```
-----------------------------------------------------

# POST /project/reports/all //тестил

## Request
```
{  
  "projectId": 38  
}  
```

## Response (same as statistics)
```
{  
  "reports": [{  
    "id": 1,  
    "name": "some name",  
    "objects": [{
        "id": "1"
		"name": "some name",
		"attrs": [{
			"id":"1",
			"name":"attribute's name"
		}			
		]	
    }]  
  }]  
}  
```

-----------------------------------------------------

# POST /project/reports/new //тестил

## Request
```
data : {  
  "reports": JSON.stringify({ 
	"projectId": 38,  
    "name": "some name",  
    "objects": [{  
		id : 1,
		"attrs": [{
			"id":"1"
		}			
		]	
    }]  
  }) 
} 
```

## Response
```
{
	"id": 1,
	"success": true
}
```

-----------------------------------------------------
# POST /project/reports/delete //тестил

## Request
```
data : {
				"projectId" : 0,
				"reportId":5

		},  
```

## Response
```
{
	"id": 1,
	"success": true
}
```

-----------------------------------------------------
# POST /project/reports/update //тестил

## Request
```
data : {  
  "reports": JSON.stringify({
	"id" : 4
	"projectId": 0,  
    "name": "some name",  
    "objects": [{  
		id : 7,
		"attrs": [{
			"id":"2"
		}			
		]	
    }]  
  }) 
}, 
```

## Response
```
{
	"id": 1,
	"success": true
}
```

-----------------------------------------------------

# POST /project/diagrams/usecase //tested (принцип работает для всех остальных)

## Request
```
{  
  "projectId": 38  
}  
```

## Response
```
{  
  "diagram": {} # diagram JSON  
}  
```

-----------------------------------------------------

# POST /project/diagrams/usecase/new // тестил (принцип работает для всех остальных)

## Request
```
{  
  "projectId": 38,
  "diagram": {} # diagram JSON  
}  
```

## Response
```
{
	"id": 1,
	"success": true
}
```

-----------------------------------------------------
# POST /project/diagrams/usecase/delete // тестил (принцип работает для всех остальных)

## Request
```
{  
  "projectId": 0,
  "diagramId": 5 
}  
```

## Response
```
{
	"id": 1,
	"success": true
}
```

-----------------------------------------------------
# POST /project/diagrams/usecase/update // тестил (принцип работает для всех остальных)

## Request
```
{  
  "diagramId": 0,
  "diagram": {}  
}  
```

## Response
```
{
	"id": 1,
	"success": true
}
```

-----------------------------------------------------

# POST /project/diagrams/object_relations

## Request
```
{  
  "projectId": 38  
}  
```

## Response
```
{  
  "diagram": {} # diagram JSON  
}  
```

-----------------------------------------------------

# POST /project/diagrams/object_relations/new

## Request
```
{  
  "projectId": 38,
  "diagram": {} # diagram JSON  
}  
```

## Response
```
{
	"id": 1,
	"success": true
}
```

-----------------------------------------------------

# POST /project/diagrams/er

```
## Request
{  
  "projectId": 38  
}  
```

## Response
```
{  
  "diagram": {} # diagram JSON  
}  
```

-----------------------------------------------------

# POST /project/diagrams/er/new

## Request
```
{  
  "projectId": 38,
  "diagram": {} # diagram JSON  
}  
```

## Response
```
{
	"id": 1,
	"success": true
}
```
-----------------------------------------------------

# POST /project/informational_requirements/searches/all //тестил

## Request
```
{  
  "projectId": 38  
}  
```

## Response
```
[{  
  "id": 1,  
  "object": {  
    "id": 1,  
    "name": "some object"  
    "attrs": [{  # list of selected attrs  
      "id": 1,  
      "name": "some attribute"  
    }]  
  }  
}]  
```
-----------------------------------------------------
# POST /project/informational_requirements/searches/new //тестил

## Request
```
data : {
			  "search": JSON.stringify({
				  "projectId": 38,
			      "object": {  
			        "id": 1,
			        "attrs": [{   
			          "id": 1 
			        }]  
			      }
			  })
		}, 
```

## Response
```
{  
  "success": true,
  "id": "1"
}  
```


-----------------------------------------------------
# POST /project/informational_requirements/searches/delete //тестил (для сортировки и фильтров тоже)

## Request
```
data : {
		id : 3
		}, 
```

## Response
```
{  
  "success": true,
  "id": "1"
}  
```


-----------------------------------------------------
# POST /project/informational_requirements/searches/update //тестил (для сортировки и фильтров тоже)

## Request
```
data : {
			  "search": JSON.stringify({
					"id": 5
				  "projectId": 0,
			      "object": {  
			        "id": 1,
			        "attrs": [{   
			          "id": 1 
			        }]  
			      }
			  })
		},  
```

## Response
```
{  
  "success": true,
  "id": "1"
}  
```


-----------------------------------------------------

# POST /project/informational_requirements/sorts/all //тестил

## Request
```
{  
  "projectId": 38  
}  
```

## Response
```
[{  
  "id": 1,  
  "object": {  
    "id": 1,  
    "name": "some object"  
    "attrs": [{  # list of selected attrs  
      "id": 1,  
      "name": "some attribute"  
    }]  
  }  
}]  
```

# POST /project/informational_requirements/sorts/new //тестил

## Request
```
data : {
			  "sort": JSON.stringify({
				  "projectId": 38,
			      "object": {  
			        "id": 1,
			        "attrs": [{  
			          "id": 1 
			        }]  
			      }
			  })
		},  
```

## Response
```
{  
  "success": true,
  "id": "1"
}  
```

-----------------------------------------------------

# POST /project/informational_requirements/filters/all //тестил

## Request
```
{  
  "projectId": 38  
}  
```

## Response
```
[{  
  "id": 1,  
  "object": {  
    "id": 1,  
    "name": "some object"  
    "attrs": [{  # list of selected attrs  
      "id": 1,  
      "name": "some attribute"  
    }]  
  }  
}]  
```

# POST /project/informational_requirements/filters/new //тестил

## Request
```
data : {
			  "filter": JSON.stringify({
				  "projectId": 38,
			      "object": {  
			        "id": 1,  
			        "attrs": [{  # list of selected attrs  
			          "id": 1
			        }]  
			      }
			  })
		},  
```

## Response
```
{  
  "success": true,
  "id": "1"
}  
```

-----------------------------------------------------

# POST /project/algorithmic_dependencies/all //tested ответ сервера отличается от этого (смотри вставку зависимости)

## Request
```
{  
  "projectId": 38  
}  
```

## Response
```
[{  
  "id": 1,  
  "resultField": { # attribute that will be influenced  
    "object": {  
      "id": 1,  
      "name": "some object"  
      "attr": {    
        "id": 1,  
        "name": "some attribute"  
      }  
    }  
  },  
  "sourceFields": [{  # attribute that will be part of a formula    
    "variable" : "X",  
    "object": {  
      "id": 1,  
      "name": "some object"  
      "attr": {   
        "id": 1,  
        "name": "some attribute"  
      }  
    }  
  }],  
  "formula": "X + Y"  
}]  
```

-----------------------------------------------------

# POST /project/algorithmic_dependencies/new //tested 

## Request
```
data : {
			"algorithmicDependincy" : JSON.stringify({
				"projectId" : 38,
				"name" :"myBestName",
				"resultField" : {
					"id" : 1,
					"attr" : {
						"id" : 1
					}
				},
				"sourceFields" : [ {
					"variable" : "X",
					"object" : {
						"id" : 1,
						"attr" : {
							"id" : 1
						}
					}
				}, {
					"variable" : "Y",
					"object" : {
						"id" : 1,
						"attr" : {
							"id" : 1
						}
					}
				} ],
				"formula" : "X + Y"
			})
		},
```

## Response
```
{  
  "success": true,
  "id": "1"
}  
```
-----------------------------------------------------

# POST /project/algorithmic_dependencies/update //tested 

## Request
```
data : {
	id : 3
			},
```

## Response
```
{  
  "success": true,
  "id": "1"
}  
```
-----------------------------------------------------
# POST /project/algorithmic_dependencies/update //tested 

## Request
```
data : {
					"algorithmicDependincy" : JSON.stringify({
						"id":8,
						"projectId" : 0,
						"name" :"myBestName",
						"resultField" : {
							"id" : 3,
							"attr" : {
								"id" : 3
							}
						},
						"sourceFields" : [ {
							"fieldId" : 11,
							"variable" : "W",
							"object" : {
								"id" : 3,
								"attr" : {
									"id" : 3
								}
							}
						}, {
							"fieldId" : 12,
							"variable" : "e",
							"object" : {
								"id" : 3,
								"attr" : {
									"id" : 3
								}
							}
						} ],
						"formula" : "X + Y"
					})
				},
```

## Response
```
{  
  "success": true,
  "id": "1"
}  
```
-----------------------------------------------------

-----------------------------------------------------

# POST /project/integrity_constraints/attributes/all //работает

## Request
```
{  
  "projectId": 38  
}  
```

## Response

```
{
	"constraints": [{
		"id": "1",
		"object": {
			"id": "1",
			"name": "",
			"attr": {
				"id": "1",
				"name": ""
			}
		},
		"comment": "some comment"
	}]
}
```
-----------------------------------------------------

# POST /project/integrity_constraints/attributes/new //работает

## Request
```
{  
  
 data : {
			"constraint" : JSON.stringify({
				"projectId" : 0,
				"object" : {
					"id" : "7",
					"name" : "",
					"attr" : {
						"id" : "4",
						"name" : ""
					}
				},
				"comment" : "some comment"
			})
		},
}  
```

## Response

```
{
	"success": true,
	"id": 1
}
```
-----------------------------------------------------

# POST /project/integrity_constraints/attributes/update //работает

## Request
```
data : {
			"constraint" : JSON.stringify({
				"projectId" : 0,
				"id":2,
				"object" : {
					"id" : "7",
					"name" : "",
					"attr" : {
						"id" : "3",
						"name" : ""
					}
				},
				"comment" : "some comment"
			})
		},
```

## Response

```
{
	"success": true
}
```
-----------------------------------------------------
# POST /project/integrity_constraints/attributes/delete //работает

## Request
```
data : {
				"id":2
			})
		},
```

## Response

```
{
	"success": true
}
```
-----------------------------------------------------

# POST /project/integrity_constraints/links/all //работает

## Request
```
{  
  "projectId": 38  
}  
```

## Response

```
{
	"constraints": [{
		"id": "1",
		"firstObject": {
			"id": "1",
			"name": "",
		},
		"secondObject": {
			"id": "2",
			"name": ""
		},
		"comment": "some comment"
	}]
}
```
-----------------------------------------------------

# POST /project/integrity_constraints/links/new //

## Request
```
data : {
					constraint : JSON.stringify({
						"projectId":0,
						"firstObject": {
							"id": "2",
							"name": "",
						},
						"secondObject": {
							"id": "3",
							"name": ""
						},
						"comment": "some comment"
					})
				},
```

## Response

```
{
	"success": "true",
	"id": "1"
}
```
-----------------------------------------------------
# POST /project/integrity_constraints/links/delete //работает

## Request
```
data : {
				"id":2
		},
```

## Response

```
{
	"success": true
}
```
-----------------------------------------------------

# POST /project/integrity_constraints/links/update //работает

## Request
```
  data : {
					constraint : JSON.stringify({
						"projectId":0,
						id : 2,
						"firstObject": {
							"id": "2",
							"name": "",
						},
						"secondObject": {
							"id": "3",
							"name": ""
						},
						"comment": "some comment"
					})
				},
 
```

## Response

```
{
	"success": "true",
}
```
-----------------------------------------------------
# POST /project/actors/new

## Request
```
data : {
			actor : JSON.stringify({
						"actorName":"Имя актера",
						"projectId": 0
					})
				},
		},
```

## Response

```
{
	"success": true
}
```
-----------------------------------------------------
# POST /project/actors/update

## Request
```
data : {
			actor : JSON.stringify({
						"actorId":1,
						"actorName":"Имя актера",
						"projectId": 0
					})
				},
		},
```

## Response

```
{
	"success": true
}
```
-----------------------------------------------------
# POST /project/actors/delete

## Request
```
data : {
			"id":2
		},
```

## Response

```
{
	"success": true
}
```
-----------------------------------------------------
# POST /project/actors/all

## Request
```
data : {
			"projectId":0
		},
```

## Response

```
{
	А ФИГ ЕГО ЧТО ОН ВЕРНЕТ - Я НЕ ЗНАЮ) 
}
```
-----------------------------------------------------
# POST /project/links/new 

## Request
```
data : {
			link : JSON.stringify({
						"firstObjName": {
							"id": "2"
						},
						"seondObjName": {
							"id": "3"
						},
						"linkType" : "1:M"||"M:1"||"M:M"||"1:1",
						"comment" (optional):"",
						"projectId":0
			});
		},
```

## Response

```
{
	"success": true
}
```
-----------------------------------------------------
# POST /project/links/update

## Request
```
data : {
			link : JSON.stringify({
						"linkId":1,
						"firstObjName": {
							"id": "2"
						},
						"seondObjName": {
							"id": "3"
						},
						"linkType" : "1:M"||"M:1"||"M:M"||"1:1",
						"comment" (optional):"",
						"projectId":0
			});
		},
```

## Response

```
{
	"success": true
}
```
-----------------------------------------------------
# POST /project/links/delete

## Request
```
data : {
			"linkId":0
		},
```

## Response

```
{
	"success": true
}
```
-----------------------------------------------------
# POST /project/links/all

## Request
```
data : {
			"projectId":0
		},
```

## Response

```
{
	"success": true
}
```
-----------------------------------------------------

## POST /project/document/generate

```

### Request

{
	"projectId": 0,
	"useCase": "binary PNG",
	"objectRelation": "binary PNG",
	"er": "binary PNG"
	
}

### Response


{
	"success": true # не знаю что тут
}
