// inside src/App.js
// Replace previous code with this.

import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
	const { register, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = (data) => console.log(data);

	return (
		<>
			<p className="title">Sign Up</p>

			<form className="App" onSubmit={handleSubmit((data)=>onSubmit(data))}>
				<label htmlFor = "email"> Email:</label>
				<input type="email" {...register("email", { required: true })} />
				{errors.email && <span style={{ color: "red" }}>
					*Email* is mandatory </span>}
        <label htmlFor = "email"> Password:</label>
				<input type="password" {...register("password")} />
				<input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
			</form>
		</>
	);
}
export default App;
