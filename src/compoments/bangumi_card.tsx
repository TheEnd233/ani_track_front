import { AniWeekData } from "@/pages/home_page";
import React from "react";




const converToShow = (i:number) =>{
  switch(i){
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
}


const CardCompoment: React.FC<{ anidata: AniWeekData[] }> = ({ anidata }) => (
  <div className="bg-white">
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
              <div key={ani.id}>
                <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    alt={ani.img}
                    src={ani.img}
                    className="size-full object-cover"
                  />
                </div>

                <h3 className="mt-1 text-sm text-gray-700">
                  <a href="">
                    <span className="absolute inset-0" />
                    {ani.title}
                  </a>
                </h3>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* {products.map((product,index) => (
          <div key={index} className="group relative">
            <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="size-full object-cover"
              />
            </div>
            <h3 className="mt-1 text-sm text-gray-700">
              <a href={product.href}>
                <span className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
            
          </div>
        ))} */}
    </div>
  </div>
);

export default CardCompoment;
