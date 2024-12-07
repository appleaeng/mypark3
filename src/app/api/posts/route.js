import Post from "../../../models/post";
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";

export async function POST(req) {
    const { ticket_type, ticket_price, ticket_photo, ticket_name, ticket_detail } = await req.json();
    console.log(ticket_type, ticket_price, ticket_photo, ticket_name, ticket_detail)
    await connectMongoDB();
    await Post.create({ ticket_type, ticket_price, ticket_photo, ticket_name, ticket_detail });
    return NextResponse.json({ message: "Post created"}, { status: 201 })
}

export async function GET() {
    await connectMongoDB();
    const posts = await Post.find({});
    return NextResponse.json({ posts });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket deleted" }, { status: 200 });
}
/*app.get('/api/posts', async (req, res) => {
    try {
      const posts = await Ticket.find();
      res.json({ posts });
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error });
    }
  }); */
  


/*
import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { ticket_type, ticket_price, ticket_photo, ticket_name, ticket_detail } = await req.json();
    console.log(ticket_type, ticket_price, ticket_photo, ticket_name, ticket_detail)
    await connectMongoDB();
    await Post.create({ ticket_type, ticket_price, ticket_photo, ticket_name, ticket_detail });
    return NextResponse.json({ message: "Ticket created"}, { status: 201 })
}

export async function GET() {
    await connectMongoDB();
    const posts = await Post.find({});
    return NextResponse.json({ posts });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket deleted" }, { status: 200 });
}
*/