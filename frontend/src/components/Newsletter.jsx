import { useState } from "react";
import { subscribe } from "../api";
import Reveal from "./Reveal";
import RollText from "./RollText";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const res = await subscribe(email);
      setStatus({ state: "done", message: res.message });
      setEmail("");
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  };

  return (
    <section className="newsletter">
      <Reveal as="h2" className="h2" text="Get 10% off your first order." />
      <form className={`newsletter__form is-${status.state}`} onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Your email address"
          aria-label="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <RollText
          as="button"
          type="submit"
          className="btn"
          text={status.state === "loading" ? "Sending…" : "Subscribe"}
          disabled={status.state === "loading"}
        />
        <span className="newsletter__msg" role="status">{status.message}</span>
      </form>
    </section>
  );
}
