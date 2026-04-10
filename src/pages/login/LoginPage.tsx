import { useState } from "react";
import { useAuth } from "../../features/auth/auth.hooks";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { forgotPasswordAsync } from "../../features/auth/auth.slice";
import { ShowNotification } from "../../shared/ui/ShowNotification";

export function LoginPage() {
  const navigate = useNavigate();

  const { signIn, signUp, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmationPassword] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "login") {
      await signIn({ email, password });
      navigate("/");
    }

    if (mode === "register") {
      await signUp({ name, email, password, confirmPassword });
      navigate("/");
    }

    if (mode === "forgot") {
      const result = await dispatch(forgotPasswordAsync(email));

      if (forgotPasswordAsync.fulfilled.match(result)) {
        ShowNotification(
          "If this email exists, reset instructions were sent",
          "success",
        );
        setMode("login");
      } else {
        ShowNotification("Something went wrong", "error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-80 flex flex-col gap-3"
      >
        <h1 className="text-xl font-bold mb-4">
          {mode === "login" && "Login"}
          {mode === "register" && "Register"}
          {mode === "forgot" && "Reset Password"}
        </h1>

        {mode === "register" && (
          <input
            className="w-full p-2 border rounded"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {mode === "forgot" && (
          <p className="text-sm text-gray-500">
            Enter your email and we’ll send you instructions to reset your
            password.
          </p>
        )}
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {mode !== "forgot" && (
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {mode === "register" && (
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmationPassword(e.target.value)}
          />
        )}

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading && "Loading..."}
          {!loading && mode === "login" && "Login"}
          {!loading && mode === "register" && "Create Account"}
          {!loading && mode === "forgot" && "Send Reset Link"}
        </button>
        <div className="mt-4 flex justify-between text-sm">
          {mode === "login" && (
            <>
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setMode("register")}
              >
                No account? Register
              </span>

              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setMode("forgot")}
              >
                Forgot password?
              </span>
            </>
          )}

          {mode === "register" && (
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setMode("login")}
            >
              Have account? Login
            </span>
          )}

          {mode === "forgot" && (
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setMode("login")}
            >
              ← Back to login
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
