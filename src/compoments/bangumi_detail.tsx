import { AniData } from "@/pages/home_page";
import API from "@/request";
import { Button, Dropdown, MenuProps, message, Modal, Space } from "antd";
import { useEffect, useState } from "react";
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


export default function BangumiDetail({ anidata,isModelOpen,handleModelClose }: { anidata: AniData ,isModelOpen:boolean,handleModelClose:()=>void}) {
  const [aniDownloadData, setAniDownloadData] = useState<AniDownloadDetail[]>(
    []
  );
  useEffect(() => {
    const getAniDownloadData = async () => {
      try {
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
          console.log("设置...", temp);
          setAniDownloadData(temp);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAniDownloadData();
  }, [anidata.id]);

  return (
    <Modal
      title={anidata.title}
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
    >
      <div className="flex flex-col">
        <div>
          字幕组：{MyDropDownMenu({ aniDownloadGroupData: aniDownloadData })}
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
  console.log("aniDownloadGroupData", aniDownloadGroupData);
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

  console.log("items", items);

  return (
    <Dropdown menu={menuProps}>
      <Button>
        <Space>{seletedItem?.subgroupName ?? "没有数据"}</Space>
      </Button>
    </Dropdown>
  );
}
