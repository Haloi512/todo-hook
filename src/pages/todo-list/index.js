import React, { useState, useRef, useEffect, useMemo } from "react";

import "./style.scss";
import { Card, Input, Button, Row, Col, Modal, Form } from "antd";
import TableComponent from "./table";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

export default function TodoList({ handleProgress, ...props }) {
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [row, setRow] = useState([]);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [payload, setPayload] = useState({});
  const [tableData, setTableData] = useState([]);
  const [fetchParams, setFetchParams] = useState({});
  const BASE_URL = "http://localhost:3004";
  const onSelectChange = (selectedRowKeys, selectedRow) => {
    setSelectedRowKeys(selectedRowKeys);
    setRow(selectedRow);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // fetch task
  const fetchTask = async (fetchParams) => {
    // return await axios(
    //   params
    //     ? {
    //         url: `${BASE_URL}/task`,
    //         method: "GET",
    //         params,
    //       }
    //     : {
    //         url: `${BASE_URL}/task`,
    //         method: "GET",
    //       }
    // );
    return axios.get(`${BASE_URL}/task`, {
      parmas: fetchParams,
    });

    //   toast.success("Fetch successfully !");

    // axios(
    //   params
    //     ? {
    //         url: `${BASE_URL}/task`,
    //         method: "GET",
    //         params,
    //       }
    //     : {
    //         url: `${BASE_URL}/task`,
    //         method: "GET",
    //       }
    // )
    //   .then((res) => {
    //     if (res) {
    //       //   toast.success("Fetch successfully !");
    //       setTableData(res.data);
    //       handleProgress(false);
    //     }
    //   })
    //   .catch((err) => {
    //     // toast.success("Fetch error !");
    //     setTableData([]);
    //     handleProgress(false);
    //   });
  };

  //   create task
  const createTask = async (data) => {
    handleProgress(true);
    try {
      const res = await axios({
        url: `${BASE_URL}/task`,
        method: "POST",
        data,
      });
      if (res.status == 200 || res.status === 201) {
        toast.success("Action succeed !");

        handleProgress(false);
        fetchTask();
      }
    } catch (err) {
      handleProgress(false);
      toast.success("Action failed !");
    }
  };

  //   edit task
  const editTask = async (params, data) => {
    handleProgress(true);
    try {
      const res = await axios({
        url: `${BASE_URL}/task/${params}`,
        method: "PUT",
        data,
      });
      if (res.status == 200 || res.status === 201) {
        toast.success("Action succeed !");
        handleProgress(false);
        fetchTask();
      }
    } catch (err) {
      toast.success("Action failed !");
      handleProgress(false);
    }
  };

  //   delete task
  const deleteTask = async (params) => {
    handleProgress(true);
    try {
      const res = await axios({
        url: `${BASE_URL}/task/${params}`,
        method: "DELETE",
      });
      if (res.status == 200 || res.status === 201) {
        toast.success("Action succeed !");
        handleProgress(false);
        fetchTask();
      }
    } catch (err) {
      handleProgress(false);
      toast.success("Action failed !");
    }
  };

  useEffect(() => {
    fetchTask(fetchParams).then((res) => {
      setTableData(res.data);
    });
  }, [fetchParams]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "50%",
    },
    {
      title: "Actions",
      width: "40%",
      render: (a, b, c) => {
        return (
          <div className="group-btn">
            <Button
              className="group-btn__edit"
              type="primary"
              data-testid="group-btn__edit"
              onClick={() => handleOpenEditModal(a, b, c)}
            >
              <EditOutlined />
              Edit
            </Button>
            <Button
              className="group-btn__delete"
              style={{ marginLeft: "5px" }}
              type="primary"
              danger
              onClick={() => handleDeleteTask(a.id)}
            >
              <DeleteOutlined />
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const handleCancelCreate = () => {
    setIsModalCreateVisible(!isModalCreateVisible);
  };

  const handleCreateTask = () => {};

  const handleCancelEdit = () => {
    setIsModalEditVisible(false);
  };

  const handleSearchTask = (e) => {
    const params =
      e?.target?.value?.length > 0
        ? {
            title: String(e.target.value),
          }
        : {};
    setFetchParams(params);
  };

  const handleDeleteTask = (selected) => {
    deleteTask(selected);
  };

  const handleDeleteAllOfSelected = () => {
    row?.map((item) => {
      deleteTask(item?.id);
    });
  };

  const handleOpenEditModal = (a, b, c) => {
    setIsModalEditVisible(true);
    setPayload(a);

    form.setFieldsValue({ title: a?.title });
  };

  const onFinish = (e) => {
    const body = { ...e, key: Math.random() };
    setIsModalCreateVisible(false);
    formRef?.current?.setFieldsValue({ ["title"]: "" });
    createTask(body);
  };

  const onEditSubmit = (e) => {
    const data = { ...e, key: payload?.key };
    editTask(payload?.id, data);
    setIsModalEditVisible(false);
  };

  return (
    <div className="app">
      <div className="app-content">
        <h1>Todolist</h1>
        <Card>
          <Row gutter={[24, 24]}>
            <Col
              xs={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              md={{ span: 24, order: 2 }}
              lg={{ span: 16, order: 1 }}
              xl={{ span: 16, order: 1 }}
            >
              <TableComponent
                className="todo-table"
                bordered
                rowSelection={rowSelection}
                columns={columns}
                dataSource={tableData}
              />
            </Col>
            <Col
              xs={{ span: 24, order: 1 }}
              sm={{ span: 24, order: 1 }}
              md={{ span: 24, order: 1 }}
              lg={{ span: 8, order: 2 }}
              xl={{ span: 8, order: 2 }}
            >
              <div className="app-content__filter">
                <Input
                  size="large"
                  placeholder="Search task..."
                  prefix={<SearchOutlined />}
                  onPressEnter={(e) => handleSearchTask(e)}
                />
                <div className="group-btn">
                  <Button
                    id="group-btn__add"
                    className="group-btn__add"
                    type="primary"
                    style={{
                      backgroundColor: "#26b226",
                      borderColor: "#26b226",
                    }}
                    onClick={() => setIsModalCreateVisible(true)}
                  >
                    <PlusOutlined />
                    Add Task
                  </Button>
                  <Button
                    className="group-btn__delete"
                    type="primary"
                    danger
                    onClick={handleDeleteAllOfSelected}
                  >
                    <DeleteOutlined />
                    Delete Selected Task
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      <Modal
        title="Create Task"
        visible={isModalCreateVisible}
        onOk={handleCreateTask}
        onCancel={handleCancelCreate}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          ref={formRef}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please input your task!" }]}
          >
            <Input placeholder="Enter your task..." />
          </Form.Item>

          <Form.Item
            style={{
              display: "flex !important",
              justifyContent: "center !important",
            }}
          >
            <Button type="primary" htmlType="submit">
              Create
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              type="default"
              onClick={() => setIsModalCreateVisible(false)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Update Task"
        visible={isModalEditVisible}
        onCancel={handleCancelEdit}
      >
        <Form form={form} name="basic" onFinish={onEditSubmit}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please input your task!" }]}
          >
            <Input placeholder="Enter your task..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              type="default"
              onClick={() => setIsModalEditVisible(false)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
