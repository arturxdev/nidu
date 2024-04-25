"use client";
import styles from "../home.module.scss";
import { Skeleton } from "@/components/ui/skeleton";

const HomeSkeletonDashboard = () => {
  return (
    <div className="w-full min-h-screen">
      <div>
        <div className="px-4 pt-4 text-foreground flex justify-between">
          <Skeleton className="h-9 w-[250px]" />
        </div>
      </div>
      <div className={styles.dashboardGrid}>
        <div
          className={`${styles.dashboardCard} ${styles.col3} ${styles.rowSm} bg-white dark:bg-zinc-900`}
        >
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>
                <p>Saldo</p>
              </div>
            </div>
          </div>
          <div className={styles.cardModule}>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        <div
          className={`${styles.dashboardCard} ${styles.col5} bg-white dark:bg-zinc-900`}
        >
          <div className="flex gap-2">
            <div className="w-2/4">
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTitle}>Ingresos 💸</div>
                </div>
              </div>
              <div className={styles.cardModule}>
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
            <div className="w-2/4">
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTitle}>Gastos 💰</div>
                </div>
              </div>
              <div className={styles.cardModule}>
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
          <div className="px-3 mt-2">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <div
          className={`${styles.dashboardCard} ${styles.colMd} ${styles.rowXl} bg-white dark:bg-zinc-900`}
        >
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>RESUMEN DE GASTOS</div>
            </div>
          </div>
          <div className={styles.cardModule}>
            <Skeleton className="h-10 w-full" />
            <div className="mt-10 h-4/6">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        </div>
        <div
          className={`${styles.dashboardCard} ${styles.colMd} ${styles.rowXl} bg-white dark:bg-zinc-900`}
        >
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>NOVEDADES</div>
            </div>
          </div>
          <div className={styles.cardModule}>
            <div className="w-full h-full">
              <Skeleton className="h-1/2 w-full" />
            </div>
          </div>
        </div>
        <div
          className={`${styles.dashboardCard} ${styles.colXl} ${styles.rowLg} bg-white dark:bg-zinc-900`}
        >
          <div className={styles.cardHeader}>
            <div className="flex items-center justify-between gap-2 w-full">
              <div className={styles.cardTitle}>
                <p>TUS CUENTAS</p>
              </div>
            </div>
          </div>
          <div className={styles.cardModule}>
            <div className={styles.banksSection}>
              <div className={styles.bankElement}>
                <Skeleton className="h-16 w-full" />
              </div>
              <div className={styles.bankElement}>
                <Skeleton className="h-16 w-full" />
              </div>
              <div className={styles.bankElement}>
                <Skeleton className="h-16 w-full" />
              </div>
              <div className={styles.bankElement}>
                <Skeleton className="h-16 w-full" />
              </div>
              <div className={styles.bankElement}>
                <Skeleton className="h-16 w-full" />
              </div>
              <div className={styles.bankElement}>
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeletonDashboard;
