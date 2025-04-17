import { convertToSearchParams } from "../utils";
import { api } from "./axios";

class ApiRouter {
  static async getNgoList(data: any) {
    return api.get("/ngo/list?" + convertToSearchParams(data));
  }

  static async createNgo(data: any) {
    return api.post("/ngo/create", data);
  }

  static async getDashboardData(data: any) {
    return api.get("/report/dashboard?" + convertToSearchParams(data));
  }

  static async createReport(data: any) {
    return api.post("/report/", data);
  }
}

export default ApiRouter;
