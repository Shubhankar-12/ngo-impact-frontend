"use client";

import { useEffect, useState } from "react";
import {
  CalendarIcon,
  Users,
  Calendar,
  IndianRupee,
  Building,
  Plus,
  X,
} from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MonthPicker } from "@/components/ui/monthpicker";
import ApiRouter from "@/lib/api/apiRouter";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ReportForm from "@/components/ReportForm";

// Mock data for demonstration
//   totalPeopleHelped: 0,
//         totalEventsConducted: 0,
//         totalFundsUtilized: 0,
//         totalNgosReporting: 0,

export default function DashboardPage() {
  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPeopleHelped: 0,
    totalEventsConducted: 0,
    totalFundsUtilized: 0,
    totalNgosReporting: 0,
  });

  const fetchData = async () => {
    try {
      const resp = await ApiRouter.getDashboardData(
        date ? { month: format(date, "yyyy-MM") } : {}
      );

      if (resp.status === 200) {
        setStats(resp.data);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {date
              ? `Impact Summary for ${format(date, "MMMM yyyy")}`
              : "Overall Impact Summary"}
          </h2>
          <div className="ml-auto flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "MMMM yyyy") : <span>Select month</span>}
                </Button>
              </PopoverTrigger>
              <X
                className="ml-auto h-4 w-4 opacity-50 cursor-pointer"
                onClick={() => setDate(null as any)}
              />
              <PopoverContent className="w-auto p-0" align="end">
                <MonthPicker onMonthSelect={setDate} selectedMonth={date} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                NGOs Reporting
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalNgosReporting}
              </div>
              <p className="text-xs text-muted-foreground">
                Organizations submitted reports
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                People Helped
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalPeopleHelped.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Beneficiaries across all programs
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Events Conducted
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalEventsConducted}
              </div>
              <p className="text-xs text-muted-foreground">
                Programs and activities completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Funds Utilized
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{(stats.totalFundsUtilized / 100000).toFixed(2)} L
              </div>
              <p className="text-xs text-muted-foreground">
                Total funds deployed in lakhs
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit New Report</CardTitle>
            <CardDescription>
              Add this month&apos;s report to the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <div className="h-[300px] flex items-center justify-center bg-muted rounded-md"> */}
            <ReportForm refreshData={fetchData} />
            {/* </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
