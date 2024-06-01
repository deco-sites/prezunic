import { Person } from "apps/commerce/types.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  user?: Person | null;
  variant?: "preview" | "full";
}

function Login({ user, variant }: Props) {
  if (variant === "preview" || !user) {
    return (
      <a
        class="btn btn-sm btn-ghost font-thin no-animation"
        href="/login"
        aria-label="Login"
      >
        <Icon id="myaccount" size={20} strokeWidth={0.4} class="text-primary" />
        <span class="text-base-300 font-semibold">Minha conta</span>
      </a>
    );
  }

  return (
    <a
      class="btn btn-sm btn-ghost font-thin no-animation"
      href="/account"
      aria-label="Account"
    >
      <Icon id="myaccount" size={20} strokeWidth={0.4} class="text-primary" />
      <span>ACCOUNT</span>
    </a>
  );
}

export default Login;
