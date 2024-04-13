import Image from "next/image";
import styles from "./add-report.module.scss";

import { validateRequest } from "@/lib/auth";
import BackButton from "./components/BackButton";
import AddReportForm from "./components/AddReportForm";

export default async function AddReport() {
  const { session } = await validateRequest();

  return (
    <div className="w-full min-h-screen px-4 pt-4 ">
      <BackButton />
      <div className="flex">
        <div className={styles.stepsSection}>
          <p className={styles.title}>
            ¿Cómo subir tus transacciones desde un reporte bancario?
          </p>

          <div className="flex flex-col	gap-8">
            <div className="flex items-center	gap-2">
              <div className={styles.imageContainer}>
                <Image
                  src={"/img/step1.png"}
                  width={56}
                  height={40}
                  alt="step1"
                />
              </div>

              <div className={styles.bulletPoint}>1</div>
              <p className="text-sm	">
                Selecciona el banco del que deseas subir el reporte.
              </p>
            </div>

            <div className="flex items-center	gap-2">
              <div className={styles.imageContainer}>
                <Image
                  src={"/img/step2.png"}
                  width={56}
                  height={40}
                  alt="step1"
                />
              </div>
              <div className={styles.bulletPoint}>2</div>
              <p className="text-sm	">
                Ingresa al portal web de tu banco seleccionado y consulta el
                detalle de la cuenta que quieres subir, puede ser crédito o
                débito.
              </p>
            </div>

            <div className="flex items-center	gap-2">
              <div className={styles.imageContainer}>
                <Image
                  src={"/img/step3.png"}
                  width={56}
                  height={40}
                  alt="step1"
                />
              </div>
              <div className={styles.bulletPoint}>3</div>
              <p className="text-sm	">
                Identifica la opción que te permite descargar tu reporte y elige
                alguno de estos formatos: csv, xml, xls, xlsx.
              </p>
            </div>

            <div className="flex items-center	gap-2">
              <div className={styles.imageContainer}>
                <Image
                  src={"/img/step4.png"}
                  width={56}
                  height={40}
                  alt="step1"
                />
              </div>
              <div className={styles.bulletPoint}>4</div>
              <p className="text-sm	">
                Nombra la cuenta que quieres guardar en tu Nidu y a la que
                podrás agregar futuros reportes.
              </p>
            </div>

            <div className="flex items-center	gap-2">
              <div className={styles.imageContainer}>
                <Image
                  src={"/img/step5.png"}
                  width={56}
                  height={40}
                  alt="step1"
                />
              </div>
              <div className={styles.bulletPoint}>5</div>
              <p className="text-sm	">
                Sube el archivo que acabas de descargar. Si quieres subir más de
                una cuenta del mismo banco, tendrás que hacerlo una por una.
              </p>
            </div>
          </div>
        </div>
        <AddReportForm token={session?.id as string} />
      </div>
    </div>
  );
}
