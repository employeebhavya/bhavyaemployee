import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req) {
  const {
    fullname,
    phone,
    email,
    gender,
    age,
    degree,
    designation,
    organization,
    experience,
    elderly,
    targets,
  } = await req.json();

  try {
    await connectDB();

    const existingContact = await Contact.findOne({ phone });

    if (existingContact) {
      return NextResponse.json({ msg: ["Phone number must be unique."] });
    }

    await Contact.create({
      fullname,
      phone,
      email,
      gender,
      age,
      degree,
      designation,
      organization,
      experience,
      elderly,
      targets,
    });

    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ msg: ["Unable to send message."] });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const contacts = await Contact.find();
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ msg: ["Unable to fetch contacts."] });
  }
}

export async function PUT(req) {
  const {
    id,
    fullname,
    phone,
    email,
    gender,
    age,
    degree,
    designation,
    organization,
    experience,
    elderly,
    targets,
  } = await req.json();

  try {
    await connectDB();

    const existingContact = await Contact.findById(id);

    if (!existingContact) {
      return NextResponse.json({ msg: ["Contact not found."] });
    }

    existingContact.fullname = fullname;
    existingContact.phone = phone;
    existingContact.email = email;
    existingContact.gender = gender;
    existingContact.age = age;
    existingContact.degree = degree;
    existingContact.designation = designation;
    existingContact.organization = organization;
    existingContact.experience = experience;
    existingContact.elderly = elderly;
    existingContact.targets = targets;

    await existingContact.save();

    return NextResponse.json({
      msg: ["Contact updated successfully"],
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ msg: ["Unable to update contact."] });
  }
}
