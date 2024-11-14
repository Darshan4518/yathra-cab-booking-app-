import { neon } from "@neondatabase/serverless";

export async function POST(req: Request) {
  try {
    const sql = neon(process.env.DATABASE_URI!);
    console.log("Database connection initialized.");
    const { name, email, clerkId } = await req.json();
    console.log("Request Body:", { name, email, clerkId });

    // Validate request body
    if (!name || !email || !clerkId) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Please fill in all fields",
        }),
        { status: 400 }
      );
    }

    // Insert user into the database
    const response = await sql`
    INSERT INTO users (name, email, clerkId)
    VALUES (${name}, ${email}, ${clerkId})
    RETURNING *;
  `;
    console.log("Insert Response:", response);

    // Send success response
    return new Response(
      JSON.stringify({
        status: "success",
        data: response[0],
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: error.message || "Failed to create user",
      }),
      { status: 500 }
    );
  }
}
