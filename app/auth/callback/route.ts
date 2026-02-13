// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get("code");

//   if (!code) {
//     return NextResponse.redirect(`${origin}/auth`);
//   }

//   const supabase = await createClient();
//   const { error } = await supabase.auth.exchangeCodeForSession(code);

//   if (error) {
//     return NextResponse.redirect(`${origin}/auth?error=auth_callback`);
//   }

//   const { data: userData } = await supabase.auth.getUser();
//   const role =
//     (userData.user?.app_metadata?.role as string | undefined) ??
//     (userData.user?.user_metadata?.role as string | undefined);

//   if (role === "clinician") {
//     return NextResponse.redirect(`${origin}/clinician`);
//   }

//   if (role === "admin") {
//     return NextResponse.redirect(`${origin}/admin`);
//   }

//   return NextResponse.redirect(`${origin}/patient`);
// }
