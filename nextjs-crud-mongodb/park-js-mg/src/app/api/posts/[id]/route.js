import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const post = await Post.findOne({ _id: id });
    return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { newticket_type: ticket_type, newticket_price: ticket_price, newticket_photo: ticket_photo, newticket_name: ticket_name, newticket_detail: ticket_detail } = await req.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, { ticket_type, ticket_price, ticket_photo, ticket_name, ticket_detail });
    return NextResponse.json({ message: "Post updated" }, { status: 200 });
}

/*
import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const post = await Post.findOne({ _id: id });
    return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { newticket_type: ticket_type, newticket_price: ticket_price, newticket_photo: ticket_photo, newticket_name: ticket_name, newticket_detail: ticket_detail } = await req.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, { ticket_type, ticket_price, ticket_photo, ticket_name, ticket_detail });
    return NextResponse.json({ message: "Post updated" }, { status: 200 });
}

    */
