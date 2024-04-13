"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import styles from "../add-report.module.scss";

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="flex items-center mb-6 gap-2">
      <div className={styles.backButton} onClick={() => router.back()}>
        <ChevronLeft />
      </div>
      <p className="text-lg ">Agregar reporte bancario</p>
    </div>
  );
};

export default BackButton;
