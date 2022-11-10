import React from 'react';

export default function Login() {
  return (
    <form
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="mb-3">
        <label htmlFor="title-input" className="block mar-b-1">
          Login
          <input name="email" type="email" className="block w-100 no-outline no-border pad-1 mar-b-2" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="title-input" className="block mar-b-1">
          Password
          <input name="password" type="password" className="block w-100 no-outline no-border pad-1 mar-b-2" id="exampleInputPassword1" />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}
