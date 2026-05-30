export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: ["/dashboard/:path*", "/my-courses/:path*", "/profile/:path*", "/notifications/:path*"],
};
