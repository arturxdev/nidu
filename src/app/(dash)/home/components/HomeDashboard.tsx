"use client";
import styles from "../home.module.scss";
import { Button } from "@/components/ui/button";
import { CircleHelp, CirclePlus, MessageSquareText } from "lucide-react";
import Tooltip from "@/components/nidu/Tooltip";
import { Progress } from "@/components/ui/progress";
import { DateRangePicker } from "@/components/nidu/DateRangePicker";

import { adjustHexOpacity, generateFormatNumber } from "@/utils/generalHelper";
import {
  categoryArrayWithId,
  categoryDictionary,
} from "@/utils/dictionaries/categoryDictionary";
import { useGetCharts } from "@/services/hooks/useGetCharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGetBanks } from "../../../../services/hooks/useGetBanks";
import { bankDictionary } from "@/utils/dictionaries/bankDictionary";
import HomeSkeletonDashboard from "./HomeSkeletonDashboard";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format, sub, subDays } from "date-fns";

type HomeDashboardProps = {
  token: string;
};

const HomeDashboard = ({ token }: HomeDashboardProps) => {
  const router = useRouter();
  const startDate = new Date("2024-04-03");
  const endDate = new Date("2024-04-31");

  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const { resume, isLoading, isError, revalidateResume } = useGetCharts(
    token,
    date?.from ? format(date?.from, "yyyy-MM-dd") : "",
    date?.to
      ? format(date?.to, "yyyy-MM-dd")
      : date?.from
      ? format(date?.from, "yyyy-MM-dd")
      : ""
  );

  const { banks, isErrorBanks, isLoadingBanks } = useGetBanks(token);

  const handleOnChangeDate = (e: any) => {
    revalidateResume();
  };

  const generateProgressIncomePercentage = () => {
    if (!resume) return 0;
    if (resume?.balance?.income - resume?.balance?.outcome < 0) return 0;
    const maxProgress = resume?.balance?.income;
    const actualProgress =
      resume?.balance?.income - (resume?.balance?.outcome * 100) / maxProgress;
    return actualProgress;
  };

  const handleGoToReports = (bank: string) => {
    router.push(`/charts?bank=${bank}`);
  };

  if (isLoading || isLoadingBanks) {
    return <HomeSkeletonDashboard />;
  }
  return (
    <div className="w-full min-h-screen">
      <div>
        <div className="px-4 pt-4 text-foreground flex justify-between">
          <div className="font-bold">Hola, bienvenido a tu Nidu!</div>
          <div className="flex gap-2">
            <DateRangePicker
              date={date}
              setDate={setDate}
              handleOnChangeDate={handleOnChangeDate}
            />
          </div>
        </div>
      </div>
      <div className={styles.dashboardGrid}>
        <div
          className={`${styles.dashboardCard} ${styles.col3} ${styles.rowSm} ${styles.totalBalanceGrid} bg-white dark:bg-zinc-900`}
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
            <div className="font-medium text-4xl">
              $
              {resume
                ? generateFormatNumber(
                    resume?.balance?.income - resume?.balance?.outcome
                  )
                : 0}
            </div>
            {/* <div className="font-medium text-xs mt-1 text-gray-400">
              +12% del mes pasado
                </div>*/}
          </div>
        </div>
        <div
          className={`${styles.dashboardCard} ${styles.col5} ${styles.rowSm} ${styles.balanceGrid} bg-white dark:bg-zinc-900`}
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
                  ${resume ? generateFormatNumber(resume?.balance?.income) : 0}
                </div>
                {/*<div className="font-medium text-xs mt-1 text-gray-400">
                  <span className="text-green-600">+12%</span> del mes pasado
                </div>*/}
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
                  ${" "}
                  {resume ? generateFormatNumber(resume?.balance?.outcome) : 0}
                </div>
                {/*<div className="font-medium text-xs mt-1 text-gray-400">
                  <span className="text-red-600">+12%</span> del mes pasado
            </div>*/}
              </div>
            </div>
          </div>
          <div className="px-3 mt-2">
            <Progress value={generateProgressIncomePercentage()} />
          </div>
        </div>
        <div
          className={`${styles.dashboardCard} ${styles.colMd} ${styles.rowXl} ${styles.expensesGrid} bg-white dark:bg-zinc-900`}
        >
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>RESUMEN DE GASTOS</div>
            </div>
          </div>
          <div className={styles.cardModule}>
            <div
              className={`${styles.topExpenseCard} bg-[#eaf3ff] dark:bg-slate-800`}
            >
              <p className="text-sm	text-center font-light">Tu mayor gasto</p>
              <p className="text-sm text-center font-medium">
                ${generateFormatNumber(resume?.gastos[0]?.amount)}
              </p>
            </div>
            <div>
              <p className="mt-6 mb-3 text-sm font-medium">
                Tu top 5 de gastos
              </p>
              <div className="flex flex-col gap-2">
                {resume?.categories &&
                  resume?.categories?.length > 0 &&
                  resume?.categories.slice(0, 5).map((category: any) => {
                    return (
                      <div
                        className={styles.categorieCard}
                        key={category.key}
                        style={{
                          backgroundColor: `${adjustHexOpacity(
                            categoryDictionary[category._id]?.color,
                            "0.1"
                          )}`,
                          border: `1px solid ${
                            categoryDictionary[category._id]?.color
                          }`,
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className={styles.emojiContainer}
                              style={{
                                backgroundColor:
                                  categoryDictionary[category._id]?.color,
                              }}
                            >
                              {categoryDictionary[category._id]?.emoji}
                            </div>
                            <div className="text-sm">
                              <p>{categoryDictionary[category._id]?.label} </p>
                            </div>
                          </div>
                          <div className="text-sm">
                            <p>${generateFormatNumber(category.totalAmount)}</p>
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
          className={`${styles.dashboardCard} ${styles.colMd} ${styles.rowXl} ${styles.newsGrid} bg-white dark:bg-zinc-900`}
        >
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>NOVEDADES</div>
            </div>
          </div>
          <div className={styles.cardModule}>
            <div className="w-full h-full">
              <div className={styles.emptyStateNews}>
                <Image
                  src={"/img/work-in-progress.png"}
                  width={64}
                  height={64}
                  alt="news"
                />

                <p className="text-gray-400 text-sm text-center">
                  Acá verás las novedades que iremos agregando en Nidu para ti.
                </p>
              </div>
              <div className="text-center">
                <Button asChild variant={"nidu"}>
                  <Link
                    href="https://nidu.canny.io/feature-requests"
                    passHref={true}
                    target="_blank"
                  >
                    Solicitar características
                    <MessageSquareText className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.dashboardCard} ${styles.colXl} ${styles.rowLg} ${styles.banksGrid} bg-white dark:bg-zinc-900`}
        >
          <div className={styles.cardHeader}>
            <div className="flex items-center justify-between gap-2 w-full">
              <div className={styles.cardTitle}>
                <p>TUS CUENTAS</p>
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"nidu"}>
                      <CirclePlus className="mr-2 h-4 w-4" />
                      Agregar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => router.push("/add-report")}
                      className="cursor-pointer"
                    >
                      Subir reporte bancario
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled onClick={() => ""}>
                      Agregar transacción manualmente (Próximamente)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className={styles.cardModule}>
            {banks && banks.length > 0 ? (
              <div className={styles.banksSection}>
                {banks.map((bank: any) => {
                  return (
                    <div
                      key={bank}
                      className={styles.bankElement}
                      onClick={() => handleGoToReports(bank)}
                    >
                      <Image
                        src={
                          bankDictionary[bank as keyof typeof bankDictionary]
                            ?.image
                        }
                        width={40}
                        height={40}
                        alt="news"
                      />
                      <p>
                        {
                          bankDictionary[bank as keyof typeof bankDictionary]
                            .label
                        }
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyStateAccounts}>
                <Image
                  src={"/img/accounts.png"}
                  width={45}
                  height={53}
                  alt="accounts"
                />

                <p className="text-gray-400 text-sm">
                  Agrega las transacciones de todas tus cuentas bancarias
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
