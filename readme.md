CC18 Fakebook api
---
### env guide
PORT=8899
DATABASE="mysql://u:pw@localhost:3306/cc18_fakebook"
JWT_SECRET

CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

---
### service 

|method |path |authen | params | query | body |
|:----- |:--- |:----:  |:------ |:----- |:---- |
|post|/auth/register|-|-|-|{ identity,firstName, lastName, password, confirmPassword }
|post|/auth/login|-|-|-|{ identity, password }
|get|/auth/me|y|-|-|-|
|get|/post|y|-|-|-|
|post|/post|y|-|-|{message, image(file)}
|put|/post|y|:id|-|{message, image(file)}
|delete|/post|y|:id|-|-
|post|/comment|y|-|-|{message, postId} 
|post|/like|y|-|-|{postId}
|delete|/like|y|:id|-|-


---
## Note
## create route & controller for /post (16:10)






