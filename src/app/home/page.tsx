import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./home.module.scss";
import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";
import Tooltip from "@/components/nidu/Tooltip";
import { Progress } from "@/components/ui/progress";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { DateRangePicker } from "@/components/nidu/DateRangePicker";
export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Sidebar />
      <div className="ml-[64px]">
        <div>
          <div className="px-4 pt-4 text-foreground flex justify-between">
            <div className="font-bold">Bienvenido, Brandon</div>
            <div className="flex gap-2">
              <Button className="mr-2" asChild>
                <a
                  href="https://nidu.canny.io/feature-requests"
                  target="_blank"
                >
                  Solicita características
                </a>
              </Button>
              <DateRangePicker />
            </div>
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
                  <Tooltip
                    label="Esto es la resta de todos tus ingresos menos tus gastos del mes actual."
                    position="right"
                  >
                    <CircleHelp size={16} />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className={styles.cardModule}>
              <div className="font-medium text-4xl">$45,450</div>
              <div className="font-medium text-xs mt-1 text-gray-400">
                +12% del mes pasado
              </div>
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
                  <div className="font-medium text-2xl text-green-600">
                    $95,450
                  </div>
                  <div className="font-medium text-xs mt-1 text-gray-400">
                    <span className="text-green-600">+12%</span> del mes pasado
                  </div>
                </div>
              </div>
              <div className="w-2/4">
                <div className={styles.cardHeader}>
                  <div>
                    <div className={styles.cardTitle}>Gastos 💰</div>
                  </div>
                </div>
                <div className={styles.cardModule}>
                  <div className="font-medium text-2xl text-red-600">
                    $5,230
                  </div>
                  <div className="font-medium text-xs mt-1 text-gray-400">
                    <span className="text-red-600">+12%</span> del mes pasado
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3">
              <Progress value={33} />
            </div>
          </div>
          <div
            className={`${styles.dashboardCard} ${styles.colMd} ${styles.rowMd} bg-white dark:bg-zinc-900`}
          >
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.cardTitle}>Saldo en cuentas</div>
              </div>
            </div>
            <div className={styles.cardModule}></div>
          </div>
          <div
            className={`${styles.dashboardCard} ${styles.colMd} ${styles.rowMd} bg-white dark:bg-zinc-900`}
          >
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.cardTitle}>Presupuestos y metas</div>
              </div>
            </div>
            <div className={styles.cardModule}></div>
          </div>
          <div
            className={`${styles.dashboardCard} ${styles.colXl} ${styles.rowLg} bg-white dark:bg-zinc-900`}
          >
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.cardTitle}>
                  <div className="flex items-center gap-2	">
                    <p>Transacciones</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardModule}>
              <TransactionTable />
            </div>
          </div>
          <div
            className={`${styles.dashboardCard} ${styles.colXl} ${styles.rowMd} bg-white dark:bg-zinc-900`}
          >
            <div className={styles.cardHeader}>
              <div className="flex items-center gap-2">
                <div className={styles.cardTitle}>Gráfica de gastos</div>
              </div>
            </div>
            <div className={styles.cardModule}></div>
          </div>

          <div
            className={`${styles.dashboardCard} ${styles.colXl} ${styles.rowMd} bg-white dark:bg-zinc-900`}
          >
            <div className={styles.cardHeader}>
              <div className="flex items-center gap-2">
                <div className={styles.cardTitle}>
                  Evolución de gastos mensual
                </div>
              </div>
            </div>
            <div className={styles.cardModule}></div>
          </div>

          <div
            className={`${styles.dashboardCard} ${styles.colXl} ${styles.rowMd} bg-white dark:bg-zinc-900`}
          >
            <div className={styles.cardHeader}>
              <div className="flex items-center gap-2">
                <div className={styles.cardTitle}>Ahorros</div>
              </div>
            </div>
            <div className={styles.cardModule}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
