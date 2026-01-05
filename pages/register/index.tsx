"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RegisterModel from "../RegisterModel";


export default function CreateAccountPage() {
  const router = useRouter();
  const [model, setModel] = useState(true);
  return (
    <RegisterModel open={model} handleClose={() => router.back()} />
  )
}