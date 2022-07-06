import '../../App.css';
import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { useContext } from "react";
import UserContext from "../../Context/userContext.js";

const Profile = (props) => {
  const { user } = useContext(UserContext);

  const location = useLocation();
  var arr = [];
  for (var k = 0; k < Object.keys(location.state.data).length; k++) {
    arr.push({ cont: location.state.data[k].content, _id: location.state.data[k]._id });
  }

  const navigate = useNavigate();
  const [post, setPost] = useState({
    content: ''
  });

  const { content } = post;

  const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    const username = location.state.name;
    fetchData("/post/create",
      {
        username,
        content
      },
      "POST")
      .then((data) => {
        if (!data.message) {
          console.log(data)
          var id = username
          fetchData("/post/viewpost",
            {
              id
            },
            "POST")
            .then((info) => {
              if (!info.message) {
                setPost({content: ''});
                navigate("/profile", { state: { name: location.state.name, data: info } });
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

  const deletePost = (e) => {
    var pid = e.target.value;
    console.log(e.target.value);
    fetchData("/post/delete",
      {
        pid
      },
      "DELETE")
      .then((data) => {
        if (!data.message) {
          console.log(data);
          var id = location.state.name;
          fetchData("/post/viewpost",
            {
              id
            },
            "POST")
            .then((info) => {
              if (!info.message) {
                navigate("/profile", { state: { name: location.state.name, data: info } });
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
    <div>
      <h1>Hi, {user.username}</h1>
      <h2>Your Posts</h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Content</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {arr.map(post => (
            <tr>
              <td>{post.cont}</td>
              <td><button className="btn btn-dark btn-left" id="post_del" name="post_del" value={post._id} onClick={deletePost}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container mt-5 login">
        <h1 className="h1-main">Create New Post</h1>
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                      className="form-control"
                      id="content"
                      name='content'
                      onChange={onChange}
                      value={content}
                      required>
                    </textarea>
                  </div>
                  <br></br>
                  <input type="submit" className="btn btn-left" value="Submit" />
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

export default Profile;