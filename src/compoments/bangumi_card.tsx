import { AniData, AniWeekData } from "@/pages/home_page";
import React, { Fragment, useState } from "react";
import BangumiDetail from "./bangumi_detail";

const converToShow = (i: number) => {
  switch (i) {
    case 0:
      return "星期日";
    case 1:
      return "星期一";
    case 2:
      return "星期二";
    case 3:
      return "星期三";
    case 4:
      return "星期四";
    case 5:
      return "星期五";
    case 6:
      return "星期六";
    case 7:
      return "剧场版";
  }
};

type DialogConfig ={
  open: boolean,
  ani:AniData|null
  
}

const CardListCompoment: React.FC<{ anidata: AniWeekData[] }> = ({
  anidata,
}) => {
  console.log('CardListCompoment初始化数据',anidata)
  const [currentAni, setCurrentAni] = useState<DialogConfig >({
    open: false,
    ani: null
  });




  return (
    <div className="bg-white">
      <BangumiDetail anidata={currentAni.ani} isModelOpen={currentAni.open} handleModelClose={() => setCurrentAni({
        open: false,
        ani: null
      })} />



      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
        {anidata.map((item, index) => (
          <div key={item.day}>
            <div className="md:flex md:items-center md:justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {converToShow(item.day)}
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-5 md:gap-y-3 lg:gap-x-4">
              {item.anis.map((ani) => (
                <Fragment key={ani.id}>
                  <div onClick={() => {
                    console.log(ani, "被点击了");
                    setCurrentAni({
                      open: true,
                      ani
                    })
                  }}>
                    <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                      <img key={ani.id}
                        alt={ani.img}
                        src={ani.img}
                        className="size-full object-cover"
                      />
                    </div>

                    <h3 className="mt-1 text-sm text-gray-700">
                      <span>
                        <span className="absolute inset-0" />
                        {ani.title}
                      </span>
                    </h3>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardListCompoment;
