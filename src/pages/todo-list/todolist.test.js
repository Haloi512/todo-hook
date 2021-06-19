import React from "react";
import { mount, shallow, render, simulate } from "enzyme";
import axios from "axios";
import { act } from "react-dom/test-utils";
import TableComponent from "./table";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import TodoList from "./index";
import { wrap } from "yargs";

jest.mock("axios");

// mock data
const data = [{ id: 1, key: 1, title: "test" }];
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
          id="group-btn__delete"
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

describe("fetch data", () => {
  let mock = () => {};
  const mockCallBack = jest.fn();
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: any) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: mock, // deprecated
        removeListener: mock, // deprecated
        addEventListener: mock,
        removeEventListener: mock,
        dispatchEvent: mock,
      };
    },
  });
  let wrapper;
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should be return data in the first mount, useEffect with arr dependency", async () => {
    // mock axios promise
    await act(async () => {
      await axios.get.mockResolvedValue(data);
      wrapper = mount(<TodoList />);
    });
    await wrapper.update();
    await expect(axios.get).toBeCalledTimes(1);
  });

  test("should be remove table when delete enter button delete", async () => {
    const table = mount(<TableComponent dataSource={data} columns={columns} />);
    console.log(table.find("#group-btn__delete").debug());
    table.find("#group-btn__delete").simulate("click");
    await expect(axios.delete).toBeCalled(true);
  });
});
