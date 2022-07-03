import '../../App.css';
import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';

const Profile = (props) => {
    const location = useLocation();
    var arr = [];
    for(var k = 0; k < Object.keys(location.state.data).length; k++) {
        arr.push(location.state.data[k].content);
    }

    const navigate = useNavigate();
    const [post, setPost] = useState({
        content: ''
      });
    
      const {content} = post;  
    
      const onChange = (e) => setPost({...post, [e.target.name]: e.target.value})
    
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
          if(!data.message) {
            console.log(data)
            var id = username
            fetchData("/post/viewpost",
        {
          id
        },
        "POST")
        .then((info) => {
          if(!info.message) {
            navigate("/profile", {state: {name: location.state.name, data: info}});
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
            <h1>{location.state.name}</h1>
            <h2>Your Posts</h2>
            {arr.map(cont => (  
            <li>{cont}<br /></li>  
            ))} 
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
                  <input type="submit" className="btn btn-left" value="Submit"/>
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