# MEsicChart-server API docs

- /signup

body 이름을 아래 형식으로해서 post 요청을 한다.

``` js
 body = {
          name: '페이커',
          email: 'faker@gmail.com',
          password: '******'
        }          
 
 output = {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTkwMDQ2NTI0LCJleHAiOjE1OTAxMzI5MjR9.8aCK7F4j16IrwzrPZ0tt5_RPpW1FgL6pD6_rqY373pg"
  }

```
성공적이면 201 헤더와 토큰을 넘겨받는다 
존재하는 아이디면 404 end Nonexistent user

- /signin

body 이름을 아래 형식으로 post 요청을 한다.

``` js
 body = {
          email: 'faker@gmail.com',
          password: '******'
        }     

 output = {
    "token": "eyJhbGciOiJPZzIJJNiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTkHJJMDQ2NTI0LCJleHAiOjE1OTAxMzI5MjR9.8aCK7F4j16IrwzrPZ0tt5_OFpW1FgL6pD6_rqY373pg"
}

```

성공적이면 201 헤더와 토큰을 넘겨받는다 
존재하는 아이디면 404 end Nonexistent user

