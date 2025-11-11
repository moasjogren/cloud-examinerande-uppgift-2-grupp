"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEntriesStore } from "../zustand/entiresStore";
import Header from "@/components/Header";

export default function EditEntryPage({ params }: { params: { id: string } }) {}
