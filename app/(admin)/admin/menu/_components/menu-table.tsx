/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ITable from "@/components/shared/ITable";
import { DefaultMeta } from "@/constants/constants";
import { useModal } from "@/hooks";
import {
  BaseResponseType,
  MetaType,
  ModalType,
  TModalType,
} from "@/types/common";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button as AntButton, Flex, Popconfirm, TableProps } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { menuServices } from "../_services/services";
import MenuForm from "./menu-form";

interface DataType {
  id: number;
  name: string;
  path: string;
}

const MenuTable = () => {
  const router = useRouter();
  const { value, handleClose } = useModal<TModalType>(ModalType);

  //#region State
  const [meta, setMeta] = useState<MetaType>(DefaultMeta);
  const [dataTable, setDataTable] = useState<any[]>([]);
  //#endregion

  const { data, isLoading, mutate } =
    menuServices.getPagingMenu<BaseResponseType>(meta);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "8%",
      render: (_: unknown, __: unknown, index: number) => (
        <div>{index + 1}</div>
      ),
    },
    {
      title: "Tên menu",
      dataIndex: "name",
      key: "name",
      align: "left",
      width: "32%",
    },
    {
      title: "Đường dẫn menu",
      dataIndex: "path",
      key: "path",
      align: "left",
      width: "45%",
    },
    {
      title: "Thao tác",
      dataIndex: "thaoTac",
      key: "thaoTac",
      align: "center",
      width: "15%",
      render: (_: any, record: any) => (
        <Flex gap="middle" justify="center" className="text-xl">
          <EyeOutlined onClick={() => router.push(`?view=${record?.id}`)} />
          <EditOutlined onClick={() => router.push(`?edit=${record?.id}`)} />
          <Popconfirm
            title="Thông báo"
            description={`Bạn có chắc chắn muốn xóa menu "${record?.name}" không?`}
            onConfirm={async () => {
              await menuServices.delete(record?.id);
              mutate();
            }}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const handleChangePagination = (page: number, pageSize: number) => {
    setMeta((prev) => ({ ...prev, page, pageSize }));
  };

  useEffect(() => {
    if (data) {
      setDataTable(data?.result?.data);
    }
  }, [data]);

  return (
    <>
      <ITable
        columns={columns}
        dataSource={dataTable}
        meta={{ ...meta, total: data?.result?.total }}
        title={() => (
          <div className="flex items-center justify-between">
            <h1>Quản lý menu</h1>
            {/* <Button className="bg-blue-600 text-white hover:bg-blue-500 cursor-pointer">
                Thêm mới
              </Button> */}
            <AntButton
              type="primary"
              onClick={() => {
                router.push("?create=true");
              }}
            >
              Thêm mới
            </AntButton>
          </div>
        )}
        loading={isLoading}
        handleChangePagination={handleChangePagination}
      />

      {(value?.create === "true" || !!value?.edit || !!value?.view) && (
        <MenuForm mutate={mutate} />
      )}
    </>
  );
};

export default MenuTable;
