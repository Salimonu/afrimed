import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

function createSupabaseClient(request: NextRequest, response: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          response.cookies.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );
}

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createSupabaseClient(request, response);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const redirectUrl = new URL("/auth", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  const role =
    (user.app_metadata?.role as string | undefined) ??
    (user.user_metadata?.role as string | undefined);

  const pathname = request.nextUrl.pathname;
  const isPatientRoute = pathname.startsWith("/patient");
  const isClinicianRoute = pathname.startsWith("/clinician");
  const isAdminRoute = pathname.startsWith("/admin");

  if (!role) {
    const redirectUrl = new URL("/auth", request.url);
    redirectUrl.searchParams.set("error", "missing_role");
    return NextResponse.redirect(redirectUrl);
  }

  if (
    (isPatientRoute && role !== "patient") ||
    (isClinicianRoute && role !== "clinician") ||
    (isAdminRoute && role !== "admin")
  ) {
    const redirectUrl = new URL("/auth", request.url);
    redirectUrl.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/patient/:path*", "/clinician/:path*", "/admin/:path*"],
};
