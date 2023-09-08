import { Form, Link, redirect } from "react-router-dom";
import Modal from "../components/Modal";
import classes from "./NewPost.module.css";

function NewPost() {
  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="body">Create a new Post</label>
          <textarea id="body" name="body" required rows={3} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="author" required />
        </p>
        <p className={classes.actions}>
          <Link to={"/"} type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action(data) {
  const formData = await data.request.formData();

  const postData = Object.fromEntries(formData);

  const response = await fetch(
    "https://reactposter-backend.onrender.com/posts",
    {
      method: "POST",
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    console.log("Error");
  }

  return redirect("/");
}
