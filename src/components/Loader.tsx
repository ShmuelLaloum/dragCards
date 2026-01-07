import { Spin } from "antd";

export default function Loader() {
  return (
    <div className="loader-container">
      <Spin size="large" tip="Loading products..." />
    </div>
  );
}
