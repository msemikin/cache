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

# POST /project/informational_requirements/searches/all

## Request
```
{  
  "projectId": 38  
}  
```

## Response
```
{  
  "id": 1,  
  "object": {  
    "id": 1,  
    "name": "some object"  
    "attrs": [{  # list of selected attrs  
      "id": 1,  
      "name": "some attribute"  
    }]  
  }  
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
{  
  "id": 1,  
  "object": {  
    "id": 1,  
    "name": "some object"  
    "attrs": [{  # list of selected attrs  
      "id": 1,  
      "name": "some attribute"  
    }]  
  }  
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
{  
  "id": 1,  
  "object": {  
    "id": 1,  
    "name": "some object"  
    "attrs": [{  # list of selected attrs  
      "id": 1,  
      "name": "some attribute"  
    }]  
  }  
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
{  
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
