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

export default function BangumiDetail({ anidata }: { anidata: AniData }) {
  const [aniDownloadData, setAniDownloadData] = useState<AniDownloadDetail[]>(
    []
  );
  useEffect(() => {
    const getAniDownloadData = async () => {
      try {
        const response = await API.get(`/mikan/getDownloadData/${anidata.id}`);
        if (response.data.code === 200) {
          let temp: AniDownloadDetail[] = [];
          response.data.data.array.forEach((e: any) => {
            let _temp: AniDownloadDetail = {
              order: e.order,
              subgroupName: e.name,
              epos: e.epos,
            };
            temp.push(_temp);
          });
          setAniDownloadData(temp);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

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
      open={true}
    >
      <div className="flex flex-col">
        <div>字幕组：{MyDropDownMenu()}</div>
      </div>
    </Modal>
  );
}

function MyDropDownMenu() {
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const items: MenuProps["items"] = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Dropdown menu={menuProps}>
      <Button>
        <Space>Button</Space>
      </Button>
    </Dropdown>
  );
}
