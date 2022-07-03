import '../../App.css';
import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const { username, password } = user;  

  const onChange = (e) => setUser({...user, [e.target.name]: e.target.value})

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    fetchData("/user/login", 
      {
       username,
       password
      }, 
      "POST")
    .then((data) => {
      if(!data.message) {
        console.log(data);

        var id = username

        fetchData("/post/viewpost",
        {
          id
        },
        "POST")
        .then((info) => {
          if(!info.message) {
            console.log(info);
            navigate("/profile", {state: {name: username, data: info}});
          }
        })
        .catch((error) => {
          console.log(error)
        })
      }
    })  
    .catch((error) => {
      console.log(error)
    })

  }

  return (
    <div className="App">
      <div className="container mt-5 login">
        <h1 className="h1-main">Login</h1>
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                  <label htmlFor="username">User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name='username'
                      onChange={onChange}
                      value={username}
                      required
                    />
                  </div>
                  <div className="form-group">
                  <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name='password'
                      onChange={onChange}
                      value={password}
                      required
                    />
                  </div>
                  <br></br>
                  <input type="submit" className="btn btn-left" value="Login"/>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default LoginForm;
