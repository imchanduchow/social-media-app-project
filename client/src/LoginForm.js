import './App.css';

function LoginForm() {
  return (
    <div className="App">
      <div className="container mt-5 login">
        <h1 className="h1-main">Login</h1>
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <form action="" method="">
                  <div className="form-group">
                    <label for="UserId">Email</label>
                    <input type="text" className="form-control" name="UserId" required></input>
                  </div>
                  <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" name="password" required minlength="6"></input>
                  </div>
                  <br></br>
                  <button type="submit" className="btn btn-left">Log In</button>
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
