import { z, ZodType } from "zod";
import styles from "./AdminLogin.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AdminLogin = () => {
  type FormData = {
    username: string;
    password: string;
  };

  const formSchema: ZodType<FormData> = z.object({
    username: z
      .string()
      .min(4, { message: "username must be atleast 4 characters long" })
      .max(10, { message: "username must be less than 11 characters" }),
    password: z
      .string()
      .min(8, { message: "password must be atleast 8 characters long" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const submitHandler = (data: FormData) => {
    console.log("data: ", data);
  };
  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <label htmlFor="username">UserName</label>
        <input
          type="text"
          id="username"
          // name="username"
          className={styles.input}
          {...register("username")}
        />
        {errors?.username && (
          <p className={styles.error}>{errors?.username.message}</p>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          // name="password"
          className={styles.input}
          {...register("password")}
        />
        {errors?.password && (
          <p className={styles.error}>{errors?.password.message}</p>
        )}
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};
export default AdminLogin;
