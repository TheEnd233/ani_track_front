import { AniData } from "@/pages/home_page";
import API from "@/request";
import { Button, Dropdown, MenuProps, message, Modal, Space } from "antd";
import { useEffect, useState } from "react";
import MoeSelector from "./moe_selector";
import { log } from "console";
const { confirm } = Modal;

interface AniDownloadDetail {
  order: number;
  subgroupName: string;
  epos: Epo[];
}

interface Epo {
  name: string;
  url: string;
}

export default function BangumiDetail({
  anidata,
  isModelOpen,
  handleModelClose,
}: {
  anidata: AniData|null;
  isModelOpen: boolean;
  handleModelClose: () => void;
}) {

  console.log("BangumiDetail anidata", anidata);
  const [aniDownloadData, setAniDownloadData] = useState<AniDownloadDetail[]>(
   []
  );
  useEffect(() => {
    const getAniDownloadData = async () => {
      try {
        if(anidata!=null){
          const response = await API.get(`/mikan/getDownloadData/${anidata.id}`);
          if (response.data.code === 200) {
            let temp: AniDownloadDetail[] = [];
            response.data.data.forEach((e: any) => {
              let _temp: AniDownloadDetail = {
                order: e.order,
                subgroupName: e.name,
                epos: e.epos,
              };
              temp.push(_temp);
            });
            console.log("BangumiDetail aniDownloadData", temp);
            setAniDownloadData(temp);
          }
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    getAniDownloadData();
  }, [anidata]);

  return (
    <Modal
      title={anidata?.title??'默认标题'}
      
      footer={() => (
        <button
          onClick={() => {
            console.log("预览");
          }}
        >
          预览
        </button>
      )}
      open={isModelOpen}
      onCancel={handleModelClose}
      width="60%"
    >
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="mr-2">
            <div>
              介绍：
              在这个无尽的宇宙中，我们总是能够发现一些非常奇妙而又令人琢磨不透的现象。其实，每当风吹过草地，树叶轻轻摇曳，我们都能感受到一种来自自然的神秘力量。天空中的云朵时常会变换形状，仿佛在述说着一个个古老而又漫长的故事。在这个充满未知的世界中，我们或许只是一粒微尘。然而，正是这无尽的微尘构成了无边的世界。我们每一天都在追寻什么，可能连我们自己也未必清楚。平凡的生活中总会有些许的惊喜与无奈相伴。不论如何，有时候我们需要停下脚步，聆听内心的声音，与自然进行一场无声的对话。也许，这样的时刻会让我们更加明白，生活中的种种虽显琐碎，但正是这一切共同编织了人生的画卷。
            </div>
          
            <div className="mt-3">
              字幕组：
              { MyDropDownMenu({ aniDownloadGroupData: aniDownloadData } )}
            </div>

          


            <div className="flex justify-start mt-2 items-center">
              <p className="mr-3">包含：</p>
              <div className="min-w-[100px]">
                <MoeSelector />
              </div>
            </div>


   

            <div className="flex justify-start mt-2 items-center">
              <p className="mr-3">排除：</p>
              <div className="min-w-[100px]">
                <MoeSelector />
              </div>
            </div>

            <div className="flex justify-start mt-2 items-center">
              <p>状态：</p>
              <p className="ml-3">已订阅</p>
            </div>

          




          </div>

          <div className="min-h-[300px] min-w-[300px]">
            {anidata!=null && <img src={anidata.img}></img>}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function MyDropDownMenu({
  aniDownloadGroupData,
}: {
  aniDownloadGroupData: AniDownloadDetail[];
}) {
  console.log("MyDropDownMenu aniDownloadGroupData", aniDownloadGroupData);
  const [seletedItem, setSelectedItem] = useState<
    AniDownloadDetail | undefined
  >(undefined);

  console.log("seletedItem", seletedItem);

  useEffect(() => {
    if (aniDownloadGroupData.length > 0) {
      setSelectedItem(aniDownloadGroupData[0]);
    }
  }, [aniDownloadGroupData]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
    const clickData = aniDownloadGroupData.find(
      (item) => item.subgroupName === e.key
    );
    if (clickData) {
      setSelectedItem(clickData);
    }
  };

  const items: MenuProps["items"] = [
    ...aniDownloadGroupData.map((item) => ({
      label: item.subgroupName,
      key: item.subgroupName,
    })),
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  console.log("MyDropDownMenu items", items);

  return (
    <Dropdown menu={menuProps}>
      <Button>
        <Space>{seletedItem?.subgroupName ?? "没有数据"}</Space>
      </Button>
    </Dropdown>
  );
}
