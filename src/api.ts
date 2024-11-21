import axios from "axios";

export interface GetAniDataParam {
  year: number;
  season: string;
}


// 封装函数
export const getAniDataEndpoint = (year: number, season: string) => {
  return `/mikan/${year}/${season}`; // 这里的 URL 是相对路径
};
