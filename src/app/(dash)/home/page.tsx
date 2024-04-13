import styles from "./home.module.scss";
import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";
import Tooltip from "@/components/nidu/Tooltip";
import { Progress } from "@/components/ui/progress";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { DateRangePicker } from "@/components/nidu/DateRangePicker";

import { validateRequest } from "@/lib/auth";
import { adjustHexOpacity, generateFormatNumber } from "@/utils/generalHelper";
import { categoryDictionary } from "@/utils/dictionaries/categoryDictionary";
import { chartService } from "@/services/charts";
import { redirect } from "next/navigation";

const chartCategories = [
  {
    key: "ENTRETENIMIENTO",
    transactions: 10,
    total: 340,
    percentage: 40,
  },
  {
    key: "SUSCRIPCIONES",
    transactions: 10,
    total: 340,
    percentage: 40,
  },
  {
    key: "VIAJES",
    transactions: 10,
    total: 340,
    percentage: 40,
  },
  {
    key: "MASCOTAS",
    transactions: 10,
    total: 340,
    percentage: 40,
  },
  {
    key: "SEGUROS",
    transactions: 10,
    total: 340,
    percentage: 40,
  },
];

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login")
  const startDate = new Date('2024-04-03');
  const endDate = new Date('2024-04-31');
  const resume = await chartService.resume(user?.id, startDate, endDate)
  return (
    <div className="w-full min-h-screen">
      <div>
        <div className="px-4 pt-4 text-foreground flex justify-between">
          <div className="font-bold">Bienvenido, Brandon</div>
          <div className="flex gap-2">
            <Button className="mr-2" asChild>
              <a href="https://nidu.canny.io/feature-requests" target="_blank">
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
                <div className="font-medium text-2xl text-red-600">$5,230</div>
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
          className={`${styles.dashboardCard} ${styles.colMd} ${styles.rowXl} bg-white dark:bg-zinc-900`}
        >
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Resumen de gastos</div>
            </div>
          </div>
          <div className={styles.cardModule}>
            <div className={styles.topExpenseCard}>
              <p className="text-sm	text-center font-light">Tu mayor gasto</p>
              <p className="text-sm text-center font-medium">$12,000</p>
            </div>
            <div>
              <p className="mt-6 mb-3 text-sm font-medium">
                Tu top 5 de gastos
              </p>
              <div className="flex flex-col gap-2">
                {chartCategories &&
                  chartCategories.length > 0 &&
                  chartCategories.map((category) => {
                    return (
                      <div
                        className={styles.categorieCard}
                        key={category.key}
                        style={{
                          backgroundColor: `${adjustHexOpacity(
                            categoryDictionary[category.key]?.color,
                            "0.1"
                          )}`,
                          border: `1px solid ${categoryDictionary[category.key]?.color
                            }`,
                        }}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={styles.emojiContainer}
                              style={{
                                backgroundColor:
                                  categoryDictionary[category.key]?.color,
                              }}
                            >
                              {categoryDictionary[category.key]?.emoji}
                            </div>
                            <div className="text-sm">
                              <p className="font-semibold">
                                {categoryDictionary[category.key]?.label}{" "}
                              </p>
                              <p className="text-xs">
                                {category.transactions}{" "}
                                {category.transactions === 1
                                  ? "transacción"
                                  : "transacciones"}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm">
                            <p>${generateFormatNumber(category.total)}</p>
                            <p className="text-right text-xs">
                              {category.percentage}%
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.dashboardCard} ${styles.colMd} ${styles.rowXl} bg-white dark:bg-zinc-900`}
        >
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Novedades</div>
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
                  <p>Tus cuentas</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.cardModule}>
            <TransactionTable />
          </div>
        </div>
        {/*<div
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
  </div>*/}
      </div>
    </div>
  );
}
