"use client"
import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      console.log(session);
    }
  }, [session, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.email || "No email available"} <br />
        <button onClick={() => signOut()} className="btn btn-danger">
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()} className="btn btn-primary">
        Sign in
      </button>
    </>
  );
}
