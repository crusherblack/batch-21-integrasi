import { useEffect, useState } from "react";
import axios from "axios";

const UseEffect = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  //default //3 //dijalankan setelah render
  //componentDidMount dan componentDidUpdate
  /*   useEffect(() => {
    console.log("useEffect componentDidMount dan componentDidUpdate");
  }); //ketika kita ingin melakukan perubahan pada component kalau ada component yang terupdate
 */
  const getPosts = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setPosts(response.data));
  };

  const getPosts2 = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((result) => console.log(result));
  };

  useEffect(() => {
    console.log("useEffect componentDidMount");
    getPosts();
  }, []); //fetching data dari API

  useEffect(() => {
    if (search === "") {
      getPosts();
    }

    const filteredPosts = posts.filter((post) => {
      return post.title.includes(search) || post.body.includes(search);
    });

    setPosts(filteredPosts);
  }, [search]);

  useEffect(() => {
    console.log(
      "useEffect componentDidMount menggunakan dependencies injector"
    );
  }, [isVisible, count]); //fetching data dari API

  return (
    <div>
      <h1>ini adalah list post</h1>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Input your search keywords here..."
          />
        </div>
      </form>
      <ul>
        {posts.map((post, index) => (
          <li>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {index + 1} | {post.title}
            </p>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {isVisible && <h1>AKU TAMPIL</h1>}
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        style={{
          display: "block",
          marginBottom: "10px",
        }}
      >
        Buka Tutup
      </button>
      <h1>ini adalah use effect {count}</h1>
      <div>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          style={{
            display: "block",
            marginBottom: "10px",
          }}
        >
          increament
        </button>
        <button onClick={() => setCount((prev) => prev - 1)}>decreament</button>
      </div>
    </div>
  ); //2
};

export default UseEffect;
