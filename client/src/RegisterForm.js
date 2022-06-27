import './App.css';

function RegisterForm() {
  return (
    <div className="App">
      <div className="container mt-5 login">
        <h1 className="h1-main">Register</h1>
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <form action="" method="">
                  <div className="form-group">
                    <label htmlFor="FirstName">User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="FirstName"
                      required=""
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="LastName">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      name="LastName"
                      required=""
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      required=""
                      minLength={6}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-left">
                    Register
            </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default RegisterForm;