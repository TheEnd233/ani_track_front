import { getAniDataEndpoint } from "@/api";
import CardCompoment from "@/compoments/bangumi_card";
import SearchBar from "@/compoments/search_bar";
import API from "@/request";
import { useEffect, useState } from "react";

export interface AniWeekData {
  day: number;
  anis: AniData[];
}

export interface AniData {
  id: string;
  img: string;
  title: string;
}

export default function HomePage() {
  const [aniData, setAniData] = useState<AniWeekData[]>([]);

  useEffect(() => {
    const getAniData = async () => {
      try {
        const response = await API.get(getAniDataEndpoint(2024, "春"));
        console.log("ddd", response);
        if (response.data.code === 200) {
          // 遍历response.data,转换成anidata
          const anidata: AniWeekData[] = response.data.data.map(
            (item: AniWeekData) => {
              return {
                day: item.day,
                anis: item.anis.map((ani: AniData) => ({
                  id: ani.id,
                  img: ani.img,
                  title: ani.title,
                })),
              };
            }
          );

          anidata.sort((a, b) => a.day - b.day);
      
          
       

          setAniData(anidata);
        } else {
          console.log("有问题");
        }

        return response;
      } catch (error) {
        console.error(error);
      }
    };
    getAniData();
  }, []);

  return (
    <div>
      <div className="max-w-[30vw] mx-auto ">
        <SearchBar></SearchBar>
      </div>

      <CardCompoment anidata={aniData}></CardCompoment>
    </div>
  );
}
