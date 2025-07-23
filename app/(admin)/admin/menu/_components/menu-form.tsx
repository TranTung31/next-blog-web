/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ICheckboxForm from "@/components/shared/ICheckboxForm";
import IForm from "@/components/shared/IForm";
import IInputForm from "@/components/shared/IInputForm";
import IModal from "@/components/shared/IModal";
import ISelectForm from "@/components/shared/ISelectForm";
import { Col, Form, Row, Spin } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { menuServices } from "../_services/services";
import { useModal } from "@/hooks";
import { ModalType, TModalType } from "@/types/common";

type MenuFormProps = {
  mutate: any;
};

const MenuForm = ({ mutate }: MenuFormProps) => {
  const { value, handleClose } = useModal<TModalType>(ModalType);
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: dataMenuSelect } = menuServices.getMenuSelect();

  const handleCancel = () => {
    handleClose();
    form.resetFields();
  };

  // Hàm thêm mới và update
  const handleSubmit = async (formData: any) => {
    const payload = {
      name: formData?.name ?? "",
      path: formData?.path ?? "",
      parentId: formData?.parentId ?? null,
      icon: formData?.icon ?? null,
      sortOrder: formData?.sortOrder ?? 0,
      isShow: formData?.isShow ?? true,
      code: formData?.code ?? "",
    };

    if (value?.create === "true") {
      setIsLoading(true);
      await menuServices.create(payload);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      await menuServices.update(value?.edit!, payload);
      setIsLoading(false);
    }

    handleCancel();
    mutate();
  };

  useEffect(() => {
    const fetchMenuById = async () => {
      const res = await menuServices.getById(value?.edit! || value?.view!);
      form.setFieldsValue(res?.result);
    };

    if (!!value?.edit || !!value?.view) fetchMenuById();
  }, [form, value?.edit, value?.view]);

  return (
    <>
      <IModal
        title={
          value?.create === "true"
            ? "Thêm mới menu"
            : !!value?.edit
            ? "Cập nhật menu"
            : "Thông tin chi tiết menu"
        }
        open={value?.create === "true" || !!value?.edit || !!value?.view}
        okText={value?.create === "true" ? "Thêm mới" : "Cập nhật"}
        okButtonProps={
          !!value?.view
            ? { style: { display: "none" } }
            : { style: { display: "" } }
        }
        confirmLoading={isLoading}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Spin spinning={isLoading}>
          <IForm form={form} onFinish={handleSubmit}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <IInputForm
                  name="name"
                  label="Tên menu"
                  placeholder="Nhập tên menu"
                  required
                  rules={[
                    { required: true, message: "Vui lòng nhập tên menu!" },
                  ]}
                  disabled={!!value?.view}
                />
              </Col>
              <Col span={24}>
                <IInputForm
                  name="path"
                  label="Đường dẫn menu"
                  placeholder="Nhập đường dẫn menu"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập đường dẫn menu!",
                    },
                  ]}
                  disabled={!!value?.view}
                />
              </Col>
              <Col span={24}>
                <ISelectForm
                  allowClear
                  name="parentId"
                  label="Menu cha"
                  options={dataMenuSelect}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toString()
                      .toLowerCase()
                      .includes(input.trim().toLowerCase())
                  }
                  disabled={!!value?.view}
                />
              </Col>
              <Col span={24}>
                <ISelectForm
                  name="icon"
                  label="Icon"
                  options={[]}
                  disabled={!!value?.view}
                />
              </Col>
              <Col span={24}>
                <IInputForm.Number
                  name="sortOrder"
                  label="Sắp xếp"
                  disabled={!!value?.view}
                />
              </Col>
              <Col span={24}>
                <ICheckboxForm
                  name="isShow"
                  label="Hiển thị"
                  defaultChecked
                  disabled={!!value?.view}
                />
              </Col>
              <Col span={24}>
                <IInputForm
                  name="code"
                  label="Mã code"
                  placeholder="Nhập mã code"
                  required
                  rules={[
                    { required: true, message: "Vui lòng nhập mã code!" },
                  ]}
                  disabled={!!value?.edit || !!value?.view}
                />
              </Col>
            </Row>
          </IForm>
        </Spin>
      </IModal>
    </>
  );
};

export default MenuForm;
