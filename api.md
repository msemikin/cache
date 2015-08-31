# POST /project/objects/byId

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

# POST /project/objects/new (ТАКЖЕ И ДЛЯ АПДЕЙТА)

## Request
```
data : {
				projectId : 1,
				objekt : JSON.stringify({
					name : "some object",
					attrs : [ {
						name : "some attribute"
					} ]
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

# POST /project/attribute/new (ТАКЖЕ И ДЛЯ АПДЕЙТА)

## Request
```
data : {
				projectId : 1,
				objectId : 1,
				attribute : JSON.stringify({
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

# POST /project/objects/update
### тоже самое для остальных запросов 
## Request
```
{
  "projectId": 1,
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

## Response
```
{
	"id": 1,
	"success": true
}
```
-----------------------------------------------------


# POST /project/objects/delete

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
		}			
		]	
    }]  
  }]  
}  
```

-----------------------------------------------------
# POST /project/statistics/new

## Request
```
data : {  
  "projectId": 38,
  "statistic": JSON.stringify({  
    "id": 1,  
    "name": "some name",  
    "objects": [{  
		"name": "some name",
		"attrs": [{
			"id":"1",
			"name":"attribute's name"
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

# POST /project/reports/all

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

# POST /project/reports/new

## Request
```
data : {  
  "projectId": 38,
  "reports": JSON.stringify({  
    "id": 1,  
    "name": "some name",  
    "objects": [{  
		"name": "some name",
		"attrs": [{
			"id":"1",
			"name":"attribute's name"
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

# POST /project/diagrams/usecase

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

# POST /project/diagrams/usecase/new

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

# POST /project/informational_requirements/searches/all

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

# POST /project/informational_requirements/searches/new

## Request
```
{  
  "projectId": 38,
  "search": {
	  "object": {  
	    "id": 1,  
	    "name": "some object"  
	    "attrs": [{  # list of selected attrs  
	      "id": 1,  
	      "name": "some attribute"  
	    }]  
	  }
  }
}  
```

## Response
```
{  
  "success": true,
  "id": "1"
}  
```


-----------------------------------------------------

# POST /project/informational_requirements/sorts/all

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

# POST /project/informational_requirements/sorts/new

## Request
```
{  
  "projectId": 38,
  "sort": {
	  "object": {  
	    "id": 1,  
	    "name": "some object"  
	    "attrs": [{  # list of selected attrs  
	      "id": 1,  
	      "name": "some attribute"  
	    }]  
	  }
  }
}  
```

## Response
```
{  
  "success": true,
  "id": "1"
}  
```

-----------------------------------------------------

# POST /project/informational_requirements/filters/all

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

# POST /project/informational_requirements/filters/new

## Request
```
{  
  "projectId": 38,
  "filter": {
	  "object": {  
	    "id": 1,  
	    "name": "some object"  
	    "attrs": [{  # list of selected attrs  
	      "id": 1,  
	      "name": "some attribute"  
	    }]  
	  }
  }
}  
```

## Response
```
{  
  "success": true,
  "id": "1"
}  
```

-----------------------------------------------------

# POST /project/algorithmic_dependencies/all

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

# POST /project/algorithmic_dependencies/new

## Request
```
{  
  "projectId": 38,
  "algorithmicDependincy{  
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
  }  
}  
```

## Response
```
{  
  "success": true,
  "id": "1"
}  
```
-----------------------------------------------------

# POST /project/integrity_constraints/all

## Request
```
{  
  "projectId": 38  
}  
```

## Response

### Скоро заполню
