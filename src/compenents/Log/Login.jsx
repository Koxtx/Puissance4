import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { signin } from "../../apis/users";
import { UserContext } from "../../context/UserContext";
import styles from "./Login.module.scss"

export default function Login() {
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const { setConnectedUser } = useContext(UserContext);

  const schema = yup.object({
    username: yup.string().required("Le champ est obligatoire"),
    password: yup.string().required("Le mot de passe est obligatoire"),
  });

  const defaultValues = {
    username: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  async function submit(values) {
    // console.log(values);
    try {
      const response = await signin(values);
      // console.log(response);
      if (!response.message) {
        localStorage.setItem("user", JSON.stringify(response));
        setConnectedUser(response.user);
        setFeedback("Connexion réussie");
        navigate("/");
        reset(defaultValues);
      } else {
        setFeedback(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="d-flex center flex-column flex-fill">
      <form className="d-flex flex-column" onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb-10">
          <label htmlFor="username" className="mb-10">
            Pseudo
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            className="mb-10"
          />
          {errors.username && (
            <p className="text-error">{errors.username.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb-10">
          <label htmlFor="password" className="mb-10">
            Mot de passe
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="mb-10"
          />
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>
        <NavLink to="/register" className="mb-20 feedbackText">
          Pas encore inscrit ?
        </NavLink>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
