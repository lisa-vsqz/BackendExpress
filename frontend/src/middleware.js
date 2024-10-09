// middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // Autoriza si hay un token presente
  },
  pages: {
    signIn: "/auth/signin", // Redirigir a la página 
  },
});

//  rutas que se protegerán
export const config = { matcher: ['/userscrud/:path*'] };
 