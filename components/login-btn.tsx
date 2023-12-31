import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex my-4">
        <p>
          <img
            className="inline-block h-10 w-10 rounded-full"
            height="25px"
            src={session.user?.image!}
          />{" "}
          {session.user?.name}
        </p>
        <div className="grow"></div>
        <button
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => signOut()}
        >
          Sign out
        </button>
        <hr />
      </div>
    );
  }
  return (
    <div className="flex my-4">
      <div className="grow"></div>
      <button
        type="button"
        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={() => signIn("worldcoin")}
      >
        Sign in
      </button>
      <hr />
    </div>
  );
}
