import { NextResponse } from "next/server";

// the list of all allowed origins
const originStr = `${process.env.NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_ORIGIN.replace(
    /[\s\t\n]+/g,
    ""
)}`;
const allowedOrigins = originStr.split(",") || "*";

export async function middleware(req) {
    // retrieve the current response
    const res = NextResponse.next();
    const path = req.nextUrl.pathname;

    // retrieve the HTTP "Origin" header
    // from the incoming request
    const origin = req.headers.get("origin");

    // if the origin is an allowed one,
    // add it to the 'Access-Control-Allow-Origin' header
    if (allowedOrigins.includes(origin)) {
        res.headers.append("Access-Control-Allow-Origin", origin);
    }

    // add the remaining CORS headers to the response
    res.headers.append(
        "Access-Control-Allow-Credentials",
        process.env.NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_CREDENTIALS
    );
    res.headers.append(
        "Access-Control-Allow-Methods",
        `${process.env.NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_METHODS.replace(
            /[\s\t\n]+/g,
            ""
        )}`
    );
    res.headers.append(
        "Access-Control-Allow-Headers",
        `${process.env.NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_HEADERS.replace(
            /[\s\t\n]+/g,
            ""
        )}`
    );

    return res;
}

// specify the path regex to apply the middleware to
export const config = {
    matcher: ["/api/:path*", "/"]
};
