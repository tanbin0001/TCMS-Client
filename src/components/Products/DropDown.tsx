import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

const items: MenuProps["items"] = [
  {
    key: "8",
    label: "All",
  },
  {
    key: "1",
    label: "sportType",
  },
  {
    key: "2",
    label: "brand",
  },
  {
    key: "3",
    label: "size",
  },
  {
    key: "4",
    label: "priceRange",
  },
  {
    key: "5",
    label: "material",
  },
  {
    key: "6",
    label: "color",
  },
  {
    key: "7",
    label: "condition",
  },
  {
    key: "8",
    label: "branch",
  },
];

const DropDown = ({
  onSelectedItemChange,
}: {
  onSelectedItemChange: (label: string | null) => void;
}) => {
  const onClick = ({ key }: { key: string }) => {
    const selectedItem = items.find((item) => item!.key === key) as {
      label?: string;
    };

    if (selectedItem && selectedItem.label) {
      onSelectedItemChange(selectedItem.label);
    } else {
      console.error("Unexpected menu item type:", selectedItem);
    }
  };

  return (
    <div>
      <Dropdown menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space className="text-purple-900 font-bold">
            Filter By
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default DropDown;
