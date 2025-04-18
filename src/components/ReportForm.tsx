"use client";

import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ComboBox } from "./ui/combobox";
import ApiRouter from "@/lib/api/apiRouter";
import { MonthPicker } from "./ui/monthpicker";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// {
//     "ngo_id": "67ff8442c21f94a2debed441",
//     "month": "2024-07",
//     "people_helped": "8",
//     "events_conducted": "1",
//     "funds_utilized": "2500"
//   }

interface ReportData {
  ngo_id: string;
  month: Date;
  people_helped: number;
  events_conducted: number;
  funds_utilized: number;
}

interface ReportFormError {
  ngo_id?: string;
  month?: string;
  people_helped?: string;
  events_conducted?: string;
  funds_utilized?: string;
}

type ReportFormProps = {
  refreshData: () => Promise<void>;
};

const ReportForm: React.FC<ReportFormProps> = ({ refreshData }) => {
  const [data, setData] = useState<ReportData>({
    ngo_id: "",
    month: new Date(),
    people_helped: 0,
    events_conducted: 0,
    funds_utilized: 0,
  });

  const [NGOs, setNGOs] = useState<{ value: string; label: string }[]>([]);

  const [errors, setErrors] = useState<ReportFormError>();

  const [search, setSearch] = useState("");
  const fetchNGOs = async () => {
    try {
      const resp = await ApiRouter.getNgoList({
        search: search,
      });

      if (resp.status === 200) {
        const ngoList = resp.data.result.map((ngo: any) => ({
          value: ngo.ngo_id,
          label: `${ngo.display_id} - ${ngo.name}`,
        }));
        console.log("NGOs:", ngoList);

        setNGOs(ngoList);
      }
    } catch (error: any) {
      console.error("Error fetching NGOs:", error.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchNGOs();
    }, 500);
  }, [search]);

  const updateData = (field: Partial<ReportData>) => {
    setData((prev) => ({ ...prev, ...field }));
  };

  const updateError = (field: Partial<ReportFormError>) => {
    setErrors((prev) => ({ ...prev, ...field }));
  };

  const handleValidation = async () => {
    let isValid = true;

    if (!data.ngo_id) {
      updateError({ ngo_id: "NGO is required" });
      isValid = false;
    }

    if (!data.month) {
      updateError({ month: "Month is required" });
      isValid = false;
    }

    if (!data.people_helped) {
      updateError({ people_helped: "People Helped is required" });
      isValid = false;
    }

    if (!data.events_conducted) {
      updateError({ events_conducted: "Events Conducted is required" });
      isValid = false;
    }

    if (!data.funds_utilized) {
      updateError({ funds_utilized: "Funds Utilized is required" });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    console.log("Submitting report:", data);

    const isValid = await handleValidation();

    if (!isValid) return;

    try {
      const resp = await ApiRouter.createReport({
        ...data,
        month: format(data.month, "yyyy-MM"),
      });
      console.log("Report creation response:", resp);

      if (resp.status === 200) {
        toast.success("Report created successfully");
        await refreshData();
        setData({
          ngo_id: "",
          month: new Date(),
          people_helped: 0,
          events_conducted: 0,
          funds_utilized: 0,
        });
        updateError({});
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 px-4">
        <div className="w-full">
          <Label htmlFor="name" className="mb-2">
            NGO
          </Label>
          <ComboBox
            className="w-full"
            defaultValue={data.ngo_id}
            options={NGOs}
            onSearch={setSearch}
            onSelect={(value) => {
              updateData({ ngo_id: value });
              updateError({ ngo_id: "" });
            }}
          />
          <h3 className="text-red-500 font-semibold">{errors?.ngo_id}</h3>
        </div>
        <div className="w-full">
          <Label htmlFor="name" className="mb-2">
            Month
          </Label>
          <div className="ml-auto flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !data.month && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.month ? (
                    format(data.month, "MMMM yyyy")
                  ) : (
                    <span>Select month</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <MonthPicker
                  onMonthSelect={(date) => {
                    updateData({ month: date });
                    updateError({ month: "" });
                  }}
                  selectedMonth={data.month}
                />
              </PopoverContent>
            </Popover>
          </div>
          <h3 className="text-red-500 font-semibold">{errors?.month}</h3>
        </div>
        <div className="w-full">
          <Label htmlFor="people_helped" className="mb-2">
            People Helped
          </Label>
          <Input
            type="number"
            min={0}
            id="people_helped"
            value={data.people_helped}
            onChange={(e) => {
              updateData({ people_helped: Number(e.target.value) });
              updateError({ people_helped: "" });
            }}
          />
          <h3 className="text-red-500 font-semibold">
            {errors?.people_helped}
          </h3>
        </div>
        <div className="w-full">
          <Label htmlFor="events_conducted" className="mb-2">
            Events Conducted
          </Label>
          <Input
            type="number"
            min={0}
            id="events_conducted"
            value={data.events_conducted}
            onChange={(e) => {
              updateData({ events_conducted: Number(e.target.value) });
              updateError({ events_conducted: "" });
            }}
          />
          <h3 className="text-red-500 font-semibold">
            {errors?.events_conducted}
          </h3>
        </div>
        <div className="w-full">
          <Label htmlFor="funds_utilized" className="mb-2">
            Funds Utilized
          </Label>
          <Input
            type="number"
            min={0}
            id="funds_utilized"
            value={data.funds_utilized}
            onChange={(e) => {
              updateData({ funds_utilized: Number(e.target.value) });
              updateError({ funds_utilized: "" });
            }}
          />
          <h3 className="text-red-500 font-semibold">
            {errors?.funds_utilized}
          </h3>
        </div>
      </div>
      <div className="flex gap-4 m-4">
        <Button variant="default" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default ReportForm;
